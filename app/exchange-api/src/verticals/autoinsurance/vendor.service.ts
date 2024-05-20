import { Injectable, BadRequestException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';
import {
  JornayaResponseRO,
  BlacklistAliancePhoneRO,
  BlacklistAlianceTCPALitigatorPhoneRO,
} from './interfaces';
import { ConfigService } from '@nestjs/config';

/**
 * This is the 3rd Party Vendor Service which is used to validate against 3rd Party services.
 */
@Injectable()
export class VendorService {
  /**
   * This represents the constructor for the validation service.
   * @param httpService  HTTP Service
   * @param configService Config Service
   */
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  /**
   * This function is responsible for performing the 3rd party leadID validation.
   * @param lead_id This represents the lead_id from the ping & post request.
   * @returns JornayaResponseRO Promise
   */
  async validationleadID(lead_id: string): Promise<JornayaResponseRO> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<JornayaResponseRO>(
          `${this.configService.get<string>(
            'JORNAYA_API_URL',
          )}?lac=${this.configService.get<string>(
            'JORNAYA_ACCOUNT_CODE',
          )}&id=${lead_id}`,{ headers: { 'Content-Type': 'application/json' }}
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(error);
          }),
        ),
    );
    return data;
  }

  /**
   * This function is used to validate the primary phone in post request against blacklist aliance 3rd party service.
   * @param primary_phone This represents the primary_phone to be validated.
   * @returns Promise boolean validation status
   */
  async validateBlacklistAliancePhone(primary_phone: string): Promise<boolean> {
    try {
      const url = `${this.configService.get<string>(
        'BLACKLIST_ALIANCE_API_URL',
      )}${this.configService.get<string>(
        'BLACKLISTALLIANCE_API_TOKEN',
      )}/phone/${primary_phone}/response/json`;
  
      const { data } = await firstValueFrom(
        this.httpService.get<BlacklistAliancePhoneRO>(url, { headers: { 'Content-Type': 'application/json' }}).pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(error);
          }),
        ),
      );
  
      return data.status === 'success';
    } catch (err) {
      return false;
    }
  }

  /**
   * This function is responsible for validating the phone no. against the blacklist TCPA Litigator 3rd party service.
   * @param primary_phone phone no. from the post request to be validated.
   * @returns Promise boolean result
   */
  async validateBlacklistTCPALitigatorPhone(
    primary_phone: string,
  ): Promise<boolean> {
    const url = `${this.configService.get<string>(
      'BLACKLISTTCPALITIGATOR_API_URL',
    )}/${primary_phone}`;

    const { data } = await firstValueFrom(
      this.httpService
        .get<BlacklistAlianceTCPALitigatorPhoneRO>(url,  {
          headers: { 'Content-Type': 'application/json' },
          auth: {
            username: this.configService.get<string>(
              'BLACKLISTTCPALITIGATOR_API_USERNAME',
            ),
            password: this.configService.get<string>(
              'BLACKLISTTCPALITIGATOR_API_PASSWORD',
            ),
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new BadRequestException(error);
          }),
        ),
    );

    return data.results.is_bad_number;
  }
}
