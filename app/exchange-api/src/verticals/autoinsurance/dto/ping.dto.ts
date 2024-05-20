import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { registerDecorator, IsIP, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsUUID, IsUrl, Max, Min, ValidateIf, ValidationOptions } from "class-validator";
import moment from "moment";

export function IsValidDateWith24HourFormat(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsValidDateWith24HourFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return moment(value).isValid() && moment(value, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss') === value;
        },
      },
    });
  };
}
export function IsValidDateFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsValidDateFormat',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any) {
            return moment(value).isValid() && moment(value, 'YYYY-MM-DD').format('YYYY-MM-DD') === value;
          },
        },
      });
    };
  }

  export function PhoneLast4(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'phone_last_4',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any) {
            return value && value.toString().length === 4 ? true : false;
          },
        },
      });
    };
  }

export class PingDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    lead_type: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    lead_mode: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    vendor_id: string;

    @ApiProperty()
    @IsNotEmpty()
    sub_id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    tcpa_optin: number;

    @ApiProperty()
    @IsNotEmpty()
    tcpa_text: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    universal_leadid: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsValidDateWith24HourFormat({ message: 'Invalid origination_datetime, should be in format YYYY-MM-DD HH:mm:ss' })
    origination_datetime: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(4)
    origination_timezone: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsIP()
    ipaddress: string;

    @ApiProperty()
    @IsOptional()
    user_agent: string;

    @ApiProperty()
    @IsOptional()
    vendor_lead_id	: string;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    url	: string;

    //Custom
    @ApiProperty()
    @IsOptional()
    minimum_price: string;

    //Custom
    @ApiProperty()
    @IsNotEmpty()
    zip: number;

    @ApiProperty()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsOptional()
    @PhoneLast4({ message: 'phone_last_4 is invalid, should be last 4 digits of primary_phone.' })
    phone_last_4: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    residence_type: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10)
    years_at_residence: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10)
    months_at_residence: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(4)
    credit_rating: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    bankruptcy: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(4)
    coverageType: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle_comprehensiveDeductible: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle_collisionDeductible: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(8)
    medicalPayment: number;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
    xxtrustedformcerturl: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    haveInsurance: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.haveInsurance === 1)
    @IsInt()
    @Min(1)
    @Max(240)
    insuranceCompany: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.haveInsurance === 1)
    @IsValidDateFormat({ message: 'Invalid current_policy_start_date, should be in format YYYY-MM-DD' })
    current_policy_start_date: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.haveInsurance === 1)
    @IsValidDateFormat({ message: 'Invalid current_policy_expiration_date, should be in format YYYY-MM-DD' })
    current_policy_expiration_date: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.haveInsurance === 1)
    @IsInt()
    @Min(1)
    @Max(8)
    continuously_insured_period: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_gender: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsValidDateFormat({ message: 'Invalid driver1_dob, should be in format YYYY-MM-DD' })
    driver1_dob: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(6)
    driver1_maritalStatus: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(9)
    driver1_education: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(125)
    driver1_occupation: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_requiredSR22: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_hasTAVCs: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_hasTAVCs === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_numOfIncidents: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_incidentType1: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 1)
    @IsValidDateFormat({ message: 'Invalid driver1_incidentDate1, should be in format YYYY-MM-DD' })
    driver1_incidentDate1: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 1)
    driver1_ticket1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 2)
    driver1_accident1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_accident1Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_accident1Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 2)
    driver1_accident1Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 3)
    driver1_violation1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 3)
    driver1_violation1State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 4)
    driver1_claim1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 4)
    driver1_claim1PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_incidentType2: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 2)
    @IsValidDateFormat({ message: 'Invalid driver1_incidentDate2, should be in format YYYY-MM-DD' })
    driver1_incidentDate2: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 1)
    driver1_ticket2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 2)
    driver1_accident2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_accident2Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_accident2Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 2)
    driver1_accident2Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 3)
    driver1_violation2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 3)
    driver1_violation2State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 4)
    driver1_claim2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType2 === 4)
    driver1_claim2PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 3)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_incidentType3: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 3)
    @IsValidDateFormat({ message: 'Invalid driver1_incidentDate3, should be in format YYYY-MM-DD' })
    driver1_incidentDate3: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 1)
    driver1_ticket3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 2)
    driver1_accident3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_accident3Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_accident3Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 2)
    driver1_accident3Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 3)
    driver1_violation3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 3)
    driver1_violation3State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 4)
    driver1_claim3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType3 === 4)
    driver1_claim3PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_incidentType4: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 1)
    @IsValidDateFormat({ message: 'Invalid driver1_incidentDate4, should be in format YYYY-MM-DD' })
    driver1_incidentDate4: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 1)
    driver1_ticket4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 2)
    driver1_accident4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver1_accident4Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver1_accident4Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 2)
    driver1_accident4Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 3)
    driver1_violation4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 3)
    driver1_violation4State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 4)
    driver1_claim4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType4 === 4)
    driver1_claim4PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_gender: number;

    @ApiProperty()
    @IsOptional()
    @IsValidDateFormat({ message: 'Invalid driver2_dob, should be in format YYYY-MM-DD' })
    driver2_dob: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(6)
    driver2_maritalStatus: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9)
    driver2_education: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(125)
    driver2_occupation: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_requiredSR22: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_hasTAVCs: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_hasTAVCs === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_numOfIncidents: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_numOfIncidents >= 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_incidentType1: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_numOfIncidents >= 1)
    @IsValidDateFormat({ message: 'Invalid driver2_incidentDate1, should be in format YYYY-MM-DD' })
    driver2_incidentDate1: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 1)
    driver2_ticket1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 2)
    driver2_accident1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_accident1Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_accident1Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 2)
    driver2_accident1Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 3)
    driver2_violation1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 3)
    driver2_violation1State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 4)
    driver2_claim1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType1 === 4)
    driver2_claim1PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_numOfIncidents >= 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_incidentType2: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_numOfIncidents >= 2)
    @IsValidDateFormat({ message: 'Invalid driver2_incidentDate2, should be in format YYYY-MM-DD' })
    driver2_incidentDate2: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 1)
    driver2_ticket2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 2)
    driver2_accident2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_accident2Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_accident2Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 2)
    driver2_accident2Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 3)
    driver2_violation2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 3)
    driver2_violation2State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 4)
    driver2_claim2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType2 === 4)
    driver2_claim2PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_numOfIncidents >= 3)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_incidentType3: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_numOfIncidents >= 3)
    @IsValidDateFormat({ message: 'Invalid driver2_incidentDate3, should be in format YYYY-MM-DD' })
    driver2_incidentDate3: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 1)
    driver2_ticket3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 2)
    driver2_accident3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_accident3Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_accident3Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 2)
    driver2_accident3Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 3)
    driver2_violation3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 3)
    driver2_violation3State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 4)
    driver2_claim3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType3 === 4)
    driver2_claim3PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_incidentType4: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 1)
    @IsValidDateFormat({ message: 'Invalid driver2_incidentDate4, should be in format YYYY-MM-DD' })
    driver2_incidentDate4: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 1)
    driver2_ticket4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 2)
    driver2_accident4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver2_accident4Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver2_accident4Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 2)
    driver2_accident4Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 3)
    driver2_violation4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 3)
    driver2_violation4State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 4)
    driver2_claim4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver2_incidentType4 === 4)
    driver2_claim4PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_gender: number;

    @ApiProperty()
    @IsOptional()
    @IsValidDateFormat({ message: 'Invalid driver3_dob, should be in format YYYY-MM-DD' })
    driver3_dob: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(6)
    driver3_maritalStatus: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9)
    driver3_education: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(125)
    driver3_occupation: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_requiredSR22: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_hasTAVCs: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_hasTAVCs === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_numOfIncidents: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_numOfIncidents >= 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_incidentType1: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_numOfIncidents >= 1)
    @IsValidDateFormat({ message: 'Invalid driver3_incidentDate1, should be in format YYYY-MM-DD' })
    driver3_incidentDate1: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 1)
    driver3_ticket1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 2)
    driver3_accident1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_accident1Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_incidentType1 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_accident1Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 2)
    driver3_accident1Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 3)
    driver3_violation1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 3)
    driver3_violation1State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 4)
    driver3_claim1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType1 === 4)
    driver3_claim1PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_numOfIncidents >= 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_incidentType2: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_numOfIncidents >= 2)
    @IsValidDateFormat({ message: 'Invalid driver3_incidentDate2, should be in format YYYY-MM-DD' })
    driver3_incidentDate2: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 1)
    driver3_ticket2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 2)
    driver3_accident2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_accident2Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_accident2Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 2)
    driver3_accident2Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 3)
    driver3_violation2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 3)
    driver3_violation2State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 4)
    driver3_claim2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType2 === 4)
    driver3_claim2PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_numOfIncidents >= 3)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_incidentType3: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_numOfIncidents >= 3)
    @IsValidDateFormat({ message: 'Invalid driver3_incidentDate3, should be in format YYYY-MM-DD' })
    driver3_incidentDate3: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 1)
    driver3_ticket3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 2)
    driver3_accident3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_accident3Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_accident3Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 2)
    driver3_accident3Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 3)
    driver3_violation3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 3)
    driver3_violation3State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 4)
    driver3_claim3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType3 === 4)
    driver3_claim3PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_incidentType4: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 1)
    @IsValidDateFormat({ message: 'Invalid driver3_incidentDate4, should be in format YYYY-MM-DD' })
    driver3_incidentDate4: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 1)
    driver3_ticket4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 2)
    driver3_accident4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver3_accident4Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver3_accident4Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 2)
    driver3_accident4Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 3)
    driver3_violation4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 3)
    driver3_violation4State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 4)
    driver3_claim4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver3_incidentType4 === 4)
    driver3_claim4PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_gender: number;

    @ApiProperty()
    @IsOptional()
    @IsValidDateFormat({ message: 'Invalid driver4_dob, should be in format YYYY-MM-DD' })
    driver4_dob: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(6)
    driver4_maritalStatus: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9)
    driver4_education: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(125)
    driver4_occupation: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_requiredSR22: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_hasTAVCs: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver1_hasTAVCs === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_numOfIncidents: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_numOfIncidents >= 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_incidentType1: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_numOfIncidents >= 1)
    @IsValidDateFormat({ message: 'Invalid driver4_incidentDate1, should be in format YYYY-MM-DD' })
    driver4_incidentDate1: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 1)
    driver4_ticket1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 2)
    driver4_accident1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_accident1Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_accident1Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 2)
    driver4_accident1Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 3)
    driver4_violation1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 3)
    driver4_violation1State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 4)
    driver4_claim1Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType1 === 4)
    driver4_claim1PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_numOfIncidents >= 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_incidentType2: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_numOfIncidents >= 2)
    @IsValidDateFormat({ message: 'Invalid driver4_incidentDate2, should be in format YYYY-MM-DD' })
    driver4_incidentDate2: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 1)
    driver4_ticket2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 2)
    driver4_accident2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_accident2Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_accident2Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 2)
    driver4_accident2Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 3)
    driver4_violation2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 3)
    driver4_violation2State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 4)
    driver4_claim2Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType2 === 4)
    driver4_claim2PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_numOfIncidents >= 3)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_incidentType3: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_numOfIncidents >= 3)
    @IsValidDateFormat({ message: 'Invalid driver4_incidentDate3, should be in format YYYY-MM-DD' })
    driver4_incidentDate3: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 1)
    driver4_ticket3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 2)
    driver4_accident3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_accident3Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_accident3Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 2)
    driver4_accident3Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 3)
    driver4_violation3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 3)
    driver4_violation3State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 4)
    driver4_claim3Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType3 === 4)
    driver4_claim3PaidAmount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 1)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_incidentType4: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 1)
    @IsValidDateFormat({ message: 'Invalid driver4_incidentDate4, should be in format YYYY-MM-DD' })
    driver4_incidentDate4: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 1)
    driver4_ticket4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 2)
    driver4_accident4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 2)
    @IsInt()
    @Min(1)
    @Max(4)
    driver4_accident4Damage: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 2)
    @IsInt()
    @Min(0)
    @Max(1)
    driver4_accident4Atfault: number;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 2)
    driver4_accident4Amount: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 3)
    driver4_violation4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 3)
    driver4_violation4State: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 4)
    driver4_claim4Description: string;

    @ApiProperty()
    @IsOptional()
    @ValidateIf(o => o.driver4_incidentType4 === 4)
    driver4_claim4PaidAmount: string;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1991)
    @Max(2023)
    vehicle1_year: number;

    @ApiProperty()
    @IsNotEmpty()
    vehicle1_make: string;

    @ApiProperty()
    @IsNotEmpty()
    vehicle1_model: string;

    @ApiProperty()
    @IsOptional()
    vehicle1_subModel: string;

    @ApiProperty()
    @IsOptional()
    vehicle1_vin: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(5)
    vehicle1_primaryUse: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(2)
    vehicle1_vehicleOwnership: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(6)
    vehicle1_dailyMileage: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    @Max(9)
    vehicle1_annualMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle1_comprehensiveDeductible: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle1_collisionDeductible: number;

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1991)
    @Max(2023)
    vehicle2_year: number;

    @ApiProperty()
    @IsOptional()
    vehicle2_make: string;

    @ApiProperty()
    @IsOptional()
    vehicle2_model: string;

    @ApiProperty()
    @IsOptional()
    vehicle2_subModel: string;

    @ApiProperty()
    @IsOptional()
    vehicle2_vin: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    vehicle2_primaryUse: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(2)
    vehicle2_vehicleOwnership: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(6)
    vehicle2_dailyMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9)
    vehicle2_annualMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle2_comprehensiveDeductible: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle2_collisionDeductible: number;

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1991)
    @Max(2023)
    vehicle3_year: number;

    @ApiProperty()
    @IsOptional()
    vehicle3_make: string;

    @ApiProperty()
    @IsOptional()
    vehicle3_model: string;

    @ApiProperty()
    @IsOptional()
    vehicle3_subModel: string;

    @ApiProperty()
    @IsOptional()
    vehicle3_vin: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    vehicle3_primaryUse: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(2)
    vehicle3_vehicleOwnership: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(6)
    vehicle3_dailyMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9)
    vehicle3_annualMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle3_comprehensiveDeductible: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle3_collisionDeductible: number;

    @ApiProperty()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1991)
    @Max(2023)
    vehicle4_year: number;

    @ApiProperty()
    @IsOptional()
    vehicle4_make: string;

    @ApiProperty()
    @IsOptional()
    vehicle4_model: string;

    @ApiProperty()
    @IsOptional()
    vehicle4_subModel: string;

    @ApiProperty()
    @IsOptional()
    vehicle4_vin: string;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(5)
    vehicle4_primaryUse: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(2)
    vehicle4_vehicleOwnership: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(6)
    vehicle4_dailyMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(9)
    vehicle4_annualMileage: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle4_comprehensiveDeductible: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(8)
    vehicle4_collisionDeductible: number;
}
