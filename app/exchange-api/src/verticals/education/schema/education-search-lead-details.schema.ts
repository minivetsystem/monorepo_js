import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

/*
* User Created Modules
* */
import { Gender } from "../enums/gender.enum";
import { BestTimeContact } from "../enums/best-time-contact.enum";


@Schema({ _id: false })
export class EducationSearchLeadDetails {

  @Prop({ type: String, isRequired: true })
  phone: string;

  @Prop({ type: String, isRequired: true })
  email: string;

  @Prop({ type: String, isRequired: true })
  ip: string;

  @Prop({ type: String, isRequired: false })
  firstname?: string;

  @Prop({ type: String, isRequired: false })
  lastname?: string;

  @Prop({ type: String, isRequired: false, enum: Gender })
  gender?: Gender;

  @Prop({ type: Number, isRequired: false })
  age?: number;

  @Prop({ type: String, isRequired: false })
  dob?: string;

  @Prop({ type: String, isRequired: false, enum: BestTimeContact })
  besttime_contact?: BestTimeContact;

  @Prop({ type: String, isRequired: true })
  service_leadid: string;

  @Prop({ type: String, isRequired: false })
  source_service_leadid?: string;

  @Prop({ type: String, isRequired: false })
  service_trusted_form?: string;

  @Prop({ type: String, isRequired: false })
  source_service_trusted_form?: string;

  @Prop({ type: String, isRequired: false })
  signup_url?: string;

  @Prop({ type: String, isRequired: false })
  consent_url?: string;
}

export const EducationSearchLeadDetailsSchema = SchemaFactory.createForClass(EducationSearchLeadDetails);
