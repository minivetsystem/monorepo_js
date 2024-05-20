import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { PERMISSION_ACTION, PERMISSION_CHECKER_KEY } from "../config/constants";
import { PermissionObjectType } from "../casl/casl-ability.factory";

/**
 * Action object.
 */
export type RequiredPermission = [PERMISSION_ACTION, PermissionObjectType];
/**
 * Check permission function.
 * @param params params
 * @constructor
 */
export const CheckPermissions = (...params: RequiredPermission[]): CustomDecorator<string> =>
  SetMetadata(PERMISSION_CHECKER_KEY, params);