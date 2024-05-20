import { BadRequestException, Injectable } from "@nestjs/common";

/*
*  Import user created modules
* */
import { EducationSearchService } from "./education-search.service";
import { CreateEducationResultsDto } from "./dto/create-education-results.dto";
import { EducationQueryLeadhoop, QueryType } from "./education-query-leadhoop";
import { UsersService } from "../../users/users.service";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

/*
* User created modules
* */
import { EducationResults } from "./schema/education-results.schema";
import { offersMockData } from "./mock/offers-mock-data";
import {
  AllResultsQueryDto
} from "../../reports/education/dto/all-results-query.dto";
import moment from "moment-timezone";
import { ObjectId } from "mongodb";

@Injectable()
export class EducationResultsService {

  constructor(
    /*
    * Inject Education Resulsts model
    * */
    @InjectModel(EducationResults.name) private readonly educationResultsModel: Model<EducationResults>,
    /*
    * Injection the Search Service
    * */
    private readonly educationSearchService: EducationSearchService,
    /*
    * Inject the Education Query Service
    * */
    private readonly educationQueryLeadhoop: EducationQueryLeadhoop,
    /*
   * Inject UserService
   * */
    private readonly usersService: UsersService
  ) {
  }

  public async getResults(query: CreateEducationResultsDto) {
    // Get the Existing Search Document
    const search_document = await this.educationSearchService.findSearchById(query.search_id);

    // Assign variables needed
    const search_response = search_document.search_response;

    // Declare a variable for offers
    const offers = [];
    let processing_done = false;
    let success = false;
    const offersForDatabase = [];


    /*
    * Loop Through Each Buyer and generate results
    * */
    for (let i = 0; i < search_response.length; i++) {
      // Find the correct buyer
      const buyer = await this.usersService.fetchUserById(search_response[i]["buyer"]);

      // Send the request to Leadhoop
      const res = await this.educationQueryLeadhoop.queryLeadhoop(
        QueryType.results,
        `search_id=${search_response[i]["search_id"]}&wait_time=${query.wait_time}`,
        buyer,
        "get"
      );

      /*
      * Push the offers to offers varibale
      * */
      if (res.success) {
        processing_done = true;
        success = true;
      }

      // Add offers received to the offers array
      res.offers.map((each) => offers.push(each));

      // Add Offers to offersForDatabase array
      res.offers.map((each) => offersForDatabase.push(
        {
          buyer: buyer._id,
          ...each
        }
      ));

      /*
      * Id search was a test search
      * */
      if (search_document.test) {
        // Add offers received to the offers array
        offersMockData.map((each) => offers.push(each));

        // Add Offers to offersForDatabase array
        offersMockData.map((each) => offersForDatabase.push(
          {
            buyer: buyer._id,
            ...each
          }
        ));
      }
    }

    /*
    * Create a new result document
    * */
    const resultDocument = await this.educationResultsModel.create({
      search_id: query.search_id,
      success: success,
      processing_done: processing_done,
      timestamp: moment().tz("America/Chicago"),
      offers: offersForDatabase
    });


    return {
      result_search_id: resultDocument._id,
      success: resultDocument.success,
      processing_done: resultDocument.processing_done,
      offers: offers
    };
  }


  /*
  * Method to find all the results for reporting
  * */
  public async findAll(allResultsQuery: AllResultsQueryDto) {
    let allDocuments;
    let totalCount;



    /*
    * Create the filter for teh query
    * */
    const filter = {
      "timestamp": {
        "$gte": allResultsQuery.start_date,
        "$lte": allResultsQuery.end_date
      },
      ...(allResultsQuery.search_id && {"search_id": new mongoose.Types.ObjectId(allResultsQuery.search_id)}),
    };

    console.log(filter)

    try {
      totalCount = await this.educationResultsModel.find(filter).count();
    } catch (errors) {
      console.log(errors);
      throw new BadRequestException({ errors: errors });
    }

    try {
      allDocuments = await this.educationResultsModel.find(filter)
        .limit(allResultsQuery.limit ? allResultsQuery.limit : 10)
        .skip(allResultsQuery.skip ? allResultsQuery.skip : 0)
        .populate("search_id");
    } catch (errors) {
      console.log(errors);
      throw new BadRequestException({ errors: errors });
    }

    return {
      totalCount: totalCount,
      limit: allResultsQuery.limit ? allResultsQuery.limit : 10,
      skip: allResultsQuery.skip ? allResultsQuery.skip : 0,
      results: [...allDocuments]
    };
  }
}
