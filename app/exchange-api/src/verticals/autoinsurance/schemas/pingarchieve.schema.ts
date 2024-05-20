import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IncomingRequest } from './incomingrequest.schema';
import { User } from '../../../users/schemas';
import { ClientReason } from './clientreason.schema';

export type PingArchieveDocument = HydratedDocument<PingArchieve>;

@Schema({ versionKey: false })
export class PingArchieve {

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

  @Prop({ type: ClientReason, _id: false })
  client_reasons: ClientReason;
}

export const PingArchieveSchema = SchemaFactory.createForClass(PingArchieve);
