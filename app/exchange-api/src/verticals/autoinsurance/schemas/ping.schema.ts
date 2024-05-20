import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IncomingRequest } from './incomingrequest.schema';
import { User } from '../../../users/schemas';
import { PingClient } from './pingclient.schema';
import { ClientReason } from './clientreason.schema';

export type PingDocument = HydratedDocument<Ping>;

@Schema({ versionKey: false })
export class Ping {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor_id: User;

  @Prop()
  lead_type: number;

  @Prop()
  lead_mode: number;

  @Prop()
  start_time: Date;

  @Prop()
  end_time: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IncomingRequest' }] })
  pings: IncomingRequest[];

  @Prop([{ type: PingClient, _id: false }])
  clients: PingClient [];

  @Prop({ type: ClientReason })
  reasons: ClientReason;
}

export const PingSchema = SchemaFactory.createForClass(Ping);
