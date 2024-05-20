import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorsService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { HttpModule } from '@nestjs/axios';
import {
  Vendor,
  VendorSchema
} from './schemas';
import {
  User,
  UserSchema
} from "../users/schemas";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { VendorApiKey, VendorApiKeySchema } from './schemas/vendorapikey.schema';
import { JwtService } from "@nestjs/jwt";
import { Admin, AdminSchema } from '../admins/schemas';
import { Role, RoleSchema } from '../auth/schemas';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: VendorApiKey.name, schema: VendorApiKeySchema },
      { name: Admin.name, schema: AdminSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [VendorsController],
  providers: [VendorsService, AuthService, UsersService, JwtService],
})
export class VendorsModule {}
