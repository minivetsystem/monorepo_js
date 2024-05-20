import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from "./permission.schema";
import { User } from '../../users/schemas';
import { ProfileTab } from './profiletab.schema';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ versionKey: false })
export class Role {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  permissions: Permission[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: User[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProfileTab' }] })
  profiletabs: ProfileTab[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
