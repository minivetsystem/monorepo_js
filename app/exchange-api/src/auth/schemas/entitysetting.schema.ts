import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Entity } from './entity.schema';
import { Role } from './role.schema';

export type EntitySettingDocument = HydratedDocument<EntitySetting>;

@Schema({ versionKey: false })
export class EntitySetting {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entity',
    required: true,
  })
  entity: Entity;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const EntitySettingSchema = SchemaFactory.createForClass(EntitySetting);