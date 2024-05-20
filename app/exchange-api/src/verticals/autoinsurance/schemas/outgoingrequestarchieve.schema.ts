import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IncomingRequest } from './incomingrequest.schema';
import { User } from '../../../users/schemas';
import { LeadType } from './leadtype.schema';

export type OutgoingRequestArchieveDocument = HydratedDocument<OutgoingRequestArchieve>;

@Schema({ versionKey: false })
export class OutgoingRequestArchieve {

  @Prop({ type: mongoose.SchemaTypes.ObjectId })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LeadType.name })
  lead_type: LeadType;

  @Prop({ type: mongoose.Schema.Types.Number })
  lead_mode: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: IncomingRequest.name })
  incoming_request: IncomingRequest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: User;

  @Prop()
  request_type: string;

  @Prop()
  status: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  ping_time: Date;
}

export const OutgoingRequestArchieveSchema = SchemaFactory.createForClass(OutgoingRequestArchieve);
