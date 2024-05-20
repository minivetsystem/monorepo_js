import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";
import { Role } from "../../auth/schemas";
import { Campaign } from "../../campaigns/schemas";
import { VendorLeadTypeSetting } from "./vendorleadtypesetting.schema";
import { VendorVortex } from "./vendorvortex.schema";
import { ClientVortex } from "./clientvortex.schema";
import { ClientLeadTypeCap } from "./clientleadtypecap.schema";
import { VendorSubID } from "../../verticals/autoinsurance/schemas";

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  first_name: string;

  @Prop()
  middle_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  primary_phone: string;

  @Prop()
  secondary_phone: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop()
  zip: string;

  @Prop()
  country: string;

  @Prop()
  website: string;

  @Prop()
  user_status: string;

  @Prop()
  is_call_center: boolean;

  @Prop()
  accept_returns: boolean;

  @Prop()
  is_hide_all_leads_reports: boolean;

  @Prop()
  is_io_received: boolean;

  @Prop()
  vendor_lead_quality: string;

  @Prop()
  lead_flow_status: string;

  @Prop()
  is_allowed_by_ews: boolean;

  @Prop()
  is_trusted_form_claim_enabled: boolean;

  @Prop()
  payment_method: string;

  @Prop()
  is_return_reminder_email: boolean;

  @Prop()
  prepays: boolean;

  @Prop()
  main_email_list: string;

  @Prop()
  tech_email_list: string;

  @Prop()
  returns_email_list: string;

  @Prop()
  invoice_notes: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  role: Role;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" })
  campaign: Campaign;

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorLeadTypeSetting"
    }]
  })
  lead_type_settings: VendorLeadTypeSetting[];

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorVortex"
    }]
  })
  vendor_vortex: VendorVortex[];

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientVortex"
    }]
  })
  client_vortex: ClientVortex[];

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientLeadTypeCap"
    }]
  })
  per_min_ping_caps: ClientLeadTypeCap[];

  @Prop({
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "VendorSubID"
    }]
  })
  vendor_subids: VendorSubID[];

  @Prop()
  partner_code: string;

  @Prop({ required: true })
  added_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  added_by: User;

  @Prop()
  updated_on: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  updated_by: User;

  @Prop({ isRequired: false, type: String })
  leadhoop_partner_code?: string;

  @Prop({ isRequired: false, type: String })
  leadhoop_partner_username?: string;

  @Prop({ isRequired: false, type: String })
  leadhoop_partner_password?: string;

  @Prop({ isRequired: false, type: String })
  leadhoop_service_url?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
