import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * This represents the entity document.
 */
export type EntityDocument = HydratedDocument<Entity>;

/**
 * This class serves as the model for the Entity.
 */
@Schema({ versionKey: false })
export class Entity {
  /**
   * Object Id for the Entity.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * Name of the entity
   */
  @Prop()
  name: string;
}

/**
 * This represents the schema for the entity.
 */
export const EntitySchema = SchemaFactory.createForClass(Entity);
