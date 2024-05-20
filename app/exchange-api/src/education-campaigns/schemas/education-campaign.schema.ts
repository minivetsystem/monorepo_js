import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { now } from "moment";
import mongoose from "mongoose";

import { User } from "../../users/schemas";

// Declaring EducationCampaignDocument For TypeScript Type Validation
export type EducationCampaignDocument = HydratedDocument<EducationCampaign>;

// Creating the Schema Class
@Schema()
export class EducationCampaign {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, default: true, type: Boolean })
  active: boolean;

  @Prop({ required: true, type: Date, default: () => now() })
  start_date: Date;

  @Prop({ required: true, type: Number, default: 25 })
  commission_percentage: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
  buyers: User[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor: User;
}

// Exporting Schema
export const EducationCampaignSchema = SchemaFactory.createForClass(EducationCampaign);
