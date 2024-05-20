import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

/*
* Import user created modules
* */
import { EducationMillitaryType } from "../enums/education-millitary-type.enum";
import { EducationUsCitizenship } from "../enums/education-us-citizenship.enum";
import { EducationInternetPc } from "../enums/education-internet-pc.enum";
import {
  EducationTeachingLicense
} from "../enums/education-teaching-license.enum";
import { EducationRnLicense } from "../enums/education-rn-license.enum";
import {
  EducationEnrolledStatus
} from "../enums/education-enrolled-status.enum";


@Schema({ _id: false })
export class EducationSearchLeadBackground {

  @Prop({ type: String, isRequired: false, enum: EducationMillitaryType })
  military_type?: EducationMillitaryType;

  @Prop({ type: String, isRequired: false, enum: EducationUsCitizenship })
  us_citizen?: EducationUsCitizenship;

  @Prop({ type: String, isRequired: false, enum: EducationInternetPc })
  internet_pc?: EducationInternetPc;

  @Prop({ type: String, isRequired: false, enum: EducationTeachingLicense })
  teaching_license?: EducationTeachingLicense;

  @Prop({ type: String, isRequired: false, enum: EducationRnLicense })
  rn_license?: EducationRnLicense;

  @Prop({ type: String, isRequired: false, enum: EducationEnrolledStatus })
  enrolled_status?: EducationEnrolledStatus;
}


export const EducationSearchLeadBackgroundSchema = SchemaFactory.createForClass(EducationSearchLeadBackground);
