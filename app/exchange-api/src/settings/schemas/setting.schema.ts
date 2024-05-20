import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from "../../users/schemas";

/**
 * This document for global setting schema.
 */
export type SettingDocument = HydratedDocument<Setting>;

/**
 * This schema represents the data for vendor status log.
 */
@Schema({ versionKey: false })
export class Setting {
  /**
   * This represents the _id ObjectId from MongoDB.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  /**
   * This represents the global setting name for entire app.
   */
  @Prop()
  name: string;

  /**
  * This represents global setting value for entire app.
  */
  @Prop()
  value: string;

  /**
  * This represents global setting type for entire app.
  */
  @Prop()
  type: string;

  /**
   * This represents when was the setting added.
   */
  @Prop()
  added_on: Date;
  /**
   * This represents who added the setting.
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  added_by: User;
}

/**
 * This represents the schema for the global setting.
 */
export const SettingSchema = SchemaFactory.createForClass(Setting);
