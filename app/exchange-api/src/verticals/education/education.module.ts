import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

/*
 * User created modules
 * */
import { EducationSearch, EducationSearchSchema } from './schema/education-search.schema';
import { EducationSearchService } from './education-search.service';
import { EducationMapSearchObject } from './education-map-search-object';
import { EducationCampaignsModule } from '../../education-campaigns/education-campaigns.module';
import { EducationEncodeAuthorization } from './education-encode-authorization';
import { EducationQueryLeadhoop } from './education-query-leadhoop';
import { EducationResultsService } from './education-results.service';
import { UsersModule } from '../../users/users.module';
import { EducationResults, EducationResultsSchema } from './schema/education-results.schema';
import { EducationLeadRequestsService } from './education-lead-requests.service';
import { EducationLeadPost, EducationLeadPostsSchema } from './schema/education-lead-post.schema';
import { EducationSoldLead, EducationSoldLeadSchema } from './schema/education-sold-lead.schema';
import { EducationCheckDuplicatePostRequest } from './education-check-duplicate-post-request';
import { EducationFindCorrectBuyer } from './education-find-correct-buyer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EducationSearch.name,
        schema: EducationSearchSchema,
      },
      {
        name: EducationResults.name,
        schema: EducationResultsSchema,
      },
      {
        name: EducationLeadPost.name,
        schema: EducationLeadPostsSchema,
      },
      {
        name: EducationSoldLead.name,
        schema: EducationSoldLeadSchema,
      },
    ]),
    EducationCampaignsModule,
    HttpModule,
    UsersModule,
  ],
  controllers: [EducationController],
  providers: [EducationSearchService, EducationMapSearchObject, EducationEncodeAuthorization, EducationQueryLeadhoop, EducationResultsService, EducationLeadRequestsService, EducationCheckDuplicatePostRequest, EducationFindCorrectBuyer],
  exports:[EducationSearchService, EducationResultsService]
})
export class EducationModule {}
