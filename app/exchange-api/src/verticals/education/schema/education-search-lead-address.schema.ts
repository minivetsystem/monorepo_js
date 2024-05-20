import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ _id: false })
export class EducationSearchLeadAddress {

  @Prop({type: String, isRequired: false})
  address?: string;

  @Prop({type: String, isRequired: false})
  address2?: string;

  @Prop({type: Number, isRequired: true})
  zip: number

  @Prop({type: String, isRequired: true})
  city: string

  @Prop({type: String, isRequired: true})
  state: string
}


export const EducationSearchLeadAddressSchema = SchemaFactory.createForClass(EducationSearchLeadAddress);
