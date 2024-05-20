import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from "../../users/schemas";
import { Campaign } from '../../campaigns/schemas';

export type ClientVortexDocument = HydratedDocument<ClientVortex>;

@Schema({ versionKey: false })
export class ClientVortex {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  client: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
  campaign: Campaign;

  @Prop()
  is_account_created: boolean;

  @Prop()
  is_io_received: boolean;

  @Prop()
  is_in_development: boolean;

  @Prop()
  is_in_testing: boolean;

  @Prop()
  is_tests_approved: boolean;

  @Prop()
  is_vendors_mapped: boolean;

  @Prop()
  is_made_live: boolean;

  @Prop()
  is_numbers_confirmed: boolean;

  @Prop()
  added_on: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  added_by: User;

  @Prop()
  updated_on: Date;

  @Prop({
  type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updated_by: User;
}

export const ClientVortexSchema = SchemaFactory.createForClass(ClientVortex);