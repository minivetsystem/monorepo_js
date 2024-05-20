import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateLeadRequestsDto } from "./dto/create-lead-requests.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import qs from "qs";
import { cloneDeep } from "lodash";

/*
* Import User Declared Models
* */
import {
  EducationLeadPost, EducationLeadPostDocument
} from "./schema/education-lead-post.schema";
import {
  EducationSoldLead,
  EducationSoldLeadDocument
} from "./schema/education-sold-lead.schema";
import { EducationResults } from "./schema/education-results.schema";
import { EducationSearchService } from "./education-search.service";
import {
  EducationCheckDuplicatePostRequest
} from "./education-check-duplicate-post-request";
import { EducationQueryLeadhoop, QueryType } from "./education-query-leadhoop";
import { EducationFindCorrectBuyer } from "./education-find-correct-buyer";
import { UsersService } from "../../users/users.service";
import {
  EducationCampaignsService
} from "../../education-campaigns/education-campaigns.service";

@Injectable()
export class EducationLeadRequestsService {

  constructor(
    /*
    * Inject the Education Leads Model
    * */
    @InjectModel(EducationLeadPost.name) private readonly educationLeadPostModel: Model<EducationLeadPost>,
    /*
    * Inject the Education Sold Leads Model
    * */
    @InjectModel(EducationSoldLead.name) private readonly educationSoldLeadModel: Model<EducationSoldLead>,
    /*
    * Inject the Education Results model
    * */
    @InjectModel(EducationResults.name) private readonly educationResultsModel: Model<EducationResults>,
    /*
    *  Inject the Search Service
    * */
    private readonly educationSearchService: EducationSearchService,
    /*
    * Inject the duplicate checker service
    * */
    private readonly educationCheckDuplicatePost: EducationCheckDuplicatePostRequest,
    /*
    * Inject the Leadhoop Query Service
    * */
    private readonly educationQueryLeadhoop: EducationQueryLeadhoop,
    /*
    * Inject Service to find the correct buyer
    * */
    private readonly educationFindCorrectBuyer: EducationFindCorrectBuyer,
    /*
    * Inject the user service
    * */
    private readonly userService: UsersService
  ) {
  }

  /*
  * Private functions specific to a class
  * */
  private calculatePayout(payout: string | number, commission: number): number {
    let finalPayout;

    if (typeof payout === "string") {
      finalPayout = parseInt(payout, 10);
    }

    return finalPayout - (finalPayout * commission / 100);
  }

  public async postLeadRequest(request: CreateLeadRequestsDto) {

    /*
    * See if you want to validate the result_id first
    * */
    const resultDocument = await this.educationResultsModel.findById(request.result_search_id).exec();

    /*
    * Throw an error if the result_id is not found
    * */
    if (!resultDocument) {
      throw new BadRequestException("The result id used is invalid." +
        " Please check the id.");
    }

    /*
    * Throw an error if the offers array is empty
    * */
    if (resultDocument.offers.length === 0) {
      throw new BadRequestException("Your results do not contain and valid" +
        " offers please check if results returned offers");
    }

    /*
    * Find the related Search Document
    * */
    const searchDocument = await this.educationSearchService.findSearchById(resultDocument.search_id);


    /*
    * Find the correct buyer for the result_id in the request
    * */
    const correctBuyerId = this.educationFindCorrectBuyer.findCorrectBuyer(resultDocument, request.result_id);

    /*
    * If the buyer id is not found throw an exception
    * */
    if (!correctBuyerId) {
      throw new BadRequestException("The result_id is not correct. Please" +
        " ensure you are passing in correct result_id");
    }

    /*
    * Get the buyer Document using the buyer_id
    * */
    const buyer = await this.userService.fetchUserById(correctBuyerId);


    /*
    * Find first if a document with the same result_search_id exists
    * */
    const existingDocument = await this.educationLeadPostModel.findOne(
      { result_search_id: request.result_search_id }
    ).exec();


    /*
    *  Create a variable to hold lead
    * */
    let leadPostDocument: EducationLeadPostDocument;

    /*
    * Create a lead post document in the database if does not exist already
    * */
    if (!existingDocument) {
      leadPostDocument = await this.educationLeadPostModel.create({
        result_search_id: request.result_search_id,
        post_requests: [{ ...request }],
        successful_posts: []
      });
    }

    /*
    * If the existing document is found add the new request to the post_request
    * by first checking its not a duplicate request
    * */
    if (existingDocument && !this.educationCheckDuplicatePost.checkDuplicate(existingDocument.post_requests, request)) {
      leadPostDocument = await this.educationLeadPostModel.findByIdAndUpdate(
        { _id: existingDocument._id },
        {
          "$push": { post_requests: { ...request } }
        },
        { new: true }
      );
    }

    /*
    * Return the response if the search is a test search
    * */
    if (searchDocument.test && correctBuyerId) {
      return {
        id: "65e557ae36ce68f496a18a1b",
        status: "Accepted",
        payout: "8.4",
        test: true
      };
    }

    if (searchDocument.test && !correctBuyerId) {
      return {
        status: "failure",
        reason: "Testing Mode and result_id is incorrect",
        reason_type: "external",
        testing: true
      };
    }

    /*
    * Prepare request to be sent to LeadHoop
    * */
    const finalRequest = cloneDeep(request);
    delete finalRequest.result_search_id;
    const finalQueryString = qs.stringify(finalRequest);
    let leadHoopResponse;
    let soldLead: EducationSoldLeadDocument | undefined;

    if (!searchDocument.test) {
      leadHoopResponse = await this.educationQueryLeadhoop.queryLeadhoop(
        QueryType.lead_requests,
        finalQueryString,
        buyer,
        "post"
      );
    }

    /*
    * Check if response from Leadhoop was a success
    * */
    if (
      leadHoopResponse &&
      leadHoopResponse.status &&
      leadHoopResponse.status === "Accepted" &&
      !searchDocument.test) {
      /*
      * Update Successful Posts
      * */
      leadPostDocument = await this.educationLeadPostModel.findByIdAndUpdate(
        { _id: existingDocument._id },
        {
          "$push": { successful_posts: { ...leadHoopResponse } }
        },
        { new: true }
      );

      /*
      * Create a sold lead entry
      * */
      soldLead = await this.educationSoldLeadModel.create({
        search_id: searchDocument._id,
        result_search_id: resultDocument._id,
        result_id: request.result_id,
        lead_post_id: leadPostDocument._id,
        status: leadHoopResponse.status,
        leadhoop_final_post_id: leadHoopResponse.id,
        buyer_payout_recieved: leadHoopResponse.payout,
        vendor_payout: this.calculatePayout(
          leadHoopResponse.payout,
          searchDocument.education_campaign_id.commission_percentage
        ),
        campaign_id: searchDocument.education_campaign_id._id,
        vendor: searchDocument.education_campaign_id.vendor,
        buyer: buyer._id,
        test: false
      });
    }

    return {
      id: soldLead._id,
      status: "Accepted",
      payout: soldLead.vendor_payout
    };
  }
}
