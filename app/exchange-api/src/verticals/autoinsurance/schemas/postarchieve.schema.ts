import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IncomingRequest } from './incomingrequest.schema';
import { User } from '../../../users/schemas';
import { Campaign } from '../../../campaigns/schemas';
import { ClientReason } from './clientreason.schema';
import { Lead } from './lead.schema';

export type PostArchieveDocument = HydratedDocument<PostArchieve>;

@Schema({ versionKey: false })
export class PostArchieve {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor_id: User;

  @Prop()
  lead_type: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client_id: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campaign.name })
  campaign_id: Campaign;

  @Prop()
  lead_mode: number;

  @Prop()
  start_time: Date;

  @Prop()
  end_time: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'IncomingRequest' }] })
  posts: IncomingRequest[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }] })
  leads: Lead[];

  @Prop({ type: ClientReason })
  reasons: ClientReason;
}

export const PostArchieveSchema = SchemaFactory.createForClass(PostArchieve);
