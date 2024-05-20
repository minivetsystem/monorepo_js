import { Module } from '@nestjs/common';
import { UsersCoreService } from './users.core.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersCoreFeature } from './users.core.feature';

@Module({
  imports: [MongooseModule.forFeatureAsync([UsersCoreFeature])],
  providers: [UsersCoreService],
  exports: [UsersCoreService],
})
export class UsersCoreModule {}
