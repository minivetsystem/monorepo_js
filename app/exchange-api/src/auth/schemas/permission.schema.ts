import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Entity } from "./entity.schema";

/**
 * This represents the document for the permission.
 */
export type PermissionDocument = HydratedDocument<Permission>;

/**
 * This class serves as the model for the Permission.
 */
@Schema({ versionKey: false })
export class Permission {
  /**
   * Object Id for the permission.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * Action like Add, Edit, Delete, View, Manage.
   */
  @Prop()
  action: string;
  /**
   * Entity for this permission.
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entity',
    required: true,
  })
  entity: Entity;
}

/**
 * This represents the schema for the permission model.
 */
export const PermissionSchema = SchemaFactory.createForClass(Permission);
