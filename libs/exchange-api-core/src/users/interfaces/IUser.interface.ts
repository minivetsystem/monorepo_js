import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  isOwner: boolean;
  emailVerified: boolean;
  emailVerificationDate: Date;
  isDeleted: boolean;
  deletedAt: Date;
  isVendor: boolean;
}
