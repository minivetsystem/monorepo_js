/**
 *  NestJS Modules
 */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

/**
 *  User declared Modules
 */
import { EducationCampaignsController } from "./education-campaigns.controller";
import {
  EducationCampaign,
  EducationCampaignSchema
} from "./schemas/education-campaign.schema";
import { EducationCampaignsService } from "./education-campaigns.service";
import { User, UserSchema } from "../users/schemas";
import {UsersModule} from "../users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EducationCampaign.name,
        schema: EducationCampaignSchema
      },
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    UsersModule
  ],
  controllers: [EducationCampaignsController],
  providers: [EducationCampaignsService],
  exports:[EducationCampaignsService]
})
export class EducationCampaignsModule {
}
