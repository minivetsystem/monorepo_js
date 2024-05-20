import { Injectable } from '@nestjs/common';
import { generateFileName } from './assignFilename.helpers';
import { ConfigService } from '@nestjs/config';
import { S3, Credentials } from 'aws-sdk';
import { Express } from 'express';
import { Multer } from 'multer';
import sharp from 'sharp';

@Injectable()
export class UploadsCoreAwsService {
  constructor(private readonly configService: ConfigService) {}

  async upload(file: Express.Multer.File) {
    const s3 = new S3();
    try {
      const image = sharp(file.buffer); // path to the stored image
      const metadata = await image.metadata();
      let buffer;
      if (metadata.width > 1800) {
        buffer = await image.resize({ width: 1800 }).toBuffer(); // resize if too big
      } else {
        buffer = await image.toBuffer();
      }
      const uploadResult = await s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME') + '/funeral-registry',
        Body: buffer,
        Key: generateFileName(file),
      })
      .promise();
      return uploadResult.Key;
    } catch (errors) {
      console.log(errors);
    }
  }
}
