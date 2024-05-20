import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../../users/schemas';
import { Campaign } from '../../../campaigns/schemas';

export type VendorSubIDDocument = HydratedDocument<VendorSubID>;

@Schema({ versionKey: false })
export class VendorSubID {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor: User;

  @Prop()
  sub_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }] })
  campaigns: Campaign[];

  @Prop({ type: mongoose.Schema.Types.Boolean })
  is_blocked: boolean;
}

export const VendorSubIDSchema = SchemaFactory.createForClass(VendorSubID);