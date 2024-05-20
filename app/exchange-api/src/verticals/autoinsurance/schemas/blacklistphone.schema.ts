import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlacklistPhoneDocument = HydratedDocument<BlacklistPhone>;

@Schema({ versionKey: false })
export class BlacklistPhone {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  phone: string;
}

export const BlacklistPhoneSchema = SchemaFactory.createForClass(BlacklistPhone);
