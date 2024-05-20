import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { HttpModule } from '@nestjs/axios';
import {
  Admin,
  AdminSchema
} from './schemas';
import {
  User,
  UserSchema
} from "../users/schemas";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import { Vendor, VendorSchema } from '../vendors/schemas';
import { VendorApiKey, VendorApiKeySchema } from '../vendors/schemas';
import { Role, RoleSchema } from '../auth/schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: VendorApiKey.name, schema: VendorApiKeySchema },
      { name: Role.name, schema: RoleSchema }
    ]),
  ],
  controllers: [AdminsController],
  providers: [AdminsService, AuthService, UsersService, JwtService],
})
export class AdminsModule {}
