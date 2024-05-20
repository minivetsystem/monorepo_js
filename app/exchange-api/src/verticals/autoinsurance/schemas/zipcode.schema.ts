import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ZipcodeDocument = HydratedDocument<Zipcode>;

/**
 * This schema represents the zip code for USA.
 */
@Schema({ versionKey: false })
export class Zipcode {
  /**
   * This represents the zip code.
   */
  @Prop()
  zip_code: number;
}

/**
 * This represents the schema for the zip code.
 */
export const ZipcodeSchema = SchemaFactory.createForClass(Zipcode);
