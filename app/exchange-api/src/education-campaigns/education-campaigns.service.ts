import {
  BadRequestException, HttpException,
  Injectable
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model, Schema, Types } from "mongoose";

/*
* User created imports
* */
import { EducationCampaign } from "./schemas/education-campaign.schema";
import {
  CreateEducationCampaignDto
} from "./dto/create-education-campaign.dto";
import { UsersService } from "../users/users.service";
import { GetEducationCampaignsDto } from "./dto/get-education-campaigns.dto";


@Injectable()
export class EducationCampaignsService {

  constructor(
    /*
    * Inject the EducationCampaign MongoDB model
    * */
    @InjectModel(EducationCampaign.name) private readonly educationCampaignModel: Model<EducationCampaign>,
    /*
    * Inject UserService
    * */
    private readonly usersService: UsersService
  ) {
  }

  /*
  * Method to check if the users exist in the database or not.
  * */
  private async checkUserExists(userIDs: string | string[]) {
    // If not an array
    if (!Array.isArray(userIDs)) {
      return await this.usersService.fetchUserById(userIDs);
    }
    // If array check each user exists
    return await Promise.all(
      userIDs.map(async (each) => {
          return await this.usersService.fetchUserById(each);
        }
      ));
  }

  /*
  * Method to create a new education campaign
  * */
  public async create(createEducationCampaignDto: CreateEducationCampaignDto): Promise<EducationCampaign> {

    try {
      /*
      * Check is the vendor assigned to the campaign exists
      * */
      await this.checkUserExists(createEducationCampaignDto.vendor);
      /*
      * Check is the buyers assigned to the campaign exists
      * */
      await this.checkUserExists(createEducationCampaignDto.buyers);
    } catch (errors) {
      throw new BadRequestException("The users you are trying to add as" +
        " either vendor or buyer are not valid.");
    }

    /*
    * Finally create the new campaign
    * */
    return await this.educationCampaignModel.create(createEducationCampaignDto);
  }

  /*
  * Find the campaign by ID
  * */
  public async findById(id: string) {

    // Declare a variable for the campaign
    let campaign;

    // Try to fetch the campaign
    try {
      campaign = await this.educationCampaignModel.findById(id).populate("vendor").populate("buyers").exec();
    } catch (errors) {
      throw new BadRequestException("The campaign is incorrect");
    }

    return campaign;
  }

  public async getAll(getEducationCampaigns: GetEducationCampaignsDto) {
    let allCampaigns;
    let totalCount;
    const limit = getEducationCampaigns.limit ? getEducationCampaigns.limit : 10;
    const skip = getEducationCampaigns.skip ? getEducationCampaigns.skip : 0;
    /*
    * Get Total Count
    * */
    try {
      totalCount = await this.educationCampaignModel.find().count();
    } catch (errors) {
      throw new BadRequestException({ errors: errors });
    }

    /*
    * Get all campaigns
    * */
    try {
      allCampaigns = await this.educationCampaignModel.find()
        .limit(limit)
        .skip(skip)
        .populate('buyers')
        .populate('vendor');
    } catch (errors) {
      throw new BadRequestException({ errors: errors });
    }

    return {
      totalCount: totalCount,
      limit: limit,
      skip: skip,
      campaigns: [...allCampaigns]
    };
  }


}
