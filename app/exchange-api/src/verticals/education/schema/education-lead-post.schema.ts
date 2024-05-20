import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

/*
* Import user created modules
* */
import { EducationResults } from "./education-results.schema";

export type EducationLeadPostDocument = HydratedDocument<EducationLeadPost>

@Schema()
export class EducationLeadPost {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: EducationResults.name,
    isRequired: true
  })
  result_search_id: string;

  @Prop({ type: Array, isRequired: false })
  post_requests: [];

  @Prop({ type: Array, isRequired: false })
  successful_posts: [];
}


export const EducationLeadPostsSchema = SchemaFactory.createForClass(EducationLeadPost);
