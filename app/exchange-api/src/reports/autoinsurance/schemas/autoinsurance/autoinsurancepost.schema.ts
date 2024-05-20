import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsurancePostDocument = HydratedDocument<AutoInsurancePost>;

@Schema({ versionKey: false })
export class AutoInsurancePost {

  @Prop()
  count: number;
}

export const AutoInsurancePostSchema = SchemaFactory.createForClass(AutoInsurancePost);
