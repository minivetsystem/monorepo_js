import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { EntitySetting } from './entitysetting.schema';

export type ProfileTabSettingDocument = HydratedDocument<ProfileTabSetting>;

@Schema({ versionKey: false })
export class ProfileTabSetting {

  @Prop()
  index: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'EntitySetting' })
  setting: EntitySetting;

}

export const ProfileTabSettingSchema = SchemaFactory.createForClass(ProfileTabSetting);