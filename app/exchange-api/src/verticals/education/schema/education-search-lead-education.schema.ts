import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EducationLevelId } from "../enums/education-level-id.enum";
import { EducationStartDate } from "../enums/education-start-date.enum";
import {
  EducationLevelOfInterest
} from "../enums/education-level-of-interest.enum";
import { EducationAreaOfStudies } from "../enums/education-area-of-studies";
import { EducationProgramNames } from "../enums/education-program-names.enum";
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
export class EducationSearchLeadEducation {

  @Prop({ type: Number, isRequired: false })
  grad_year?: number;

  @Prop({ type: String, isRequired: false, enum: EducationLevelId })
  education_level_id?: EducationLevelId;

  @Prop({ type: String, isRequired: false, enum: EducationStartDate })
  start_date?: EducationStartDate;

  @Prop({ type: Number, isRequired: true })
  school_type: number;

  @Prop({ type: String, isRequired: false, enum: EducationLevelOfInterest })
  level_interest?: EducationLevelOfInterest;

  @Prop({ type: Array, isRequired: false })
  area_of_studies?: EducationAreaOfStudies[];

  @Prop({ type: Array, isRequired: false })
  program_names?: EducationProgramNames[];


}


export const EducationSearchLeadEducationSchema = SchemaFactory.createForClass(EducationSearchLeadEducation);
