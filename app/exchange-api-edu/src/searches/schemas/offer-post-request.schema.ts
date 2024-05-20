import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Vendor } from '../../vendors/schemas';
import { Offer } from './offers.schema';

/**
 * This represents the vendor api key document.
 */
export type OfferPostRequestDocument = HydratedDocument<OfferPostRequest>;

/**
 * This represents the schema for the vendor api key model.
 */
@Schema({ versionKey: false })
export class OfferPostRequest {
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
   * Search request releated to this search result
  */
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true })
  offer: Offer;
  /**
   * Partner code for the vendor.
   */
  @Prop({ required: true })
  offer_result_id: number;
  /**
  * Lead object
  */
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  lead: any;
  /**
  * Represents tcpa consent
  */
  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  lead_consent: any;
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

export const OfferPostRequestSchema = SchemaFactory.createForClass(OfferPostRequest);
