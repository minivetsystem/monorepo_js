import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

/*
* Import user created modules
* */
import { EducationSearch } from "./education-search.schema";

export type EducationResultsDocument = HydratedDocument<EducationResults>

@Schema()
export class EducationResults {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: EducationSearch.name, isRequired: true })
  search_id: string;

  @Prop({ type: Boolean, isRequired: false })
  success: boolean;

  @Prop({ type: Boolean, isRequired: false })
  processing_done: boolean;

  @Prop({type: Array, isRequired: false})
  offers: object[]

  @Prop({ type: Date, isRequired: false })
  timestamp: Date;
}


export const EducationResultsSchema = SchemaFactory.createForClass(EducationResults);
