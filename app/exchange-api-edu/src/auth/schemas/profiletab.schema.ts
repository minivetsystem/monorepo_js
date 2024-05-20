import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from './role.schema';
import { ProfileTabSetting } from './profiletabsetting.schema';

export type ProfileTabDocument = HydratedDocument<ProfileTab>;

@Schema({ versionKey: false })
export class ProfileTab {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  tab: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProfileTabSetting' }] })
  settings: ProfileTabSetting[];
}

export const ProfileTabSchema = SchemaFactory.createForClass(ProfileTab);