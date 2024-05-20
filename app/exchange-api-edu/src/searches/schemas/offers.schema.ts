import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Vendor } from '../../vendors/schemas';
import { SearchRequest } from './searchrequest.schema';

/**
 * This represents the vendor api key document.
 */
export type OfferDocument = HydratedDocument<Offer>;

/**
 * This represents the schema for the vendor api key model.
 */
@Schema({ versionKey: false })
export class Offer {
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
    result_id: number;
    /**
     * List of offers returned from lead hoop
     */
    @Prop({ type: mongoose.Schema.Types.Mixed })
    details: any
    /**
     * timestamp returned by leadhoop.
     */
    @Prop()
    expires_at: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
