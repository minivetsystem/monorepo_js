import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IncomingRequest } from './incomingrequest.schema';
import { User } from '../../../users/schemas';
import { Campaign } from '../../../campaigns/schemas';
import { LeadType } from './leadtype.schema';

export type BidArchieveDocument = HydratedDocument<BidArchieve>;

@Schema({ versionKey: false })
export class BidArchieve {

  @Prop({ type: mongoose.SchemaTypes.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LeadType.name })
  lead_type: LeadType;

  @Prop({ type: mongoose.Schema.Types.Number })
  lead_mode: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: IncomingRequest.name })
  request: IncomingRequest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campaign.name })
  campaign: Campaign;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: User;

  @Prop()
  client_rejection_reason: string;

  @Prop()
  client_request_payload: string;

  @Prop()
  client_response_payload: string;

  @Prop()
  client_status: string;

  @Prop()
  client_ping_confirmation_id: string;

  @Prop()
  client_price: number;

  @Prop()
  vendor_price: number;

  @Prop()
  revenue_share: number;

  @Prop()
  confirmation_code: string;

  @Prop()
  added_on: Date;

  @Prop()
  is_deleted: boolean
}

export const BidArchieveSchema = SchemaFactory.createForClass(BidArchieve);
