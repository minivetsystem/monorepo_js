import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../../users/schemas';
import { Lead } from './lead.schema';
import { ClientReturn } from './clientreturn.schema';

export type ClientSentReturnDocument = HydratedDocument<ClientSentReturn>;

@Schema({ versionKey: false })
export class ClientSentReturn {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Lead.name }])
  leads: Lead [];

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ClientReturn.name }])
  client_returns: ClientReturn [];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor: User;

  @Prop()
  sent_to: string;

  @Prop()
  return_month: number;

  @Prop()
  return_year: number;

  @Prop()
  lead_type_id: number;

  @Prop()
  added_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  added_by: User;
}

export const ClientSentReturnSchema = SchemaFactory.createForClass(ClientSentReturn);