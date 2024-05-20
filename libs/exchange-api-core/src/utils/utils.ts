import {clearMongoDatabase} from "./clearMongoDatabse/clearMongoDatabse";
import { encrypt, decrypt } from "./encryption";

export class Utils {
  public static clearMongoDatabase = clearMongoDatabase;
  public static encrypt = encrypt;
  public static decrypt = decrypt;
}
