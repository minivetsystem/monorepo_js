import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../../users/schemas";
import mongoose from "mongoose";


@Schema()
export class EducationSearchResponse {
  @Prop({ type: String, isRequired: false })
  search_id?: string;

  @Prop({ type: String, isRequired: false })
  timestamp?: string;

  @Prop({ type: Object, isRequired: false })
  errors?: object;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  buyer?: User
}


export const EducationSearchResponseSchema = SchemaFactory.createForClass(EducationSearchResponse);
