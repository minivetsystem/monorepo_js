import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsuranceBidDocument = HydratedDocument<AutoInsuranceBid>;

@Schema({ versionKey: false })
export class AutoInsuranceBid {

  @Prop()
  count: number;
}

export const AutoInsuranceBidSchema = SchemaFactory.createForClass(AutoInsuranceBid);