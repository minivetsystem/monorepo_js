import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { User } from '../../users/schemas';
import { VendorApiKey } from './vendorapikey.schema'

/**
 * This represents the vendor document.
 */
export type VendorDocument = HydratedDocument<Vendor>;

/**
 * This represents the schema for the vendor model.
 */
@Schema({ versionKey: false })
export class Vendor {
  /**
   * Object Id for the vendor.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * User associated with the vendor.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  /**
   * Is the vendor deleted.
   */
  @Prop()
  is_deleted: boolean;
  /**
   * Unique security key linked to the vendor.
   */
  @Prop()
  security_key: string;
  /**
   * Unique partner code for the vendor.
  */
  @Prop()
  partner_code: string;
  /**
   * All the api keys for this vendor
   */
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VendorApiKey' }] })
  api_keys: VendorApiKey[];
  /**
   * When was the vendor added on
   */
  @Prop({ required: true })
  added_on: Date;
  /**
   * Who added the vendor.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  added_by: User;
  /**
   * When was the vendor last updated.
   */
  @Prop()
  updated_on: Date;
  /**
   * Who updated the vendor last.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updated_by: User;
  /**
   * When was the vendor deleted.
   */
  @Prop()
  deleted_on: Date;
  /**
   * Who deleted the vendor.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deleted_by: User;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
