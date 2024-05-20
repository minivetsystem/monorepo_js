import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsuranceOutPingDocument = HydratedDocument<AutoInsuranceOutPing>;

@Schema({ versionKey: false })
export class AutoInsuranceOutPing {

  @Prop()
  count: number;
}

export const AutoInsuranceOutPingSchema = SchemaFactory.createForClass(AutoInsuranceOutPing);
