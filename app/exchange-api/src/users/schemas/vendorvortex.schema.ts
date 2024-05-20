import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from "../../users/schemas";
import { LeadType } from '../../verticals/autoinsurance/schemas';

/**
 * This document for vendor vortex schema.
 */
export type VendorVortexDocument = HydratedDocument<VendorVortex>;

/**
 * This schema represents the data for vendor vortex.
 */
@Schema({ versionKey: false })
export class VendorVortex {
  /**
   * This represents the _id ObjectId from MongoDB.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  /**
   * This represents the vendor for vendor log.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  vendor: User;

  /**
  * This represents the lead type.
  */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'LeadType' })
  lead_type: LeadType;

  /**
   * This represents action of account creation.
   */
  @Prop()
  is_account_created: boolean;

  /**
  * This represents action if I/O was received.
  */
  @Prop()
  is_io_received: boolean;

  /**
  * This represents action if is vendor testing.
  */
  @Prop()
  is_vendor_testing: boolean;

  /**
  * This represents action if tests are approved.
  */
  @Prop()
  is_tests_approved: boolean;

  /**
  * This represents action if clients are mapped.
  */
  @Prop()
  is_clients_mapped: boolean;

  /**
  * This represents action if vendor is made live.
  */
  @Prop()
  is_made_live: boolean;

  /**
  * This represents action if numbers are confirmed.
  */
  @Prop()
  is_numbers_confirmed: boolean;

  /**
   * This represents when was the action performed on the vendor.
   */
  @Prop()
  added_on: Date;
  /**
   * This represents who performed action on the vendor.
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  added_by: User;

  /**
  * This represents when was the action performed on the vendor.
  */
  @Prop()
  updated_on: Date;
  /**
  * This represents who performed action on the vendor.
  */
  @Prop({
  type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updated_by: User;
}

/**
 * This represents the schema for the vendor vortex.
 */
export const VendorVortexSchema = SchemaFactory.createForClass(VendorVortex);