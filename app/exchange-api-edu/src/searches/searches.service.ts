import { BadRequestException, Injectable } from "@nestjs/common";
import { SearchValidationDto } from "./dto"
import { SearchRequestDto, SearchResultRequestDto, LeadHoopSearchResultDto, PostRequestDto } from "./dto";
import { PHONE_VALIDATION_REGEX } from "../config/constants";
import { LeadHoopResponseDto } from "./dto/leadhoop-response.dto";
import { catchError, firstValueFrom } from "rxjs";
import { AxiosError } from "axios";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { Connection, Model, ObjectId, Types } from "mongoose";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { SearchRequest, SearchRequestDocument } from "./schemas";
import { SearchResult, SearchResultDocument } from "./schemas";
import { Offer, OfferDocument } from "./schemas";
import { OfferPostRequest, OfferPostRequestDocument } from "./schemas";
import { OfferPostResult, OfferPostResultDocument } from "./schemas";
import { Vendor, VendorDocument } from "../vendors/schemas";

@Injectable()
export class SearchesService {

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @InjectModel(SearchRequest.name)
    private searchRequestModel: Model<SearchRequestDocument>,
    @InjectModel(SearchResult.name)
    private searchResultModel: Model<SearchResultDocument>,
    @InjectModel(Vendor.name)
    private vendorModel: Model<VendorDocument>,
    @InjectModel(Offer.name)
    private offerModel: Model<OfferDocument>,
    @InjectModel(OfferPostRequest.name)
    private offerPostRequestModel: Model<OfferPostRequestDocument>,
    @InjectModel(OfferPostResult.name)
    private offerPostResultModel: Model<OfferPostResultDocument>
  ) {}

  async validate(request: SearchRequestDto): Promise<SearchValidationDto> {
    const validation = new SearchValidationDto([]);

    if(request.lead.phone && !PHONE_VALIDATION_REGEX.test(request.lead.phone)) {
      validation.errors.push(`Phone number is invalid. Should be in the format (917) 470-3070`);
    }

    return validation;
  }

  async validatePostOffer(request: PostRequestDto): Promise<SearchValidationDto> {
    const validation = new SearchValidationDto([]);

    if(!request.result_id) {
      validation.errors.push(`result_id is required.`);
    }

    if(!request.lead_education.program_id) {
      validation.errors.push(`lead_education[program_id] is required.`);
    }

    if(!request.lead_education.campus_id) {
      validation.errors.push(`lead_education[campus_id] is required.`);
    }

    return validation;
  }

  async searchOnLeadHoop(request: SearchRequestDto): Promise<LeadHoopResponseDto> {
    const lead = request.lead;
    const leadAddress = request.lead_address;
    const leadEducation = request.lead_education;
    const leadBackground = request.lead_background;

    const vendor = await this.vendorModel
                          .findOne({ partner_code: request. partner_code})
                          .populate('user')
                          .exec();

    const [savedRequest] = await this.searchRequestModel.create([{
      _id: new Types.ObjectId(),
      vendor: vendor._id,
      test: request.test,
      partner_code: request.partner_code,
      lead,
      lead_address: leadAddress,
      lead_education: leadEducation,
      lead_background: leadBackground
    }]);
  
    const queryParams: string[] = [
      `partner_code=${this.configService.get<string>('leadHoopPartnerCode')}`,
      `test=${request.test}`,
    ];
  
    if (lead.email) queryParams.push(`lead[email]=${lead.email}`);
    if (lead.phone) queryParams.push(`lead[phone1]=${lead.phone}`);
    if (lead.ip) queryParams.push(`lead[ip]=${lead.ip}`);
    if (lead.firstname) queryParams.push(`lead[firstname]=${lead.firstname}`);
    if (lead.lastname) queryParams.push(`lead[lastname]=${lead.lastname}`);
    if (lead.gender) queryParams.push(`lead[gender]=${lead.gender}`);
    if (lead.age) queryParams.push(`lead[age]=${lead.age}`);
    if (lead.dob) queryParams.push(`lead[dob]=${lead.dob}`);
    if (lead.besttime_contact) queryParams.push(`lead[besttime_contact]=${lead.besttime_contact}`);
    if (lead.service_leadid) queryParams.push(`lead[service_leadid]=${lead.service_leadid}`);
    if (lead.source_service_leadid) queryParams.push(`lead[source_service_leadid]=${lead.source_service_leadid}`);
    if (lead.source_service_trusted_form) queryParams.push(`lead[source_service_trusted_form]=${lead.source_service_trusted_form}`);
    if (lead.service_trusted_form) queryParams.push(`lead[service_trusted_form]=${lead.service_trusted_form}`);
    if (lead.signup_url) queryParams.push(`lead[signup_url]=${lead.signup_url}`);
    if (lead.consent_url) queryParams.push(`lead[consent_url]=${lead.consent_url}`);
  
    if (leadAddress) {
      if (leadAddress.address) queryParams.push(`lead_address[address]=${leadAddress.address}`);
      if (leadAddress.address2) queryParams.push(`lead_address[address2]=${leadAddress.address2}`);
      if (leadAddress.zip) queryParams.push(`lead_address[zip]=${leadAddress.zip}`);
      if (leadAddress.city) queryParams.push(`lead_address[city]=${leadAddress.city}`);
      if (leadAddress.state) queryParams.push(`lead_address[state]=${leadAddress.state}`);
    }
  
    if (leadEducation) {
      if (leadEducation.grad_year) queryParams.push(`lead_education[grad_year]=${leadEducation.grad_year}`);
      if (leadEducation.education_level_id) queryParams.push(`lead_education[education_level_id]=${leadEducation.education_level_id}`);
      if (leadEducation.start_date) queryParams.push(`lead_education[start_date]=${leadEducation.start_date}`);
      if (leadEducation.school_type) queryParams.push(`lead_education[school_type]=${leadEducation.school_type}`);
      if (leadEducation.area_of_studies) queryParams.push(`lead_education[area_of_studies]=${leadEducation.area_of_studies}`);
      if (leadEducation.program_names) queryParams.push(`lead_education[program_names]=${leadEducation.program_names}`);
      if (leadEducation.level_interest) queryParams.push(`lead_education[level_interest]=${leadEducation.level_interest}`);
    }
  
    if (leadBackground) {
      if (leadBackground.military_type) queryParams.push(`lead_background[military_type]=${leadBackground.military_type}`);
      if (leadBackground.us_citizen) queryParams.push(`lead_background[us_citizen]=${leadBackground.us_citizen}`);
      if (leadBackground.internet_pc) queryParams.push(`lead_background[internet_pc]=${leadBackground.internet_pc}`);
      if (leadBackground.teaching_license) queryParams.push(`lead_background[teaching_license]=${leadBackground.teaching_license}`);
      if (leadBackground.rn_license) queryParams.push(`lead_background[rn_license]=${leadBackground.rn_license}`);
      if (leadBackground.enrolled_status) queryParams.push(`lead_background[enrolled_status]=${leadBackground.enrolled_status}`);
    }
  
    const requestQuery = queryParams.join('&');

    const { data } = await firstValueFrom(
      this.httpService
        .post<LeadHoopResponseDto>(
          `${this.configService.get<string>('leadHoopApiBaseURL')}/v2/searches?${requestQuery}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${this.configService.get<string>('leadHoopApiToken')}`
            }
          }
        )
        .pipe(
          catchError(async (error: AxiosError) => {
            await this.searchResultModel.create([{
              _id: new Types.ObjectId(),
              search_request: savedRequest._id,
              vendor: vendor._id,
              errors: error.response?.data["errors"]
            }]);
            throw new BadRequestException(error.response.data);
          }),
        ),
    );
    
    if (data && data.search_id) {
      await this.searchResultModel.create([{
        _id: new Types.ObjectId(),
        search_request: savedRequest._id,
        vendor: vendor._id,
        leadhoop_search_id: data.search_id
      }]);
    }

    return data;
  }

  async searchResultOnLeadHoop(request: SearchResultRequestDto): Promise<LeadHoopSearchResultDto> {
    const queryParams: string[] = [
      `search_id=${request.searchId}`
    ];

    if (request.waitTime) queryParams.push(`wait_time=${request.waitTime}`);

    const requestQuery = queryParams.join('&');

    const { data } = await firstValueFrom(
      this.httpService.get<LeadHoopSearchResultDto>(
        `${this.configService.get<string>('leadHoopApiBaseURL')}/v2/results?${requestQuery}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${this.configService.get<string>('leadHoopApiToken')}`
          }
        }
      ).pipe(
        catchError((error: AxiosError) => {
          throw new BadRequestException(error.response.data);
        }),
      )
    );

    const searchResult = await this.searchResultModel.findOne({leadhoop_search_id: request.searchId}).exec();

    if (searchResult && data.success) {
      const savedOffers = await this.offerModel.create(
        data.offers.map((offer: any) => {
          return {
            _id: new Types.ObjectId(),
            vendor: searchResult.vendor,
            search_request: searchResult.search_request,
            result_id: offer.result_id,
            details: offer.details,
            expires_at: offer.expires_at
          }
        })
      )

      const offerIds = savedOffers.map((offer) => offer._id);

      await this.searchResultModel.findByIdAndUpdate(searchResult._id, { 
        $set: { offers: offerIds } 
      }, { new: true })
      .exec();
    }

    return data
  }

  async postOfferOnLeadHoop(request: PostRequestDto, vendorId: ObjectId): Promise<any> {
    const result_id = request.result_id;
    const optionalFields = ['lead', 'lead_address', 'lead_consent', 'lead_education', 'lead_background'];
    const requestData = {
      _id: new Types.ObjectId(),
      offer_result_id: result_id,
      lead: request.lead,
      vendor: vendorId,
    };

    const offer = await this.offerModel.findOne({ result_id: result_id });

    if (offer) requestData["offer"] = offer._id;
    
    // Iterate over the properties of the request object
    for (const key in request) {
      if (request.hasOwnProperty(key) && optionalFields.some(field => field === key)) {
        // Set the property in the requestData object
        requestData[key] = request[key];
      }
    }
    
    const [savedRequest] = await this.offerPostRequestModel.create([requestData]);
    

    const queryParams: string[] = [
      `result_id=${result_id}`,
    ];

    for (const key in request) {
      if (typeof request[key] == 'object') {
        for (const param in request[key]) {
          queryParams.push(`${key}[${param}]=${request[key][param]}`);
        }
      }
    }

    const requestQuery = queryParams.join('&');

    const { data } = await firstValueFrom(
      this.httpService
        .post<LeadHoopResponseDto>(
          `${this.configService.get<string>('leadHoopApiBaseURL')}/v2/lead_requests?${requestQuery}`,
          null,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Basic ${this.configService.get<string>('leadHoopApiToken')}`
            }
          }
        )
        .pipe(
          catchError(async (error: AxiosError) => {
            await this.offerPostResultModel.create([{
              _id: new Types.ObjectId(),
              vendor: vendorId,
              offer_post_request: savedRequest._id,
              errors:  {
                error: error.response?.data["reason"],
                record_id: error.response?.data["record_id"],
                testing: error.response?.data["testing"],
              }
            }]);
            throw new BadRequestException(error.response?.data["reason"]);
          }),
        ),
    );

    if (data && data["id"]) {
      await this.offerPostResultModel.create([{
        _id: new Types.ObjectId(),
        vendor: vendorId,
        offer_post_request: savedRequest._id,
        response: data
      }]);
    }

    return data;
  }
  
}
