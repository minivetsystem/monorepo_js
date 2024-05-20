import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LeadTypeDocument = HydratedDocument<LeadType>;

@Schema({ versionKey: false })
export class LeadType {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  lead_type_id: number;

  @Prop()
  lead_type: string;

}

export const LeadTypeSchema = SchemaFactory.createForClass(LeadType);