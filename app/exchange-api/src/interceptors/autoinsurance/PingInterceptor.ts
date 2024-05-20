import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { LeadsService } from '../../verticals/autoinsurance/leads.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VALIDATION_MESSAGES } from '../../config/constants';

@Injectable()
export class PingInterceptor implements NestInterceptor {
    constructor(private leadsService: LeadsService) {}
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;
    const vendor_id = body.vendor_id;
    const lead_type_id = body.lead_type;
    const isVendorAllowedForPing = await this.leadsService.validateVendorForLeadFlowStatus(vendor_id, lead_type_id);

    if(!isVendorAllowedForPing) {
      return next
      .handle()
      .pipe(
        catchError(() => throwError(() => new BadRequestException(VALIDATION_MESSAGES.vendor_not_allowed))),
      );
    }

    return next.handle();
  }
}