import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../../../users/schemas';
import { LeadType } from './leadtype.schema';
import { IncomingRequest } from './incomingrequest.schema';
import { Campaign } from '../../../campaigns/schemas';

export type LeadDocument = HydratedDocument<Lead>;

@Schema({ versionKey: false })
export class Lead {

  @Prop({ type: mongoose.SchemaTypes.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: IncomingRequest.name })
  request: IncomingRequest;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Campaign.name })
  campaign: Campaign;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: LeadType.name })
  lead_type: LeadType;

  @Prop({ type: mongoose.Schema.Types.Number })
  lead_mode: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  client: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  vendor_id: User;

  @Prop({ type: mongoose.Schema.Types.String })
  email: string;

  @Prop({ type: mongoose.Schema.Types.String })
  address: string;

  @Prop({ type: mongoose.Schema.Types.String })
  primary_phone: string;

  @Prop({ type: mongoose.Schema.Types.String })
  secondary_phone: string;

  @Prop({ type: mongoose.Schema.Types.String })
  sub_id: string;

  @Prop({ type: mongoose.Schema.Types.Boolean })
  tcpa_optin: boolean;

  @Prop({ type: mongoose.Schema.Types.String })
  tcpa_text: string;

  @Prop({ type: mongoose.Schema.Types.String })
  universal_leadid: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  origination_datetime: Date;

  @Prop({ type: mongoose.Schema.Types.Number })
  origination_timezone: number;

  @Prop({ type: mongoose.Schema.Types.String })
  ipaddress: string;

  @Prop({ type: mongoose.Schema.Types.String })
  user_agent: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vendor_lead_id	: string;

  @Prop({ type: mongoose.Schema.Types.String })
  url	: string;

  @Prop({ type: mongoose.Schema.Types.String })
  minimum_price: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  zip: number;

  @Prop({ type: mongoose.Schema.Types.String })
  state: string;

  @Prop({ type: mongoose.Schema.Types.String })
  city: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  phone_last_4: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  residence_type: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  years_at_residence: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  months_at_residence: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  credit_rating: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  bankruptcy: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  coverageType: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle_comprehensiveDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle_collisionDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  medicalPayment: number;

  @Prop({ type: mongoose.Schema.Types.String })
  xxtrustedformcerturl: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  haveInsurance: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  insuranceCompany: number;

  @Prop({ type: mongoose.Schema.Types.String })
  current_policy_start_date: string;

  @Prop({ type: mongoose.Schema.Types.String })
  current_policy_expiration_date: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  continuously_insured_period: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_firstname: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_lastname: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_gender: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_dob: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_maritalStatus: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_education: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_occupation: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_requiredSR22: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_hasTAVCs: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_numOfIncidents: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_incidentType1: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_incidentDate1: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_ticket1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident1Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident1Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident1Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident1Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation1State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim1PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_incidentType2: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_incidentDate2: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_ticket2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident2Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident2Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident2Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident2Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation2State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim2PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_incidentType3: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_incidentDate3: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_ticket3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident3Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident3Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident3Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident3Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation3State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim3PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_incidentType4: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_incidentDate4: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_ticket4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident4Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident4Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver1_accident4Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_accident4Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_violation4State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver1_claim4PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_firstname: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_lastname: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_gender: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_dob: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_relationshipToApplicant: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_maritalStatus: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_education: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_occupation: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_requiredSR22: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_hasTAVCs: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_numOfIncidents: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_incidentType1: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_incidentDate1: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_ticket1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident1Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident1Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident1Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident1Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation1State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim1PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_incidentType2: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_incidentDate2: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_ticket2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident2Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident2Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident2Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident2Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation2State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim2PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_incidentType3: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_incidentDate3: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_ticket3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident3Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident3Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident3Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident3Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation3State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim3PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_incidentType4: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_incidentDate4: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_ticket4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident4Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident4Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver2_accident4Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_accident4Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_violation4State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver2_claim4PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_firstname: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_lastname: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_gender: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_dob: string;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_relationshipToApplicant: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_maritalStatus: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_education: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_occupation: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_requiredSR22: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_hasTAVCs: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_numOfIncidents: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_incidentType1: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_incidentDate1: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_ticket1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident1Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident1Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident1Atfault: number;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident1Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation1State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim1PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_incidentType2: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_incidentDate2: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_ticket2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident2Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident2Damage: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident2Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident2Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation2State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim2PaidAmount: string;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_incidentType3: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_incidentDate3: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_ticket3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident3Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident3Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident3Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident3Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation3State: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim3PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_incidentType4: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_incidentDate4: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_ticket4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident4Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident4Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver3_accident4Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_accident4Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation4Description: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver3_violation4State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver3_claim4PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_firstname: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_lastname: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_gender: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_dob: string;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_relationshipToApplicant: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_maritalStatus: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_education: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_occupation: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_requiredSR22: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_hasTAVCs: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_numOfIncidents: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_incidentType1: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_incidentDate1: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_ticket1Description: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident1Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident1Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident1Atfault: number;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident1Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation1State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim1Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim1PaidAmount: string;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_incidentType2: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_incidentDate2: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_ticket2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident2Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident2Damage: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident2Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident2Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation2Description: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation2State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim2Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim2PaidAmount: string;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_incidentType3: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_incidentDate3: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_ticket3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident3Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident3Damage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident3Atfault: number;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident3Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation3State: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim3Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim3PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_incidentType4: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_incidentDate4: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_ticket4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident4Description: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident4Damage: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  driver4_accident4Atfault: number;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_accident4Amount: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation4Description: string;
  
  @Prop({ type: mongoose.Schema.Types.String })
  driver4_violation4State: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim4Description: string;

  @Prop({ type: mongoose.Schema.Types.String })
  driver4_claim4PaidAmount: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_year: number;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle1_make: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle1_model: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle1_subModel: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle1_vin: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_primaryUse: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_vehicleOwnership: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_dailyMileage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_annualMileage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_comprehensiveDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle1_collisionDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_year: number;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle2_make: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle2_model: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle2_subModel: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle2_vin: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_primaryUse: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_vehicleOwnership: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_dailyMileage: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_annualMileage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_comprehensiveDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle2_collisionDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_year: number;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle3_make: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle3_model: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle3_subModel: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle3_vin: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_primaryUse: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_vehicleOwnership: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_dailyMileage: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_annualMileage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_comprehensiveDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle3_collisionDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_year: number;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle4_make: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle4_model: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle4_subModel: string;

  @Prop({ type: mongoose.Schema.Types.String })
  vehicle4_vin: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_primaryUse: number;
  
  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_vehicleOwnership: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_dailyMileage: number;
      
  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_annualMileage: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_comprehensiveDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  vehicle4_collisionDeductible: number;

  @Prop({ type: mongoose.Schema.Types.Date })
  ping_time: Date;

  @Prop({ type: mongoose.Schema.Types.Date })
  post_time: Date;

  @Prop()
  ping_request_payload: string;

  @Prop()
  client_ping_request_payload: string;

  @Prop()
  client_ping_response_payload: string;

  @Prop()
  client_post_request_payload: string;

  @Prop()
  client_post_response_payload: string;

  @Prop()
  post_request_payload: string;

  @Prop()
  ping_response_payload: string;

  @Prop()
  post_response_payload: string;

  @Prop()
  client_ping_confirmation_id: string;

  @Prop()
  client_post_confirmation_id: string;

  @Prop()
  client_lead_status: string;

  @Prop()
  confirmation_code: string;

  @Prop()
  client_price: number;

  @Prop()
  vendor_price: number;

  @Prop()
  revenue_share: number;

  @Prop()
  lead_time: Date;
}

export const LeadSchema = SchemaFactory.createForClass(Lead);