import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";
import { Vendor } from '../../vendors/schemas';
import { Admin } from '../../admins/schemas';
import { Role } from "../../auth/schemas";

/**
 * This represents the document for the user model.
 */
export type UserDocument = HydratedDocument<User>;

/**
 * This represents the schema for the user model.
 */
@Schema({ versionKey: false })
export class User {
  /**
   * Object Id for the user.
   */
  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;
  /**
   * User first name
   */
  @Prop()
  first_name: string;
  /**
   * User last name
   */
  @Prop()
  last_name: string;
  /**
   * User email.
   */
  @Prop()
  email: string;
  /**
   * User password.
   */
  @Prop()
  password: string;
  /**
   * User primary phone.
   */
  @Prop()
  primary_phone: string;
  /**
   * User secondary phone.
   * */
  @Prop()
  secondary_phone: string;
  /**
   * User address.
   */
  @Prop()
  address: string;
  /**
   * User city.
   * */
  @Prop()
  city: string;
  /**
   * User zip.
   * */
  @Prop()
  zip: string;
  /**
   * User country.
   * */
  @Prop()
  country: string;
  /**
   * User status.
   */
  @Prop()
  user_status: string;
  /**
   * Vendor linked to this user.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Vendor'})
  vendor: Vendor;
  /**
   * Admin account linked to this user.
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Admin' })
  admin: Admin;
  /**
   * User role
   */
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
