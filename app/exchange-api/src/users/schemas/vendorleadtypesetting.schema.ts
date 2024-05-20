import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas';
import { LeadType } from '../../verticals/autoinsurance/schemas';

export type VendorLeadTypeSettingDocument = HydratedDocument<VendorLeadTypeSetting>;

@Schema({ versionKey: false })
export class VendorLeadTypeSetting {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeadType',
    required: true,
  })
  lead_type: LeadType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  vendor: User;

  @Prop()
  status: string;

  @Prop()
  lead_flow_status: string;

  @Prop()
  payment_model: string;

  @Prop()
  rev_share: number;

  @Prop()
  vendor_min_payout_cap: number;

  @Prop()
  vendor_max_payout_cap: number;

  @Prop()
  min_profit_percent: number;

  @Prop()
  tcpa_text: string;

  @Prop()
  is_tcpa_text_active: boolean;

  @Prop()
  daily_accepted_cap: number;

  @Prop()
  hourly_accepted_cap: number;

  @Prop()
  is_daily_auto_verify_email: boolean;

  @Prop()
  max_pings_per_min_cap: number;

  @Prop()
  is_enable_auto_resubmit: boolean;

  @Prop()
  added_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  added_by: User;

  @Prop()
  updated_on: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  })
  updated_by: User;

}

export const VendorLeadTypeSettingSchema = SchemaFactory.createForClass(VendorLeadTypeSetting);