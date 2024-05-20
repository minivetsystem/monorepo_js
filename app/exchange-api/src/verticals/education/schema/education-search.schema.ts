import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";
import {
  EducationCampaign
} from "../../../education-campaigns/schemas/education-campaign.schema";
import {
  EducationSearchLeadDetails
} from "./education-search-lead-details.schema";
import {
  EducationSearchLeadAddress
} from "./education-search-lead-address.schema";
import {
  EducationSearchLeadEducation
} from "./education-search-lead-education.schema";
import {
  EducationSearchLeadBackground
} from "./education-search-lead-background.schema";
import { EducationSearchResponse } from "./education-search-response.schema";


// Declaring EducationSearchDocument For TypeScript Type Validation
export type EducationSearchDocument = HydratedDocument<EducationSearch>;

@Schema()
export class EducationSearch {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EducationCampaign.name })
  education_campaign_id: string;

  @Prop({ type: Boolean, isRequired: false })
  test?: boolean;

  @Prop({ type: String, isRequired: false })
  subid?: string;

  @Prop({ type: String, isRequired: false })
  subid2?: string;

  @Prop({ type: String, isRequired: false })
  subid3?: string;

  @Prop({ type: String, isRequired: false })
  subid4?: string;

  @Prop({ type: EducationSearchLeadDetails })
  lead: EducationSearchLeadDetails;

  @Prop({ type: EducationSearchLeadAddress })
  lead_address: EducationSearchLeadAddress;

  @Prop({ type: EducationSearchLeadEducation })
  lead_education: EducationSearchLeadEducation;

  @Prop({ type: EducationSearchLeadBackground })
  lead_background: EducationSearchLeadBackground;

  @Prop({ type: Array, isRequired: false })
  search_response?: EducationSearchResponse[];

  @Prop({ type: Date, isRequired: false })
  timestamp: Date;
}

// Exporting Schemas
export const EducationSearchSchema = SchemaFactory.createForClass(EducationSearch);
