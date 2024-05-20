import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../../users/schemas';

export type BlacklistJornayaIdDocument = HydratedDocument<BlacklistJornayaId>;

@Schema({ versionKey: false })
export class BlacklistJornayaId {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  universal_leadid: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor: User;
}

export const BlacklistJornayaIdSchema = SchemaFactory.createForClass(BlacklistJornayaId);
