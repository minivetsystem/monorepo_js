import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import {
  User,
  UserSchema
} from "../users/schemas";
import { CaslAbilityFactory } from "./casl-ability.factory";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [],
  providers: [CaslAbilityFactory, AuthService, UsersService, JwtService],
  exports: [CaslAbilityFactory],
})
export class CaslModule {}
