import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

/*
* Import user created modules
* */
import { EducationSearch } from "./education-search.schema";
import { EducationResults } from "./education-results.schema";
import { EducationLeadPost } from "./education-lead-post.schema";
import {
  EducationCampaign
} from "../../../education-campaigns/schemas/education-campaign.schema";
import {User} from "../../../users/schemas"

export type EducationSoldLeadDocument = HydratedDocument<EducationSoldLead>

@Schema()
export class EducationSoldLead {

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EducationSearch.name,
    isRequired: true
  })
  search_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EducationResults.name,
    isRequired: true
  })
  result_search_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EducationLeadPost.name,
    isRequired: true
  })
  lead_post_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EducationCampaign.name,
    isRequired: true
  })
  campaign_id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    isRequired: true
  })
  vendor: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    isRequired: true
  })
  buyer: string;

  @Prop({ type: Number, isRequired: true })
  result_id: number;

  @Prop({ type: Number, isRequired: true })
  leadhoop_final_post_id: number;

  @Prop({ type: String, isRequired: true })
  status: string;

  @Prop({ type: Number, isRequired: true })
  buyer_payout_recieved: number;

  @Prop({ type: Number, isRequired: true })
  vendor_payout: number;

  @Prop({ type: Boolean, isRequired: true })
  test: boolean
}


export const EducationSoldLeadSchema = SchemaFactory.createForClass(EducationSoldLead);
