import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsurancePingDocument = HydratedDocument<AutoInsurancePing>;

@Schema({ versionKey: false })
export class AutoInsurancePing {

  @Prop()
  count: number;
}

export const AutoInsurancePingSchema = SchemaFactory.createForClass(AutoInsurancePing);
