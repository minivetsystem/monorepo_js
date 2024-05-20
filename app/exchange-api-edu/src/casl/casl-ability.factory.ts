import { MongoAbility, createMongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { Permission } from "../auth/schemas";
import { PERMISSION_ACTION } from "../config/constants";

/**
 * Permission Object Type.
 */
export type PermissionObjectType = any;
export type AppAbility = MongoAbility<[PERMISSION_ACTION, PermissionObjectType]>;

/**
 * Interface for the casl permission.
 */
interface CaslPermission {
  action: PERMISSION_ACTION;
  subject: string;
}

/**
 * This class is used to fetch all the user permissions and map them to the
 * casl permissions.
 */
@Injectable()
export class CaslAbilityFactory {
  /**
   * Constructor for the factory.
   * @param authoService
   */
  constructor(private authoService: AuthService) {}

  /**
   * This function is used to fetch user permissions and map them to the
   * casl permissions.
   * @param user_id user id
   */
  async createForUser(user_id: string): Promise<AppAbility> {
    const dbPermissions: Permission[] = await this.authoService.fetchUserPermissions(user_id);
    const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
      action: PERMISSION_ACTION[p.action],
      subject: p.entity.name,
    }));
    return createMongoAbility<[PERMISSION_ACTION, PermissionObjectType]>(caslPermissions);
  }
}
