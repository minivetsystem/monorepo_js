import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlacklistEmailDocument = HydratedDocument<BlacklistEmail>;

@Schema({ versionKey: false })
export class BlacklistEmail {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  email: string;
}

export const BlacklistEmailSchema = SchemaFactory.createForClass(BlacklistEmail);
