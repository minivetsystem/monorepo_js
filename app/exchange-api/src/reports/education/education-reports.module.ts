import {Module} from "@nestjs/common";
import { EducationReportsController } from "./education-reports.controller";
import { EducationModule } from "../../verticals/education/education.module";
import { EducationSearchReportsService } from "./providers/education-search-reports.service";
import {
  EducationResultsReportsService
} from "./providers/education-results-reports.service";

@Module({
  controllers: [EducationReportsController],
  imports: [EducationModule],
  providers: [EducationSearchReportsService, EducationResultsReportsService]
})
export class EducationReportsModule {}
