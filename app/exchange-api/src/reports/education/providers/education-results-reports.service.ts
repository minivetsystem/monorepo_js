import { Injectable } from "@nestjs/common";
import {
  EducationResultsService
} from "../../../verticals/education/education-results.service";
import { AllResultsQueryDto } from "../dto/all-results-query.dto";
import {
  resolveAppleWebApp
} from "next/dist/lib/metadata/resolvers/resolve-basics";

@Injectable()
export class EducationResultsReportsService {
  constructor(
    /*
    * Inject Education Results Service
    * */
    private readonly educationResultsService: EducationResultsService
  ) {
  }

  public async findAll(allResultsQuery: AllResultsQueryDto) {
    return await this.educationResultsService.findAll(allResultsQuery);
  }
}
