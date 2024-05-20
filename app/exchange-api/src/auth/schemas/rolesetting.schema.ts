import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { EntitySetting } from './entitysetting.schema';
import { Role } from './role.schema';

export type RoleSettingDocument = HydratedDocument<RoleSetting>;

@Schema({ versionKey: false })
export class RoleSetting {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EntitySetting',
    required: true,
  })
  entitysetting: EntitySetting;
}

export const RoleSettingSchema = SchemaFactory.createForClass(RoleSetting);