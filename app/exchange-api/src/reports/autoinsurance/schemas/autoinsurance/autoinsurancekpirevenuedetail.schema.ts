import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AutoInsuranceKPIRevenueDetailDocument = HydratedDocument<AutoInsuranceKPIRevenueDetail>;

@Schema({ versionKey: false })
export class AutoInsuranceKPIRevenueDetail {

  @Prop()
  client_price: number;

  @Prop()
  revenue_share: number;

  @Prop()
  vendor_price: number;
}

export const AutoInsuranceKPIRevenueDetailSchema = SchemaFactory.createForClass(AutoInsuranceKPIRevenueDetail);