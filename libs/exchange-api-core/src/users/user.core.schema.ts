import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema({ timestamps: true })
export class Users {
  @Prop({
    type: String,
    nullable: false,
    unique: true,
    fake: {
      generator: "name",
      type: "firstName"
    }
  })
  email: string;

  @Prop({ type: String, nullable: false })
  password: string;

  @Prop({ type: String, nullable: true })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String, nullable: true })
  profileImage: string;

  @Prop({ type: Boolean, default: false })
  isOwner: boolean;

  @Prop({ type: Boolean, default: false })
  emailVerified: boolean;

  @Prop({ type: Date, nullable: true, default: null })
  emailVerificationDate: Date;

  @Prop({ type: Boolean, default: false })
  isDeleted: boolean;

  @Prop({ type: Date, default: null, nullable: true })
  deletedAt: Date;

  @Prop({ type: Boolean, nullable: true, default: false })
  isVendor: boolean;
}

export type UsersDocument = HydratedDocument<Users>;
export const UsersSchema = SchemaFactory.createForClass(Users);
