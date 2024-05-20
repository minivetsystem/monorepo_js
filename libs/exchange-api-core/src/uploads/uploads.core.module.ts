import { Module } from '@nestjs/common';
import { UploadsCoreAwsService } from "./uploads.core.aws.service";

@Module({
  providers: [UploadsCoreAwsService],
  exports: [UploadsCoreAwsService],
})
export class UploadsCoreModule {}
