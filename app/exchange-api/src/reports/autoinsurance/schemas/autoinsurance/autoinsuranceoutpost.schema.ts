import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsuranceOutPostDocument = HydratedDocument<AutoInsuranceOutPost>;

@Schema({ versionKey: false })
export class AutoInsuranceOutPost {

  @Prop()
  count: number;
}

export const AutoInsuranceOutPostSchema = SchemaFactory.createForClass(AutoInsuranceOutPost);