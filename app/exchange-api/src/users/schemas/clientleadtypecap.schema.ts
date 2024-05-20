import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from "../../users/schemas";
import { LeadType } from '../../verticals/autoinsurance/schemas';

export type ClientLeadTypeCapDocument = HydratedDocument<ClientLeadTypeCap>;

@Schema({ versionKey: false })
export class ClientLeadTypeCap {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  client: User;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'LeadType' })
  lead_type: LeadType;

  @Prop()
  per_min_ping_cap: number;

}

export const ClientLeadTypeCapSchema = SchemaFactory.createForClass(ClientLeadTypeCap);