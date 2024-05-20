import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from "mongoose";
import { User } from '../../users/schemas';

/**
 * This represents the document for the admin model.
 */
export type AdminDocument = HydratedDocument<Admin>;

/**
 * This represents the schema for the admin model.
 */
@Schema({ versionKey: false })
export class Admin {
  /**
   * ObjectId for the admin model.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * Reference to the user schema.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
  /**
  * Is the user deleted.
  */
  @Prop()
  is_deleted: boolean
  /**
   * Date on which the admin was added.
   */
  @Prop({ required: true })
  added_on: Date;
  /**
   * Who added the admin user.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  added_by: User;
  /**
   * Date on which the admin was last modified.
   */
  @Prop()
  updated_on: Date;
  /**
   * Who modified the admin user last.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  updated_by: User;
  /**
   * Date on which the amdin was deleted.
   */
  @Prop()
  deleted_on: Date;
  /**
   * Who deleted the admin user.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  deleted_by: User;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
