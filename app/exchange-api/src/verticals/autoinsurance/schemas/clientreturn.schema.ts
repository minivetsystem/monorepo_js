import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../../users/schemas';
import { LeadType } from './leadtype.schema';
import { Campaign } from '../../../campaigns/schemas';
import { Lead } from './lead.schema';

export type ClientReturnDocument = HydratedDocument<ClientReturn>;

@Schema({ versionKey: false })
export class ClientReturn {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Lead.name })
  lead: Lead;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campaign.name })
  campaign: Campaign;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LeadType.name })
  lead_type: LeadType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor: User;

  @Prop()
  lead_type_id: number;

  @Prop()
  vendor_price: number;

  @Prop()
  client_price: number;

  @Prop()
  revenue_share: number;

  @Prop()
  email: string;

  @Prop()
  return_code: number;

  @Prop()
  return_comments: string;

  @Prop()
  return_month: number;

  @Prop()
  return_year: number;

  @Prop()
  is_sent: boolean;

  @Prop()
  added_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  added_by: User;
}

export const ClientReturnSchema = SchemaFactory.createForClass(ClientReturn);
