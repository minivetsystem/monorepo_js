import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Vendor } from '../../vendors/schemas';
import { OfferPostRequest } from './offer-post-request.schema';
import { Offer } from './offers.schema';

/**
 * This represents the vendor api key document.
 */
export type OfferPostResultDocument = HydratedDocument<OfferPostResult>;

/**
 * This represents the schema for the vendor api key model.
 */
@Schema({ versionKey: false })
export class OfferPostResult {
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'OfferPostRequest', required: true })
  offer_post_request: OfferPostRequest;
  /**
   * List of offers returned from lead hoop
   */
  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  response: mongoose.Types.ObjectId[];
  /**
   * Errors from lead hoop if any
   */
  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  errors: any
}

export const OfferPostResultSchema = SchemaFactory.createForClass(OfferPostResult);
