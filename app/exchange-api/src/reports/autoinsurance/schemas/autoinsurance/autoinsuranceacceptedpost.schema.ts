import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsuranceAcceptedPostDocument = HydratedDocument<AutoInsuranceAcceptedPost>;

@Schema({ versionKey: false })
export class AutoInsuranceAcceptedPost {

  @Prop()
  count: number;
}

export const AutoInsuranceAcceptedPostSchema = SchemaFactory.createForClass(AutoInsuranceAcceptedPost);