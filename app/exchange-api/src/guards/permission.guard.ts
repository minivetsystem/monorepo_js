import {
  CanActivate,
  ExecutionContext,
  HttpException, HttpStatus,
  Injectable
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactory } from "../casl/casl-ability.factory";
import {
  RequiredPermission
} from "../decorators/check-permission.decorator";
import { PERMISSION_CHECKER_KEY } from '../config/constants';

export class UnauthorizedException extends HttpException {
  constructor() {
    super('User is not authorised.', HttpStatus.UNAUTHORIZED);
  }
}

/**
 * This serves as the guard for the permission.
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  /**
   * Constructor for the guard.
   * @param reflector reflector
   * @param abilityFactory ability factory
   */
  constructor(private reflector: Reflector, private abilityFactory: CaslAbilityFactory) {}

  /**
   * This function is used to check for the permission.
   * @param context
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(PERMISSION_CHECKER_KEY, context.getHandler()) || [];
    const {user} = context.switchToHttp().getRequest();
    const user_id = user._id;
    const ability = await this.abilityFactory.createForUser(user_id);
    if(!requiredPermissions.every(permission => this.isAllowed(ability, permission))) {
      throw new UnauthorizedException();
    }
    return requiredPermissions.every(permission => this.isAllowed(ability, permission));
  }

  /**
   * This function is used to check if the user is allowed to perform the
   * action.
   * @param ability ability for the user.
   * @param permission permission
   * @private
   */
  private isAllowed(ability: AppAbility, permission: RequiredPermission): boolean {
    return ability.can(...permission);
  }
}
