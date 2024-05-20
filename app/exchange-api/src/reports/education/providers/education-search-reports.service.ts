import { Injectable } from "@nestjs/common";
import { AllSearchQueryDto } from "../dto/all-search-query.dto";
import {
  EducationSearchService
} from "../../../verticals/education/education-search.service";

@Injectable()
export class EducationSearchReportsService {

  constructor(
    /*
    *  Inject EducationSearchService
    * */
    private readonly educationSearchService: EducationSearchService
  ) {
  }

  public async findAllReports(query: AllSearchQueryDto) {
    return await this.educationSearchService.findAll(query);
  }
}
