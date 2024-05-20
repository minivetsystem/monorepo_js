import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Vendor } from '../../vendors/schemas';

/**
 * This represents the vendor api key document.
 */
export type SearchRequestDocument = HydratedDocument<SearchRequest>;

/**
 * This represents the schema for the vendor api key model.
 */
@Schema({ versionKey: false })
export class SearchRequest {
  /**
   * Object Id for the search request.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * Vendor linked to this search request
   */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true })
  vendor: Vendor;
  /**
   * Mode for the search.
   */
  @Prop({ required: true })
  test: boolean;
  /**
   * Partner code for the vendor.
   */
  @Prop({ required: true })
  partner_code: string;
  /**
  * Search lead object
  */
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  lead: any;
  /**
   * Represents the lead address
   */
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  lead_address: any;
  /**
   * Represents the lead education
   */
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  lead_education: any;
  /**
   * Represents the lead background
   */
  @Prop({ type: mongoose.Schema.Types.Mixed })
  lead_background: any;
}

export const SearchRequestSchema = SchemaFactory.createForClass(SearchRequest);
