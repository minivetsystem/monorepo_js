import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsurancePingsForBidDocument = HydratedDocument<AutoInsurancePingsForBid>;

@Schema({ versionKey: false })
export class AutoInsurancePingsForBid {

  @Prop()
  count: number;
}

export const AutoInsurancePingsForBidSchema = SchemaFactory.createForClass(AutoInsurancePingsForBid);