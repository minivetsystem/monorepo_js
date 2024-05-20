import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchesController } from './searches.controller';
import { HttpModule } from '@nestjs/axios';
import { SearchesService } from "./searches.service";
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../users/schemas';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Vendor, VendorSchema } from '../vendors/schemas';
import { VendorApiKey, VendorApiKeySchema } from '../vendors/schemas';
import { SearchRequest, SearchRequestSchema } from './schemas';
import { SearchResult, SearchResultSchema } from './schemas';
import { Offer, OfferSchema } from './schemas';
import { OfferPostRequest, OfferPostRequestSchema } from './schemas';
import { OfferPostResult, OfferPostResultSchema } from './schemas';
import { Role, RoleSchema } from '../auth/schemas';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vendor.name, schema: VendorSchema },
      { name: VendorApiKey.name, schema: VendorApiKeySchema },
      { name: SearchRequest.name, schema: SearchRequestSchema },
      { name: SearchResult.name, schema: SearchResultSchema },
      { name: Offer.name, schema: OfferSchema },
      { name: OfferPostRequest.name, schema: OfferPostRequestSchema },
      { name: OfferPostResult.name, schema: OfferPostResultSchema },
      { name: Role.name, schema: RoleSchema }
    ]),
  ],
  controllers: [SearchesController],
  providers: [
    SearchesService,
    UsersService,
    JwtService,
    AuthService
  ],
})
export class SearchesModule {}
