import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Permission } from "./permission.schema";

/**
 * This represents the role document.
 */
export type RoleDocument = HydratedDocument<Role>;

/**
 * This class serves as the model for the Role.
 */
@Schema({ versionKey: false })
export class Role {
  /**
   * Object Id for the role.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * Name of role.
   */
  @Prop()
  name: string;
  /**
   * Permission set for the role.
   */
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  permissions: Permission[];
}

/**
 * This serves as the schema for the role
 */
export const RoleSchema = SchemaFactory.createForClass(Role);
