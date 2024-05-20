import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { Vendor } from './vendor.schema'
import { User } from '../../users/schemas';

/**
 * This represents the vendor api key document.
 */
export type VendorApiKeyDocument = HydratedDocument<VendorApiKey>;

/**
 * This represents the schema for the vendor api key model.
 */
@Schema({ versionKey: false })
export class VendorApiKey {
  /**
   * Object Id for the vendor api key.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * Vendor linked to this api key
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: Vendor.name, required: true })
  vendor: Vendor;
  /**
   * Api key for the vendor.
   */
  @Prop()
  api_key: string;
  /**
   * Is the vendor api key deleted.
   */
  @Prop()
  is_deleted: boolean;
  /**
   * When was the vendor api key added on
   */
  @Prop({ required: true })
  added_on: Date;
  /**
   * Who added the vendor api key.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  added_by: User;
  /**
   * When was the vendor api key last updated.
   */
  @Prop()
  updated_on: Date;
  /**
   * Who updated the vendor api key last.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updated_by: User;
  /**
   * When was the vendor api key deleted.
   */
  @Prop()
  deleted_on: Date;
  /**
   * Who deleted the vendor api key.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deleted_by: User;
}

export const VendorApiKeySchema = SchemaFactory.createForClass(VendorApiKey);
