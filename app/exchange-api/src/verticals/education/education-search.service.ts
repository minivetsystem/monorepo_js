import {
  BadRequestException,
  Injectable, NotFoundException,
  RequestTimeoutException
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

/*
* User created Modules
* */
import { EducationSearch } from "./schema/education-search.schema";
import { EducationMapSearchObject } from "./education-map-search-object";
import { CreateEducationSearchDto } from "./dto/create-education-search.dto";
import {
  EducationCampaignsService
} from "../../education-campaigns/education-campaigns.service";
import {
  EducationCampaignDocument
} from "../../education-campaigns/schemas/education-campaign.schema";
import { EducationQueryLeadhoop, QueryType } from "./education-query-leadhoop";
import moment from "moment-timezone";
import {
  AllSearchQueryDto
} from "../../reports/education/dto/all-search-query.dto";


@Injectable()
export class EducationSearchService {

  constructor(
    /*
    * Inject the Education Search Model
    * */
    @InjectModel(EducationSearch.name) private readonly educationSearchModel: Model<EducationSearch>,
    /*
    * Inject the EducationMapSearchObject class
    * */
    private readonly educationMapSearchObject: EducationMapSearchObject,
    /*
    * Inject the education campaign service
    * */
    private readonly educationCampaignService: EducationCampaignsService,
    /*
    *  Inject the LeadHoop Query providor
    * */
    private readonly educationQueryLeadhoop: EducationQueryLeadhoop
  ) {
  }

  /*
  * Method to perform LeadHoop search and perform necessary database operations
  * */
  public async performSearch(searchQuery: CreateEducationSearchDto) {

    /*
    * Check if the incoming search request has a valid campaign
    * */
    const campaign: EducationCampaignDocument = await this.educationCampaignService.findById(searchQuery.education_campaign_id);
    const buyers = campaign.buyers;
    const vendor = campaign.vendor;

    /*
    * Throw exceptions if the campaign is not active
    * */
    if (!campaign.active) {
      throw new BadRequestException("The campaign is not active.");
    }
    if (buyers.length < 1) {
      throw new BadRequestException("Not enough buyers mapped to campaigns.");
    }

    /*
    * Create a new document in the MongoDB database
    * */
    let searchDocument;

    try {
      searchDocument = await this.educationSearchModel.create({
        ...searchQuery,
        timestamp: moment().tz("America/Chicago"),
        search_response: []
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    let wasSearchSuccessful = false;

    /*
    * Map the search request in a format needed by LeadHoop
    * */
    for (let i = 0; i < buyers.length; i++) {
      const res = await this.educationQueryLeadhoop.queryLeadhoop(
        QueryType.searches,
        this.educationMapSearchObject.map(searchQuery, buyers[i]),
        buyers[i],
        "post"
      );

      // Update the searchID in the Search Document
      const updatedSearchDocument = await this.educationSearchModel.findOneAndUpdate(
        { _id: searchDocument._id },
        {
          "$push": {
            search_response: {
              ...res,
              buyer: buyers[i]._id
            }
          }
        },
        { new: true }
      ).exec();

      // Check If search_id was returned by atleast one buyer
      updatedSearchDocument.search_response.map((each) => {
        if ("search_id" in each) {
          wasSearchSuccessful = true;
        }
      });
    }

    /*
    * Send back the search ID and confirmation just the way LeadHoop does
    *  back to the vendor.
    * */
    if (!wasSearchSuccessful) {
      throw new NotFoundException({
        error: "We were not able to generate a" +
          " relevant search_id for your request"
      });
    }

    return {
      search_id: searchDocument._id,
      timestamp: searchDocument.timestamp
    };
  }

  /*
  * @name: findSearchById
  * Function to find a single search request by id of the search request
  * */
  public async findSearchById(search_id: string) {
    let searchDocument;
    try {
      searchDocument = await this.educationSearchModel.findById(search_id).populate({ path: "education_campaign_id" });
    } catch (errors) {
      throw new BadRequestException("The search_id is not valid. Please use" +
        " a valid search id.");
    }
    return searchDocument;
  }


  public async findAll(query: AllSearchQueryDto) {
    let allDocuments;
    let totalCount;

    /*
    * Creating a common filter
    * */
    const filter = {
      "timestamp": {
        "$gte": query.start_date,
        "$lte": query.end_date
      }
    };

    /*
    * Counting entries based on the filter
    * */
    try {
      totalCount = await this.educationSearchModel.find(filter).count();
    } catch (errors) {
      throw new BadRequestException({ errors: errors });
    }

    /*
    * Getting all the Documents
    * */
    try {
      allDocuments = await this.educationSearchModel.find(filter)
        .limit(query.limit ? query.limit : 10)
        .skip(query.skip ? query.skip : 0);
    } catch (errors) {
      throw new BadRequestException({ errors: errors });
    }

    return {
      totalCount: totalCount,
      limit: query.limit ? query.limit : 10,
      skip: query.skip ? query.skip : 0,
      searches: [...allDocuments]
    };
  }
}
