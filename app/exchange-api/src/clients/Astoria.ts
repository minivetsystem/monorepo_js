import axios from 'axios';
import { Campaign } from '../campaigns/schemas';
import { LeadsService } from '../verticals/autoinsurance/leads.service';
import { IAutoInsuranceClient } from './autoinsuranceclient.interface';
import { CAMPAIGN_STATUSES } from '../config/constants';
import { Bid } from '../verticals/autoinsurance/schemas';
import { ConfigService } from '@nestjs/config';
import { times } from 'lodash';

export class Astoria implements IAutoInsuranceClient {

  constructor(
    private readonly leadsService: LeadsService,
    private configService: ConfigService,
    ) {}

    async execute(request: any, bid: Bid, campaign: Campaign): Promise<any> {

    if(!request.confirmation_id) {
      let pingUrl = '';
      if(campaign.client.user_status === CAMPAIGN_STATUSES.Active_Test) {
        pingUrl = campaign.ping_test_url;
      } else {
        pingUrl = campaign.ping_live_url;
      }

      let ping_data = `lead_type=${request.lead_type}`+ 
                        `&lead_mode=${request.lead_mode}` +
                        `&vendor_id=${campaign.parameter1}` +
                        `&sub_id=${request.sub_id}` +
                        `&tcpa_optin=${request.tcpa_optin}` +
                        `&tcpa_text=${request.tcpa_text}` + 
                        `&universal_leadid=${request.universal_leadid}` +
                        `&origination_datetime=${request.origination_datetime}` + 
                        `&origination_timezone=${request.origination_timezone}` + 
                        `&ipaddress=${request.ipaddress}` +
                        `&user_agent=${request.user_agent}` + 
                        `&vendor_lead_id=${request.vendor_lead_id}` + 
                        `&bankruptcy=${request.bankruptcy}` + 
                        `&coverageType=${request.coverageType}` + 
                        `&medicalPayment=${request.medicalPayment}` + 
                        `&haveInsurance=${request.haveInsurance}` + 
                        `&insuranceCompany=${request.insuranceCompany}` +
                        `&current_policy_start_date=${request.current_policy_start_date}` +
                        `&current_policy_expiration_date=${request.current_policy_expiration_date}` +
                        `&continuously_insured_period=${request.continuously_insured_period}` +
                        `&driver1_gender=${request.driver1_gender}` + 
                        `&driver1_dob=${request.driver1_dob}` + 
                        `&credit_rating=${request.credit_rating}` + 
                        `&driver1_maritalStatus=${request.driver1_maritalStatus}` + 
                        `&driver1_education=${request.driver1_education}` + 
                        `&driver1_occupation=${request.driver1_occupation}` + 
                        `&residence_type=${request.residence_type}` + 
                        `&years_at_residence=${request.years_at_residence}` + 
                        `&months_at_residence=${request.months_at_residence}` + 
                        `&driver1_requiredSR22=${request.driver1_requiredSR22}` + 
                        `&driver1_hasTAVCs=${request.driver1_hasTAVCs}` + 
                        `&vehicle1_year=${request.vehicle1_year}` + 
                        `&vehicle1_make=${request.vehicle1_make}` + 
                        `&vehicle1_model=${request.vehicle1_model}` + 
                        `&vehicle1_vin=${request.vehicle1_vin}` + 
                        `&vehicle1_primaryUse=${request.vehicle1_primaryUse}` + 
                        `&vehicle1_vehicleOwnership=${request.vehicle1_vehicleOwnership}` + 
                        `&vehicle1_dailyMileage=${request.vehicle1_dailyMileage}` + 
                        `&vehicle1_annualMileage=${request.vehicle1_annualMileage}` + 
                        `&vehicle_comprehensiveDeductible=${request.vehicle_comprehensiveDeductible}` + 
                        `&vehicle_collisionDeductible=${request.vehicle_collisionDeductible}`;

      if(request.zip.toString().length < 5) {
        ping_data += `&zip=${request.zip.toString().padStart(5, '0')}`;
      } else {
        ping_data += `&zip=${request.zip}`;
      }

      times(4, (idx) => {
        if(request[`driver${idx}_hasTAVCs`] === 1) {
          ping_data += `&driver${idx}_numOfIncidents=${request[`driver${idx}_numOfIncidents`]}`;
          if(request[`driver${idx}_numOfIncidents`] >= 1) {
            ping_data += `&driver${idx}_incidentType1=${request[`driver${idx}_incidentType1`]}`;
            ping_data += `&driver${idx}_incidentDate1=${request[`driver${idx}_incidentDate1`]}`;
            if(request[`driver${idx}_incidentType1`] === 1) {
              ping_data += `&driver${idx}_ticket1Description=${request[`driver${idx}_ticket1Description`]}`;
            } else if(request[`driver${idx}_incidentType1`] === 2) {
              ping_data += `&driver${idx}_accident1Description=${request[`driver${idx}_accident1Description`]}`;
              ping_data += `&driver${idx}_accident1Damage=${request[`driver${idx}_accident1Damage`]}`;
              ping_data += `&driver${idx}_accident1Atfault=${request[`driver${idx}_accident1Atfault`]}`;
              ping_data += `&driver${idx}_accident1Amount=${request[`driver${idx}_accident1Amount`]}`;
            } else if(request[`driver${idx}_incidentType1`] === 3) {
              ping_data += `&driver${idx}_violation1Description=${request[`driver${idx}_violation1Description`]}`;
              ping_data += `&driver${idx}_violation1State=${request[`driver${idx}_violation1State`]}`;
            } else if(request[`driver${idx}_incidentType1`] === 4) {
              ping_data += `&driver${idx}_claim1Description=${request[`driver${idx}_claim1Description`]}`;
              ping_data += `&driver${idx}_claim1PaidAmount=${request[`driver${idx}_claim1PaidAmount`]}`;            
            }
          }
          if(request[`driver${idx}_numOfIncidents`] >= 2) {
            ping_data += `&driver${idx}_incidentType2=${request[`driver${idx}_incidentType2`]}`;
            ping_data += `&driver${idx}_incidentDate2=${request[`driver${idx}_incidentDate2`]}`;
            if(request[`driver${idx}_incidentType2`] === 1) {
              ping_data += `&driver${idx}_ticket2Description=${request[`driver${idx}_ticket2Description`]}`;
            } else if(request[`driver${idx}_incidentType2`] === 2) {
              ping_data += `&driver${idx}_accident2Description=${request[`driver${idx}_accident2Description`]}`;
              ping_data += `&driver${idx}_accident2Damage=${request[`driver${idx}_accident2Damage`]}`;
              ping_data += `&driver${idx}_accident2Atfault=${request[`driver${idx}_accident2Atfault`]}`;
              ping_data += `&driver${idx}_accident2Amount=${request[`driver${idx}_accident2Amount`]}`;
            } else if(request[`driver${idx}_incidentType2`] === 3) {
              ping_data += `&driver${idx}_violation2Description=${request[`driver${idx}_violation2Description`]}`;
              ping_data += `&driver${idx}_violation2State=${request[`driver${idx}_violation2State`]}`;
            } else if(request[`driver${idx}_incidentType2`] === 4) {
              ping_data += `&driver${idx}_claim2Description=${request[`driver${idx}_claim2Description`]}`;
              ping_data += `&driver${idx}_claim2PaidAmount=${request[`driver${idx}_claim2PaidAmount`]}`;            
            }
          } 
          if(request[`driver${idx}_numOfIncidents`] >= 3) {
            ping_data += `&driver${idx}_incidentType3=${request[`driver${idx}_incidentType3`]}`;
            ping_data += `&driver${idx}_incidentDate3=${request[`driver${idx}_incidentDate3`]}`;
            if(request[`driver${idx}_incidentType3`] === 1) {
              ping_data += `&driver${idx}_ticket3Description=${request[`driver${idx}_ticket3Description`]}`;
            } else if(request[`driver${idx}_incidentType3`] === 2) {
              ping_data += `&driver${idx}_accident3Description=${request[`driver${idx}_accident3Description`]}`;
              ping_data += `&driver${idx}_accident3Damage=${request[`driver${idx}_accident3Damage`]}`;
              ping_data += `&driver${idx}_accident3Atfault=${request[`driver${idx}_accident3Atfault`]}`;
              ping_data += `&driver${idx}_accident3Amount=${request[`driver${idx}_accident3Amount`]}`;
            } else if(request[`driver${idx}_incidentType3`] === 3) {
              ping_data += `&driver${idx}_violation3Description=${request[`driver${idx}_violation3Description`]}`;
              ping_data += `&driver${idx}_violation3State=${request[`driver${idx}_violation3State`]}`;
            } else if(request[`driver${idx}_incidentType3`] === 4) {
              ping_data += `&driver${idx}_claim3Description=${request[`driver${idx}_claim3Description`]}`;
              ping_data += `&driver${idx}_claim3PaidAmount=${request[`driver${idx}_claim3PaidAmount`]}`;            
            }
          } 
          if(request[`driver${idx}_numOfIncidents`] >= 4) {
            ping_data += `&driver${idx}_incidentType4=${request[`driver${idx}_incidentType4`]}`;
            ping_data += `&driver${idx}_incidentDate4=${request[`driver${idx}_incidentDate4`]}`;
            if(request[`driver${idx}_incidentType4`] === 1) {
              ping_data += `&driver${idx}_ticket4Description=${request[`driver${idx}_ticket4Description`]}`;
            } else if(request[`driver${idx}_incidentType4`] === 2) {
              ping_data += `&driver${idx}_accident4Description=${request[`driver${idx}_accident4Description`]}`;
              ping_data += `&driver${idx}_accident4Damage=${request[`driver${idx}_accident4Damage`]}`;
              ping_data += `&driver${idx}_accident4Atfault=${request[`driver${idx}_accident4Atfault`]}`;
              ping_data += `&driver${idx}_accident4Amount=${request[`driver${idx}_accident4Amount`]}`;
            } else if(request[`driver${idx}_incidentType4`] === 3) {
              ping_data += `&driver${idx}_violation4Description=${request[`driver${idx}_violation4Description`]}`;
              ping_data += `&driver${idx}_violation4State=${request[`driver${idx}_violation4State`]}`;
            } else if(request[`driver${idx}_incidentType4`] === 4) {
              ping_data += `&driver${idx}_claim4Description=${request[`driver${idx}_claim4Description`]}`;
              ping_data += `&driver${idx}_claim4PaidAmount=${request[`driver${idx}_claim4PaidAmount`]}`;            
            }
          }
        }
      });

      const pingResult = await axios.post(pingUrl, ping_data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      const statusRegex = /<Response>(.+?)<\/Response>/g;
      const priceRegex = /<Price>(.+?)<\/Price>/g;
      const confirmationRegex = /<Confirmation>(.+?)<\/Confirmation>/g;
      const reasonRegex = /<Reason>(.+?)<\/Reason>/g;

      const priceResult = priceRegex.exec(pingResult.data);
      const confirmationResult = confirmationRegex.exec(pingResult.data);
      const statusResult = statusRegex.exec(pingResult.data);
      const reasonResult = reasonRegex.exec(pingResult.data);

      const price = priceResult?.length >= 2 ? priceResult[1] : '';
      const confirmationId = confirmationResult?.length >= 2 ? confirmationResult[1] : '';
      const status = statusResult?.length >= 2 ? statusResult[1] : '';
      const rejectionReason = reasonResult?.length >= 2 ? reasonResult[1] : '';

      const bid = new Bid();
      bid.client = campaign.client;
      bid.client_price = !isNaN(parseFloat(price)) ? parseFloat(price) : 0;
      bid.client_ping_confirmation_id = confirmationId;
      bid.client_status = status;
      bid.client_rejection_reason = rejectionReason;
      bid.client_request_payload = ping_data.replace(/\s+/g, '');
      bid.client_response_payload = pingResult.data;

      return bid;

    } else {

      let postUrl = '';
      
      if(campaign.client.user_status === CAMPAIGN_STATUSES.Active_Test) {
        postUrl = campaign.post_test_url;
      } else {
        postUrl = campaign.post_live_url;
      }

      let post_data = `lead_type=${request.lead_type}`+ 
                        `&confirmation_id=${bid.client_ping_confirmation_id}` +
                        `&email=${request.email}` +
                        `&address=${request.address}` +
                        `&primary_phone=${request.primary_phone}` + 
                        `&secondary_phone=${request.secondary_phone}` +
                        `&lead_mode=${request.lead_mode}` +
                        `&vendor_id=${campaign.parameter1}` +
                        `&sub_id=${request.sub_id}` +
                        `&tcpa_optin=${request.tcpa_optin}` +
                        `&tcpa_text=${request.tcpa_text}` + 
                        `&universal_leadid=${request.universal_leadid}` +
                        `&origination_datetime=${request.origination_datetime}` + 
                        `&origination_timezone=${request.origination_timezone}` + 
                        `&ipaddress=${request.ipaddress}` +
                        `&user_agent=${request.user_agent}` + 
                        `&vendor_lead_id=${request.vendor_lead_id}` + 
                        `&bankruptcy=${request.bankruptcy}` + 
                        `&coverageType=${request.coverageType}` + 
                        `&medicalPayment=${request.medicalPayment}` + 
                        `&haveInsurance=${request.haveInsurance}` + 
                        `&insuranceCompany=${request.insuranceCompany}` +
                        `&current_policy_start_date=${request.current_policy_start_date}` +
                        `&current_policy_expiration_date=${request.current_policy_expiration_date}` +
                        `&continuously_insured_period=${request.continuously_insured_period}` +
                        `&driver1_gender=${request.driver1_gender}` + 
                        `&driver1_dob=${request.driver1_dob}` + 
                        `&credit_rating=${request.credit_rating}` + 
                        `&driver1_maritalStatus=${request.driver1_maritalStatus}` + 
                        `&driver1_education=${request.driver1_education}` + 
                        `&driver1_occupation=${request.driver1_occupation}` + 
                        `&residence_type=${request.residence_type}` + 
                        `&years_at_residence=${request.years_at_residence}` + 
                        `&months_at_residence=${request.months_at_residence}` + 
                        `&driver1_firstname=${request.driver1_firstname}` + 
                        `&driver1_lastname=${request.driver1_lastname}` + 
                        `&driver1_requiredSR22=${request.driver1_requiredSR22}` + 
                        `&driver1_hasTAVCs=${request.driver1_hasTAVCs}` + 
                        `&vehicle1_year=${request.vehicle1_year}` + 
                        `&vehicle1_make=${request.vehicle1_make}` + 
                        `&vehicle1_model=${request.vehicle1_model}` + 
                        `&vehicle1_vin=${request.vehicle1_vin}` + 
                        `&vehicle1_primaryUse=${request.vehicle1_primaryUse}` + 
                        `&vehicle1_vehicleOwnership=${request.vehicle1_vehicleOwnership}` + 
                        `&vehicle1_dailyMileage=${request.vehicle1_dailyMileage}` + 
                        `&vehicle1_annualMileage=${request.vehicle1_annualMileage}` + 
                        `&vehicle_comprehensiveDeductible=${request.vehicle_comprehensiveDeductible}` + 
                        `&vehicle_collisionDeductible=${request.vehicle_collisionDeductible}`;

      if(request.zip.toString().length < 5) {
        post_data += `&zip=${request.zip.toString().padStart(5, '0')}`;
      } else {
        post_data += `&zip=${request.zip}`;
      }

      times(4, (idx) => {
        if(request[`driver${idx}_hasTAVCs`] === 1) {
          post_data += `&driver${idx}_numOfIncidents=${request[`driver${idx}_numOfIncidents`]}`;
          if(request[`driver${idx}_numOfIncidents`] >= 1) {
            post_data += `&driver${idx}_incidentType1=${request[`driver${idx}_incidentType1`]}`;
            post_data += `&driver${idx}_incidentDate1=${request[`driver${idx}_incidentDate1`]}`;
            if(request[`driver${idx}_incidentType1`] === 1) {
              post_data += `&driver${idx}_ticket1Description=${request[`driver${idx}_ticket1Description`]}`;
            } else if(request[`driver${idx}_incidentType1`] === 2) {
              post_data += `&driver${idx}_accident1Description=${request[`driver${idx}_accident1Description`]}`;
              post_data += `&driver${idx}_accident1Damage=${request[`driver${idx}_accident1Damage`]}`;
              post_data += `&driver${idx}_accident1Atfault=${request[`driver${idx}_accident1Atfault`]}`;
              post_data += `&driver${idx}_accident1Amount=${request[`driver${idx}_accident1Amount`]}`;
            } else if(request[`driver${idx}_incidentType1`] === 3) {
              post_data += `&driver${idx}_violation1Description=${request[`driver${idx}_violation1Description`]}`;
              post_data += `&driver${idx}_violation1State=${request[`driver${idx}_violation1State`]}`;
            } else if(request[`driver${idx}_incidentType1`] === 4) {
              post_data += `&driver${idx}_claim1Description=${request[`driver${idx}_claim1Description`]}`;
              post_data += `&driver${idx}_claim1PaidAmount=${request[`driver${idx}_claim1PaidAmount`]}`;            
            }
          } 
          if(request[`driver${idx}_numOfIncidents`] >= 2) {
            post_data += `&driver${idx}_incidentType2=${request[`driver${idx}_incidentType2`]}`;
            post_data += `&driver${idx}_incidentDate2=${request[`driver${idx}_incidentDate2`]}`;
            if(request[`driver${idx}_incidentType2`] === 1) {
              post_data += `&driver${idx}_ticket2Description=${request[`driver${idx}_ticket2Description`]}`;
            } else if(request[`driver${idx}_incidentType2`] === 2) {
              post_data += `&driver${idx}_accident2Description=${request[`driver${idx}_accident2Description`]}`;
              post_data += `&driver${idx}_accident2Damage=${request[`driver${idx}_accident2Damage`]}`;
              post_data += `&driver${idx}_accident2Atfault=${request[`driver${idx}_accident2Atfault`]}`;
              post_data += `&driver${idx}_accident2Amount=${request[`driver${idx}_accident2Amount`]}`;
            } else if(request[`driver${idx}_incidentType2`] === 3) {
              post_data += `&driver${idx}_violation2Description=${request[`driver${idx}_violation2Description`]}`;
              post_data += `&driver${idx}_violation2State=${request[`driver${idx}_violation2State`]}`;
            } else if(request[`driver${idx}_incidentType2`] === 4) {
              post_data += `&driver${idx}_claim2Description=${request[`driver${idx}_claim2Description`]}`;
              post_data += `&driver${idx}_claim2PaidAmount=${request[`driver${idx}_claim2PaidAmount`]}`;            
            }
          } 
          if(request[`driver${idx}_numOfIncidents`] >= 3) {
            post_data += `&driver${idx}_incidentType3=${request[`driver${idx}_incidentType3`]}`;
            post_data += `&driver${idx}_incidentDate3=${request[`driver${idx}_incidentDate3`]}`;
            if(request[`driver${idx}_incidentType3`] === 1) {
              post_data += `&driver${idx}_ticket3Description=${request[`driver${idx}_ticket3Description`]}`;
            } else if(request[`driver${idx}_incidentType3`] === 2) {
              post_data += `&driver${idx}_accident3Description=${request[`driver${idx}_accident3Description`]}`;
              post_data += `&driver${idx}_accident3Damage=${request[`driver${idx}_accident3Damage`]}`;
              post_data += `&driver${idx}_accident3Atfault=${request[`driver${idx}_accident3Atfault`]}`;
              post_data += `&driver${idx}_accident3Amount=${request[`driver${idx}_accident3Amount`]}`;
            } else if(request[`driver${idx}_incidentType3`] === 3) {
              post_data += `&driver${idx}_violation3Description=${request[`driver${idx}_violation3Description`]}`;
              post_data += `&driver${idx}_violation3State=${request[`driver${idx}_violation3State`]}`;
            } else if(request[`driver${idx}_incidentType3`] === 4) {
              post_data += `&driver${idx}_claim3Description=${request[`driver${idx}_claim3Description`]}`;
              post_data += `&driver${idx}_claim3PaidAmount=${request[`driver${idx}_claim3PaidAmount`]}`;            
            }
          } 
          if(request[`driver${idx}_numOfIncidents`] >= 4) {
            post_data += `&driver${idx}_incidentType4=${request[`driver${idx}_incidentType4`]}`;
            post_data += `&driver${idx}_incidentDate4=${request[`driver${idx}_incidentDate4`]}`;
            if(request[`driver${idx}_incidentType4`] === 1) {
              post_data += `&driver${idx}_ticket4Description=${request[`driver${idx}_ticket4Description`]}`;
            } else if(request[`driver${idx}_incidentType4`] === 2) {
              post_data += `&driver${idx}_accident4Description=${request[`driver${idx}_accident4Description`]}`;
              post_data += `&driver${idx}_accident4Damage=${request[`driver${idx}_accident4Damage`]}`;
              post_data += `&driver${idx}_accident4Atfault=${request[`driver${idx}_accident4Atfault`]}`;
              post_data += `&driver${idx}_accident4Amount=${request[`driver${idx}_accident4Amount`]}`;
            } else if(request[`driver${idx}_incidentType4`] === 3) {
              post_data += `&driver${idx}_violation4Description=${request[`driver${idx}_violation4Description`]}`;
              post_data += `&driver${idx}_violation4State=${request[`driver${idx}_violation4State`]}`;
            } else if(request[`driver${idx}_incidentType4`] === 4) {
              post_data += `&driver${idx}_claim4Description=${request[`driver${idx}_claim4Description`]}`;
              post_data += `&driver${idx}_claim4PaidAmount=${request[`driver${idx}_claim4PaidAmount`]}`;            
            }
          }
        }
      });

      const postResult = await axios.post(postUrl, post_data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

      const statusRegex = /<Response>(.+?)<\/Response>/g;
      const confirmationRegex = /<Confirmation>(.+?)<\/Confirmation>/g;
      const status = statusRegex.exec(postResult.data)[1];
      const confirmationID = confirmationRegex.exec(postResult.data)[1];

      return {
        status,
        confirmationID,
        client_request_payload: post_data.replace(/\s+/g, ''),
        client_response_payload: postResult.data
      };
    }

  }
}