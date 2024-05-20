import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Vendor } from '../../vendors/schemas';
import { SearchRequest } from './searchrequest.schema';
import { Offer } from './offers.schema';

/**
 * This represents the vendor api key document.
 */
export type SearchResultDocument = HydratedDocument<SearchResult>;

/**
 * This represents the schema for the vendor api key model.
 */
@Schema({ versionKey: false })
export class SearchResult {
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SearchRequest', required: true })
  search_request: SearchRequest;
  /**
   * search id returned from lead hoop.
   */
  @Prop()
  leadhoop_search_id: number;
  /**
   * timestamp returned by leadhoop.
   */
  @Prop()
  timestamp: Date;
  /**
   * List of offers returned from lead hoop
   */
  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Offer' })
  offers: mongoose.Types.ObjectId[];
  /**
   * Errors from lead hoop if any
   */
  @Prop({ type: mongoose.Schema.Types.Mixed, default: null })
  errors: any
}

export const SearchResultSchema = SchemaFactory.createForClass(SearchResult);
