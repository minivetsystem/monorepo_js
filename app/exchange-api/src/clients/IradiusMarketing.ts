import axios from 'axios';
import { Campaign } from '../campaigns/schemas';
import { LeadsService } from '../verticals/autoinsurance/leads.service';
import { IAutoInsuranceClient } from './autoinsuranceclient.interface';
import { CAMPAIGN_STATUSES } from '../config/constants';
import moment from 'moment';
import { filter, shuffle } from 'lodash';
import { Bid } from '../verticals/autoinsurance/schemas';
import { ConfigService } from '@nestjs/config';

export class IradiusMarketing implements IAutoInsuranceClient {

  constructor(
    private readonly leadsService: LeadsService,
    private configService: ConfigService,
    ) {}

  CURRENT_INSURANCE_COMPANY(key) {

    const mapping = [
      { key: 1, value: 'Company Not Listed'},
      { key: 2, value: '21st Century Insurance'},
      { key: 3, value: 'AAA Insurance Co.'},
      { key: 4, value: 'AARP'},
      { key: 5, value: 'AETNA'},
      { key: 6, value: 'AFLAC'},
      { key: 7, value: 'AIG'},
      { key: 8, value: 'AIU Insurance'},
      { key: 9, value: 'Allied'},
      { key: 10, value: 'Allstate County Mutual'},
      { key: 11, value: 'Allstate Indemnity'},
      { key: 12, value: 'Allstate Insurance'},
      { key: 13, value: 'American Alliance Insurance'},
      { key: 14, value: 'American Automobile Insurance'},
      { key: 15, value: 'American Casualty'},
      { key: 16, value: 'American Deposit Insurance'},
      { key: 17, value: 'American Direct Business Insurance'},
      { key: 18, value: 'American Empire Insurance'},
      { key: 19, value: 'American Family Insurance'},
      { key: 20, value: 'American Family Mutual'},
      { key: 21, value: 'American Financial'},
      { key: 22, value: 'American Health Underwriters'},
      { key: 23, value: 'American Home Assurance'},
      { key: 24, value: 'American Insurance'},
      { key: 25, value: 'American International Ins'},
      { key: 26, value: 'American International Pacific'},
      { key: 27, value: 'American International South'},
      { key: 28, value: 'American Manufacturers'},
      { key: 29, value: 'American Mayflower Insurance'},
      { key: 30, value: 'American Motorists Insurance'},
      { key: 31, value: 'American National Insurance'},
      { key: 32, value: 'American Premier Insurance'},
      { key: 33, value: 'American Protection Insurance'},
      { key: 34, value: 'American Republic'},
      { key: 35, value: 'American Savers Plan'},
      { key: 36, value: 'American Service Insurance'},
      { key: 37, value: 'American Skyline Insurance Company'},
      { key: 38, value: 'American Spirit Insurance'},
      { key: 39, value: 'American Standard Insurance - OH'},
      { key: 40, value: 'American Standard Insurance - WI'},
      { key: 41, value: 'AmeriPlan'},
      { key: 42, value: 'Amica Insurance'},
      { key: 43, value: 'Answer Financial'},
      { key: 44, value: 'Arbella'},
      { key: 45, value: 'Associated Indemnity'},
      { key: 46, value: 'Assurant'},
      { key: 47, value: 'Atlanta Casualty'},
      { key: 48, value: 'Atlantic Indemnity'},
      { key: 49, value: 'Auto Club Insurance Company'},
      { key: 50, value: 'AXA Advisors'},
      { key: 51, value: 'Bankers Life and Casualty'},
      { key: 52, value: 'Banner Life'},
      { key: 53, value: 'Best Agency USA'},
      { key: 54, value: 'Blue Cross and Blue Shield'},
      { key: 55, value: 'Brooke Insurance'},
      { key: 56, value: 'Cal Farm Insurance'},
      { key: 57, value: 'California State Automobile Association'},
      { key: 58, value: 'Chubb'},
      { key: 59, value: 'Citizens'},
      { key: 60, value: 'Clarendon American Insurance'},
      { key: 61, value: 'Clarendon National Insurance'},
      { key: 62, value: 'CNA'},
      { key: 63, value: 'Colonial Insurance'},
      { key: 64, value: 'Comparison Market'},
      { key: 65, value: 'Continental Casualty'},
      { key: 66, value: 'Continental Divide Insurance'},
      { key: 67, value: 'Continental Insurance'},
      { key: 68, value: 'Cotton States Insurance'},
      { key: 69, value: 'Country Insurance and Financial Services'},
      { key: 70, value: 'Countrywide Insurance'},
      { key: 71, value: 'CSE Insurance Group'},
      { key: 72, value: 'Dairyland County Mutual Co of TX'},
      { key: 73, value: 'Dairyland Insurance'},
      { key: 74, value: 'eHealthInsurance Services'},
      { key: 75, value: 'Electric Insurance'},
      { key: 76, value: 'Erie Insurance Company'},
      { key: 77, value: 'Erie Insurance Exchange'},
      { key: 78, value: 'Erie Insurance Group'},
      { key: 79, value: 'Erie Insurance Property and Casualty'},
      { key: 80, value: 'Esurance'},
      { key: 81, value: 'Farm Bureau/Farm Family/Rural'},
      { key: 82, value: 'Farmers Insurance'},
      { key: 83, value: 'Farmers Insurance Exchange'},
      { key: 84, value: 'Farmers TX County Mutual'},
      { key: 85, value: 'Farmers Union'},
      { key: 86, value: 'FinanceBox.com'},
      { key: 87, value: 'Fire and Casualty Insurance Co of CT'},
      { key: 88, value: "Fireman's Fund"},
      { key: 89, value: 'Foremost'},
      { key: 90, value: 'Foresters'},
      { key: 91, value: 'Geico Casualty'},
      { key: 92, value: 'Geico General Insurance'},
      { key: 93, value: 'Geico Indemnity'},
      { key: 94, value: 'GMAC Insurance'},
      { key: 95, value: 'Golden Rule Insurance'},
      { key: 96, value: 'Government Employees Insurance'},
      { key: 97, value: 'Guaranty National Insurance'},
      { key: 98, value: 'Guide One Insurance'},
      { key: 99, value: "Hanover Lloyd's Insurance Company"},
      { key: 100, value: 'Hartford Accident and Indemnity'},
      { key: 101, value: 'Hartford Casualty Insurance'},
      { key: 102, value: 'Hartford Fire Insurance'},
      { key: 103, value: 'Hartford Insurance Co of Illinois'},
      { key: 104, value: 'Hartford Insurance Co of the Southeast'},
      { key: 105, value: 'Hartford Omni'},
      { key: 106, value: 'Hartford Underwriters Insurance'},
      { key: 107, value: 'Health Benefits Direct'},
      { key: 108, value: 'Health Choice One'},
      { key: 109, value: 'Health Plus of America'},
      { key: 110, value: 'HealthShare American'},
      { key: 111, value: 'Humana'},
      { key: 112, value: 'IFA Auto Insurance'},
      { key: 113, value: 'IGF Insurance'},
      { key: 114, value: 'Infinity Insurance'},
      { key: 115, value: 'Infinity National Insurance'},
      { key: 116, value: 'Infinity Select Insurance'},
      { key: 117, value: 'Insurance Insight'},
      { key: 118, value: 'Insurance.com'},
      { key: 119, value: 'InsuranceLeads.com'},
      { key: 120, value: 'InsWeb'},
      { key: 121, value: 'Integon'},
      { key: 122, value: 'John Hancock'},
      { key: 123, value: 'Kaiser Permanente'},
      { key: 124, value: 'Kemper Lloyds Insurance'},
      { key: 125, value: 'Landmark American Insurance'},
      { key: 126, value: 'Leader National Insurance'},
      { key: 127, value: 'Leader Preferred Insurance'},
      { key: 128, value: 'Leader Specialty Insurance'},
      { key: 129, value: 'Liberty Insurance Corp'},
      { key: 130, value: 'Liberty Mutual Fire Insurance'},
      { key: 131, value: 'Liberty Mutual Insurance'},
      { key: 132, value: 'Liberty National'},
      { key: 133, value: 'Liberty Northwest Insurance'},
      { key: 134, value: 'Lumbermens Mutual'},
      { key: 135, value: 'Maryland Casualty'},
      { key: 136, value: 'Mass Mutual'},
      { key: 137, value: 'Mega/Midwest'},
      { key: 138, value: 'Mercury'},
      { key: 139, value: 'MetLife Auto and Home'},
      { key: 140, value: 'Metropolitan Insurance Co.'},
      { key: 141, value: 'Mid Century Insurance'},
      { key: 142, value: 'Mid-Continent Casualty'},
      { key: 143, value: 'Middlesex Insurance'},
      { key: 144, value: 'Midland National Life'},
      { key: 145, value: 'Mutual of New York'},
      { key: 146, value: 'Mutual Of Omaha'},
      { key: 147, value: 'National Ben Franklin Insurance'},
      { key: 148, value: 'National Casualty'},
      { key: 149, value: 'National Continental Insurance'},
      { key: 150, value: 'National Fire Insurance Company of Hartford'},
      { key: 151, value: 'National Health Insurance'},
      { key: 152, value: 'National Indemnity'},
      { key: 153, value: 'National Union Fire Insurance of LA'},
      { key: 154, value: 'National Union Fire Insurance of PA'},
      { key: 155, value: 'Nationwide General Insurance'},
      { key: 156, value: 'Nationwide Insurance Company'},
      { key: 157, value: 'Nationwide Mutual Fire Insurance'},
      { key: 158, value: 'Nationwide Mutual Insurance'},
      { key: 159, value: 'Nationwide Property and Casualty'},
      { key: 160, value: 'New England Financial'},
      { key: 161, value: 'New York Life Insurance'},
      { key: 162, value: 'Northwestern Mutual Life'},
      { key: 163, value: 'Northwestern Pacific Indemnity'},
      { key: 164, value: 'Omni Indemnity'},
      { key: 165, value: 'Omni Insurance'},
      { key: 166, value: 'Orion Insurance'},
      { key: 167, value: 'Pacific Indemnity'},
      { key: 168, value: 'Pacific Insurance'},
      { key: 169, value: 'Pafco General Insurance'},
      { key: 170, value: 'Patriot General Insurance'},
      { key: 171, value: 'Peak Property and Casualty Insurance'},
      { key: 172, value: 'PEMCO Insurance'},
      { key: 173, value: 'Physicians'},
      { key: 174, value: 'Progressive'},
      { key: 175, value: 'Progressive Auto Pro'},
      { key: 176, value: 'Prudential Insurance Co.'},
      { key: 177, value: 'Reliance Insurance'},
      { key: 178, value: 'Reliance National Indemnity'},
      { key: 179, value: 'Reliance National Insurance'},
      { key: 180, value: 'Republic Indemnity'},
      { key: 181, value: 'Response Insurance'},
      { key: 182, value: 'SAFECO'},
      { key: 183, value: 'Safeway Insurance'},
      { key: 184, value: 'Safeway Insurance Co of AL'},
      { key: 185, value: 'Safeway Insurance Co of GA'},
      { key: 186, value: 'Safeway Insurance Co of LA'},
      { key: 187, value: 'Security Insurance Co of Hartford'},
      { key: 188, value: 'Security National Insurance Co of FL'},
      { key: 189, value: 'Sentinel Insurance'},
      { key: 190, value: 'Sentry Insurance a Mutual Company'},
      { key: 191, value: 'Sentry Insurance Group'},
      { key: 192, value: 'Shelter Insurance Co.'},
      { key: 193, value: 'St. Paul'},
      { key: 194, value: 'St. Paul Fire and Marine'},
      { key: 195, value: 'St. Paul Insurance'},
      { key: 196, value: 'Standard Fire Insurance Company'},
      { key: 197, value: 'State and County Mutual Fire Insurance'},
      { key: 198, value: 'State Farm County'},
      { key: 199, value: 'State Farm Fire and Cas'},
      { key: 200, value: 'State Farm General'},
      { key: 201, value: 'State Farm Indemnity'},
      { key: 202, value: 'State Farm Insurance Co.'},
      { key: 203, value: 'State Farm Lloyds Tx'},
      { key: 204, value: 'State Farm Mutual Auto'},
      { key: 205, value: 'State Fund'},
      { key: 206, value: 'State National Insurance'},
      { key: 207, value: 'Superior American Insurance'},
      { key: 208, value: 'Superior Guaranty Insurance'},
      { key: 209, value: 'Superior Insurance'},
      { key: 210, value: 'Sure Health Plans'},
      { key: 211, value: 'The Ahbe Group'},
      { key: 212, value: 'The General'},
      { key: 213, value: 'The Hartford'},
      { key: 214, value: 'TICO Insurance'},
      { key: 215, value: 'TIG Countrywide Insurance'},
      { key: 216, value: 'Titan'},
      { key: 217, value: 'TransAmerica'},
      { key: 218, value: 'Travelers Indemnity'},
      { key: 219, value: 'Travelers Insurance Company'},
      { key: 220, value: 'Tri-State Consumer Insurance'},
      { key: 221, value: 'Twin City Fire Insurance'},
      { key: 222, value: 'UniCare'},
      { key: 223, value: 'United American/Farm and Ranch'},
      { key: 224, value: 'United Pacific Insurance'},
      { key: 225, value: 'United Security'},
      { key: 226, value: 'United Services Automobile Association'},
      { key: 227, value: 'Unitrin Direct'},
      { key: 228, value: 'Universal Underwriters Insurance'},
      { key: 229, value: 'US Financial'},
      { key: 230, value: 'USA Benefits/Continental General'},
      { key: 231, value: 'USAA'},
      { key: 232, value: 'USF and G'},
      { key: 233, value: 'Viking County Mutual Insurance'},
      { key: 234, value: 'Viking Insurance Co of WI'},
      { key: 235, value: 'Western and Southern Life'},
      { key: 236, value: 'Western Mutual'},
      { key: 237, value: 'Windsor Insurance'},
      { key: 238, value: 'Woodlands Financial Group'},
      { key: 239, value: 'Zurich North America'}
    ];

    return filter(mapping, { key })[0];
  };

  COMPREHENSIVE_COLLISION(key) {

    const mapping = [
      { key: 1, value: '0' },
      { key: 2, value: '$50' },
      { key: 3, value: '$100' },
      { key: 4, value: '$250' },
      { key: 5, value: '$500' },
      { key: 6, value: '$1000' },
      { key: 7, value: '$2500' },
      { key: 8, value: '$5000' },
    ];

    return filter(mapping, { key })[0];
  };

  MILE_ONEWAY(key) {

    const mapping = [
      { key: 1, value: '3' },
      { key: 2, value: '5' },
      { key: 3, value: '9' },
      { key: 4, value: '19' },
      { key: 5, value: '20' },
      { key: 6, value: '51' }
    ];

    return filter(mapping, { key })[0];
  };

  MILEAGE(key) {

    const mapping = [
      { key: 1, value: 5000 },
      { key: 2, value: 7500 },
      { key: 3, value: 10000 },
      { key: 4, value: 12500 },
      { key: 5, value: 15000 },
      { key: 6, value: 18000 },
      { key: 7, value: 25000 },
      { key: 8, value: 50000 },
      { key: 9, value: 50001 }
    ];

    return filter(mapping, { key })[0];
  };

  VIOLATION_DESCRIPTION(key) {

    const mapping = [
      { key: 1, value: 'Driving While Suspended/Revoked' },
      { key: 2, value: 'Drunk Driving - Injury' },
      { key: 3, value: 'Drunk Driving - no Injury' },
      { key: 4, value: 'Hit and Run - Injury' },
      { key: 5, value: 'Hit and Run - no Injury' },
      { key: 6, value: 'Reckless Driving - Injury' },
      { key: 7, value: 'Reckless Driving - no Injury' },
      { key: 8, value: 'Speeding Over 100' },
    ];

    return filter(mapping, { key })[0];
  };

  TICKET_DESCRIPTION(key) {

    const mapping = [
      { key: 1, value: 'Careless driving' },
      { key: 2, value: 'Carpool lane violation' },
      { key: 3, value: 'Child not in car seat' },
      { key: 4, value: 'Defective Equipment' },
      { key: 5, value: 'Defective vehicle (reduced violation)' },
      { key: 6, value: 'Driving too fast for conditions' },
      { key: 7, value: 'Driving without a license' },
      { key: 8, value: 'Excessive noise' },
      { key: 9, value: 'Exhibition driving' },
      { key: 10, value: 'Expired drivers license' },
      { key: 11, value: 'Expired emmissions' },
      { key: 12, value: 'Expired Registration' },
      { key: 13, value: 'Failure to obey traffic signal' },
      { key: 14, value: 'Failure to signal' },
      { key: 15, value: 'Failure to stop' },
      { key: 16, value: 'Failure to yield' },
      { key: 17, value: 'Following too close' },
      { key: 18, value: 'Illegal lane change' },
      { key: 19, value: 'Illegal passing' },
      { key: 20, value: 'Illegal turn' },
      { key: 21, value: 'Illegal turn on red' },
      { key: 22, value: 'Illegal U Turn' },
      { key: 23, value: 'Inattentive driving' },
      { key: 24, value: 'No helmet' },
      { key: 25, value: 'No insurance' },
      { key: 26, value: 'No seatbelt' },
      { key: 27, value: 'Passing a school bus' },
      { key: 28, value: 'Passing in a no-passing zone' },
      { key: 29, value: 'Passing on shoulder' },
      { key: 30, value: 'Ran a red light' },
      { key: 31, value: 'Ran a stop sign' },
      { key: 32, value: 'Wrong way on a one way' },
      { key: 33, value: 'Speeding' },
      { key: 34, value: 'Speeding less than 10 MPH over' },
      { key: 35, value: 'Speeding more than 10 MPH over' },
      { key: 36, value: 'Speeding more than 20 MPH over' },
      { key: 37, value: 'Other Ticket' },
    ];

    return filter(mapping, { key })[0];
  };

  CLAIM_DESCRIPTION(key) {

    const mapping = [
      { key: 1, value: 'Act of Nature' },
      { key: 2, value: 'Car fire' },
      { key: 3, value: 'Flood damage' },
      { key: 4, value: 'Hail damage' },
      { key: 5, value: 'Hit an animal' },
      { key: 6, value: 'Theft of stereo' },
      { key: 7, value: 'Theft of vehicle' },
      { key: 8, value: 'Towing service' },
      { key: 9, value: 'Vandalism' },
      { key: 10, value: 'Windshield Replacement' },
      { key: 11, value: 'Other' }
    ];

    return filter(mapping, { key })[0];
  };

  ACCIDENT_DESCRIPTION(key) {

    const mapping = [
      { key: 1, value: 'Vehicle Hit Vehicle' },
      { key: 2, value: 'Vehicle Hit Pedestrian' },
      { key: 3, value: 'Vehicle Hit Property' },
      { key: 4, value: 'Vehicle Damaged Avoiding Accident' },
      { key: 5, value: 'Other Vehicle Hit Yours' },
      { key: 6, value: 'Not Listed' }
    ];

    return filter(mapping, { key })[0];
  };

  ACCIDENT_DAMAGE(key) {

    const mapping = [
      { key: 1, value: 'People' },
      { key: 2, value: 'Property' },
      { key: 3, value: 'Both' },
      { key: 4, value: 'Not Applicable' },
    ];

    return filter(mapping, { key })[0];
  };

  occupation_mapping(occupation) {
	  const key = occupation;
	  const mapping = [
      { key: 1, value: 'Accounts Pay/Rec.' },
      { key: 2, value: 'Actor' },
      { key: 3, value: 'Administration/Management' },
      { key: 4, value: 'Appraiser' },
      { key: 5, value: 'Architect' },
      { key: 6, value: 'Artist' },
      { key: 7, value: 'Assembler' },
      { key: 8, value: 'Auditor' },
      { key: 9, value: 'Baker' },  
      { key: 10, value: 'Bank Teller'},
      { key: 11, value: 'Banker'},
      { key: 12, value: 'Bartender'},
      { key: 13, value: 'Broker'},
      { key: 14, value: 'Cashier'},
      { key: 15, value: 'Casino Worker'},
      { key: 16, value: 'CEO'},
      { key: 17, value: 'Certified Public Accountant'},
      { key: 18, value: 'Chemist'},
      { key: 19, value: 'Child Care'},
      { key: 20, value: 'City Worker'},
      { key: 21, value: 'Claims Adjuster'},
      { key: 22, value: 'Clergy'},
      { key: 23, value: 'Clerical/Technical'},
      { key: 24, value: 'College Professor'},
      { key: 25, value: 'Computer Tech.'},
      { key: 26, value: 'Construction'},
      { key: 27, value: 'Contractor'},
      { key: 28, value: 'Counselor'},
      { key: 29, value: 'Craftsman/Skilled Worker'},
      { key: 30, value: 'CSR'},
      { key: 31, value: 'Custodian'},
      { key: 32, value: 'Dancer'},
      { key: 33, value: 'Decorator'},
      { key: 34, value: 'Delivery Driver'},
      { key: 35, value: 'Dentist'},
      { key: 36, value: 'Director'},
      { key: 37, value: 'Disabled'},
      { key: 38, value: 'Drivers'},
      { key: 39, value: 'Electrician'},
      { key: 40, value: 'Engineer-Aeronautical'},
      { key: 41, value: 'Engineer-Aerospace'},
      { key: 42, value: 'Engineer-Chemical'},
      { key: 43, value: 'Engineer-Civil'},
      { key: 44, value: 'Engineer-Electrical'},
      { key: 45, value: 'Engineer-Gas'},
      { key: 46, value: 'Engineer-Geophysical'},
      { key: 47, value: 'Engineer-Mechanical'},
      { key: 48, value: 'Engineer-Nuclear'},
      { key: 49, value: 'Engineer-Other'},
      { key: 50, value: 'Engineer-Petroleum'},
      { key: 51, value: 'Engineer-Structural'},
      { key: 52, value: 'Entertainer'},
      { key: 53, value: 'Farmer'},
      { key: 54, value: 'Fire Fighter'},
      { key: 55, value: 'Flight Attend.'},
      { key: 56, value: 'Food Service'},
      { key: 57, value: 'Health Care'},
      { key: 58, value: 'Installer'},
      { key: 59, value: 'Instructor'},
      { key: 60, value: 'Journalist'},
      { key: 61, value: 'Journeyman'},
      { key: 62, value: 'Lab Tech.'},
      { key: 63, value: 'Laborer/Unskilled Worker'},
      { key: 64, value: 'Lawyer'},
      { key: 65, value: 'Machine Operator'},
      { key: 66, value: 'Machinist'},
      { key: 67, value: 'Maintenance'},
      { key: 68, value: 'Manufacturer'},
      { key: 69, value: 'Marketing'},
      { key: 70, value: 'Mechanic'},
      { key: 71, value: 'Model'},
      { key: 72, value: 'Nanny'},
      { key: 73, value: 'Nurse/CNA'},
      { key: 74, value: 'Other'},
      { key: 75, value: 'Painter'},
      { key: 76, value: 'Para-Legal'},
      { key: 77, value: 'Paramedic'},
      { key: 78, value: 'Personal Trainer'},
      { key: 79, value: 'Photographer'},
      { key: 80, value: 'Physician'},
      { key: 81, value: 'Pilot'},
      { key: 82, value: 'Plumber'},
      { key: 83, value: 'Police Officer'},
      { key: 84, value: 'Postal Worker'},
      { key: 85, value: 'Preacher'},
      { key: 86, value: 'Pro Athlete'},
      { key: 87, value: 'Production'},
      { key: 88, value: 'Prof-College Degree'},
      { key: 89, value: 'Prof-Specialty Degree'},
      { key: 90, value: 'Programmer'},
      { key: 91, value: 'Real Estate'},
      { key: 92, value: 'Receptionist'},
      { key: 93, value: 'Reservation Agent'},
      { key: 94, value: 'Restaurant Manager'},
      { key: 95, value: 'Retail'},
      { key: 96, value: 'Roofer'},
      { key: 97, value: 'Sales'},
      { key: 98, value: 'Scientist'},
      { key: 99, value: 'Secretary'},
      { key: 100, value: 'Security'},
      { key: 101, value: 'Social Worker'},
      { key: 102, value: 'Stocker'},
      { key: 103, value: 'Store Owner'},
      { key: 104, value: 'Stylist'},
      { key: 105, value: 'Supervisor'},
      { key: 106, value: 'Teacher'},
      { key: 107, value: 'Teacher - with Credentials'},
      { key: 108, value: 'Technical/Supervisory'},
      { key: 109, value: 'Travel Agent'},
      { key: 110, value: 'Truck Driver'},
      { key: 111, value: 'Vet.'},
      { key: 112, value: 'Waitress'},
      { key: 113, value: 'Welder'},
      { key: 114, value: 'Government'},
      { key: 115, value: 'Housewife/Househusband'},
      { key: 116, value: 'Retired'},
      { key: 117, value: 'Stud. Not Living w/Parents'},
      { key: 118, value: 'Unemployed'},
      { key: 119, value: 'Military E1 - E4'},
      { key: 120, value: 'Military E5 - E7'},
      { key: 121, value: 'Military Officer'},
      { key: 122, value: 'Military Other'},
      { key: 123, value: 'Unknown'},
      { key: 124, value: 'Self Employed'},
      { key: 125, value: 'Student Living w/Parents'},
      { key: 126, value: 'Unemployed'},
    ]
	     return filter(mapping, { key })[0];
	 }

  async execute(request: any, bid: Bid, campaign: Campaign): Promise<any> {

    // Check why creditRating is not present in the specs.
    let creditRating = '';
    if(request.credit_rating === 1) { creditRating = 'Excellent' }
    else  if(request.credit_rating === 4) { creditRating = 'Poor' }
    else  if(request.credit_rating === 3) { creditRating = 'Fair' }
    else  if(request.credit_rating === 2) { creditRating = 'Good' }

    let vehicle1_primaryUse = '';
    if(request.vehicle1_primaryUse === 1) { vehicle1_primaryUse = 'Business' }
    else if(request.vehicle1_primaryUse === 2) { vehicle1_primaryUse = 'Commute Work' }
    else if(request.vehicle1_primaryUse === 3) { vehicle1_primaryUse = 'Commute School' }
    else if(request.vehicle1_primaryUse === 4) { vehicle1_primaryUse = 'Pleasure' }
    else if(request.vehicle1_primaryUse === 5) { vehicle1_primaryUse = 'Commute Varies' }

    let vehicle2_primaryUse = '';
    if(request.vehicle2_primaryUse === 1) { vehicle2_primaryUse = 'Business' }
    else if(request.vehicle2_primaryUse === 2) { vehicle2_primaryUse = 'Commute Work' }
    else if(request.vehicle2_primaryUse === 3) { vehicle2_primaryUse = 'Commute School' }
    else if(request.vehicle2_primaryUse === 4) { vehicle2_primaryUse = 'Pleasure' }
    else if(request.vehicle2_primaryUse === 5) { vehicle2_primaryUse = 'Commute Varies' }

    let coverageType = '';
    if(request.coverageType === 1) { coverageType = 'Superior Coverage' }
    else  if(request.coverageType === 2) { coverageType = 'Standard Coverage' }
    else  if(request.coverageType === 3) { coverageType = 'Basic Coverage' }
    else  if(request.coverageType === 4) { coverageType = 'State Minimum' }

    let contineousYear = '';
    let contineousMonth = '';
    if(request.continuously_insured_period === 1) { contineousYear = '0'; contineousMonth = '6';}
    else if(request.continuously_insured_period === 2) { contineousYear = '1'; contineousMonth = '0';}
    else if(request.continuously_insured_period === 3) { contineousYear = '1'; contineousMonth = '0';}
    else if(request.continuously_insured_period === 4) { contineousYear = '2'; contineousMonth = '0';}
    else if(request.continuously_insured_period === 5) { contineousYear = '3'; contineousMonth = '0';}
    else if(request.continuously_insured_period === 6) { contineousYear = '4'; contineousMonth = '0';}
    else if(request.continuously_insured_period === 7) { contineousYear = '5'; contineousMonth = '0';}
    else if(request.continuously_insured_period === 8) { contineousYear = '6'; contineousMonth = '0';}

    let driver1_education = '';
    if(request.driver1_education === 1) { driver1_education = 'Less than High School'}
    else if(request.driver1_education === 2) { driver1_education = 'Some or No High School'}
    else if(request.driver1_education === 3) { driver1_education = 'Some or No High School'}
    else if(request.driver1_education === 4) { driver1_education = 'Some College'}
    else if(request.driver1_education === 5) { driver1_education = 'Associate Degree'}
    else if(request.driver1_education === 6) { driver1_education = 'Bachelors Degree'}
    else if(request.driver1_education === 7) { driver1_education = 'Masters Degree'}
    else if(request.driver1_education === 8) { driver1_education = 'Doctorate Degree'}
    else {driver1_education = 'Other'}

    let driver2_education = '';
    if(request.driver2_education === 1) { driver2_education = 'Less than High School'}
    else if(request.driver2_education === 2) { driver2_education = 'Some or No High School'}
    else if(request.driver2_education === 3) { driver2_education = 'Some or No High School'}
    else if(request.driver2_education === 4) { driver2_education = 'Some College'}
    else if(request.driver2_education === 5) { driver2_education = 'Associate Degree'}
    else if(request.driver2_education === 6) { driver2_education = 'Bachelors Degree'}
    else if(request.driver2_education === 7) { driver2_education = 'Masters Degree'}
    else if(request.driver2_education === 8) { driver2_education = 'Doctorate Degree'}
    else {driver2_education = 'Other'}

    let marital_status = '';
    if(request.driver1_maritalStatus === 1) {marital_status = 'Single'}
    else if(request.driver1_maritalStatus === 2) {marital_status = 'Married'}
    else if(request.driver1_maritalStatus === 3) {marital_status = 'Separated'}
    else if(request.driver1_maritalStatus === 4) {marital_status = 'Divorced'}
    else if(request.driver1_maritalStatus === 5) {marital_status = 'Domestic Partner'}
    else {marital_status = 'Widowed'}

    let marital_status_m = '';
    if(request.driver2_maritalStatus === 1) {marital_status_m = 'Single'}
    else if(request.driver2_maritalStatus === 2) {marital_status_m = 'Married'}
    else if(request.driver2_maritalStatus === 3) {marital_status_m = 'Separated'}
    else if(request.driver2_maritalStatus === 4) {marital_status_m = 'Divorced'}
    else if(request.driver2_maritalStatus === 5) {marital_status_m = 'Domestic Partner'}
    else {marital_status_m = 'Widowed'}


    const current_date = moment().format('YYYY-MM-DD');
    const howLongYear = moment(current_date).diff(moment(request.current_policy_start_date), 'years');
    const howLongMonth = moment(request.current_policy_expiration_date).month();

    let lead_creation_date = request.origination_datetime;
		if ( lead_creation_date != '' ) {
			lead_creation_date = lead_creation_date.replace(' ', 'T');
		}



    let driver1_ticket1Description = '';
    if(request.driver1_ticket1Description === 1) { driver1_ticket1Description = 'Careless driving' }
    else if(request.driver1_ticket1Description === 2) { driver1_ticket1Description = 'Carpool lane violation' }
    else if(request.driver1_ticket1Description === 3) { driver1_ticket1Description = 'Child not in car seat' }
    else if(request.driver1_ticket1Description === 4) { driver1_ticket1Description = 'Defective Equipment' }
    else if(request.driver1_ticket1Description === 5) { driver1_ticket1Description = 'Defective vehicle (reduced violation)' }
    else if(request.driver1_ticket1Description === 6) { driver1_ticket1Description = 'Driving too fast for conditions' }
    else if(request.driver1_ticket1Description === 7) { driver1_ticket1Description = 'Driving without a license' }
    else if(request.driver1_ticket1Description === 8) { driver1_ticket1Description = 'Excessive noise' }
    else if(request.driver1_ticket1Description === 9) { driver1_ticket1Description = 'Exhibition driving' }
    else if(request.driver1_ticket1Description === 10) { driver1_ticket1Description = 'Expired drivers license' }
    else if(request.driver1_ticket1Description === 11) { driver1_ticket1Description = 'Expired emmissions' }
    else if(request.driver1_ticket1Description === 12) { driver1_ticket1Description = 'Expired Registration' }
    else if(request.driver1_ticket1Description === 13) { driver1_ticket1Description = 'Failure to obey traffic signal' }
    else if(request.driver1_ticket1Description === 14) { driver1_ticket1Description = 'Failure to signal' }
    else if(request.driver1_ticket1Description === 15) { driver1_ticket1Description = 'Failure to stop' }
    else if(request.driver1_ticket1Description === 16) { driver1_ticket1Description = 'Failure to yield' }
    else if(request.driver1_ticket1Description === 17) { driver1_ticket1Description = 'Following too close' }
    else if(request.driver1_ticket1Description === 18) { driver1_ticket1Description = 'Illegal lane change' }
    else if(request.driver1_ticket1Description === 19) { driver1_ticket1Description = 'Illegal passing' }
    else if(request.driver1_ticket1Description === 20) { driver1_ticket1Description = 'Illegal turn' }
    else if(request.driver1_ticket1Description === 21) { driver1_ticket1Description = 'Illegal turn on red' }
    else if(request.driver1_ticket1Description === 22) { driver1_ticket1Description = 'Illegal U Turn' }
    else if(request.driver1_ticket1Description === 23) { driver1_ticket1Description = 'Inattentive driving' }
    else if(request.driver1_ticket1Description === 24) { driver1_ticket1Description = 'No helmet' }
    else if(request.driver1_ticket1Description === 25) { driver1_ticket1Description = 'No insurance' }
    else if(request.driver1_ticket1Description === 26) { driver1_ticket1Description = 'No seatbelt' }
    else if(request.driver1_ticket1Description === 27) { driver1_ticket1Description = 'Passing a school bus' }
    else if(request.driver1_ticket1Description === 28) { driver1_ticket1Description = 'Passing in a no-passing zone' }
    else if(request.driver1_ticket1Description === 29) { driver1_ticket1Description = 'Passing on shoulder' }
    else if(request.driver1_ticket1Description === 30) { driver1_ticket1Description = 'Ran a red light' }
    else if(request.driver1_ticket1Description === 31) { driver1_ticket1Description = 'Ran a stop sign' }
    else if(request.driver1_ticket1Description === 32) { driver1_ticket1Description = 'Wrong way on a one way' }
    else if(request.driver1_ticket1Description === 33) { driver1_ticket1Description = 'Speeding' }
    else if(request.driver1_ticket1Description === 34) { driver1_ticket1Description = 'Speeding less than 10 MPH over' }
    else if(request.driver1_ticket1Description === 35) { driver1_ticket1Description = 'Speeding more than 10 MPH over' }
    else if(request.driver1_ticket1Description === 36) { driver1_ticket1Description = 'Speeding more than 20 MPH over' }
    else { driver1_ticket1Description = 'Other Ticket' }

    let driver1_violation1Description = '';
    if(request.driver1_violation1Description === 1) { driver1_violation1Description = 'Driving While Suspended/Revoked' }
    else if(request.driver1_violation1Description === 2) { driver1_violation1Description = 'Drunk Driving - Injury' }
    else if(request.driver1_violation1Description === 3) { driver1_violation1Description = 'Drunk Driving - no Injury' }
    else if(request.driver1_violation1Description === 4) { driver1_violation1Description = 'Hit and Run - Injury' }
    else if(request.driver1_violation1Description === 5) { driver1_violation1Description = 'Hit and Run - no Injury' }
    else if(request.driver1_violation1Description === 6) { driver1_violation1Description = 'Reckless Driving - Injury' }
    else if(request.driver1_violation1Description === 7) { driver1_violation1Description = 'Reckless Driving - no Injury' }
    else if(request.driver1_violation1Description === 8) { driver1_violation1Description = 'Speeding Over 100' }

    const BodilyInjuryObj = ['25/50','50/100','100/300','250/500' , '300,000' , '500,000'];
		shuffle(BodilyInjuryObj);
		const BodilyInjury = BodilyInjuryObj[0];

    const PropertyDamageObj = [5000,7500,10000,15000,20000,25000,50000,100000];
		shuffle(PropertyDamageObj);
		const PropertyDamage = PropertyDamageObj[0];

    if(!request.confirmation_id) {
      let pingUrl = '';
      if(campaign.client.user_status === CAMPAIGN_STATUSES.Active_Test) {
        pingUrl = campaign.ping_test_url;
      } else {
        pingUrl = campaign.ping_live_url;
      }

      let ping_data =`<Request>
      <Vendor>
        <IsTest>${campaign.client.user_status === CAMPAIGN_STATUSES.Active_Test || this.configService.get<string>('ENV') === 'staging' ? '1' : '0'}</IsTest>
        <VendorId>${campaign.parameter1}</VendorId>
        <SubVendorId>${request.vendor_id}</SubVendorId>
        <LeadTypeId>14</LeadTypeId>
        <IPAddress>${request.ipaddress}</IPAddress>
        <LeadMetaData>
          <ULeadId>${request.universal_leadid}</ULeadId>
          <NonLeadIdTCPA>False</NonLeadIdTCPA>
          <ULeadIdTCPA>${request.universal_leadid !== '' ? 'True' : 'False'}</ULeadIdTCPA>
          <ClientUserAgent>Mozilla/5.0 (Linux; Android 8.0.0; moto e5 plus) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.116 Mobile Safari/537.36</ClientUserAgent>
          <TCPAInfo>
            <LeadCreationDate>${lead_creation_date}</LeadCreationDate>
            <ConsentInfo ConsentType="Passive" ConsumerConsented="${request.tcpa_optin === '1' ? 'True' : 'False'}">${encodeURI(request.tcpa_text)}</ConsentInfo>
            <LeadIdTCPADisclosure>${request.universal_leadid !== '' ? 'True' : 'False'}</LeadIdTCPADisclosure>
            <xxTrustedFormCertUrl>${request.xxtrustedformcerturl !== '' ? request.xxtrustedformcerturl : ''}</xxTrustedFormCertUrl>
            <LandingPageUrl>${request.url !== '' ? request.url : ''}</LandingPageUrl>
          </TCPAInfo>
        </LeadMetaData>
      </Vendor>
      <Contact>
        <City>${request.city}</City>
        <State>${request.state}</State>
        <ZIPCode>${request.zip.toString().length === 4 ? `0${request.zip}` : request.zip}</ZIPCode>
        <ResidenceType>${request.residenceType === '0' ? 'Own' : 'Rent'}</ResidenceType>
        <YearsAtResidence>${request.years_at_residence}</YearsAtResidence>
        <MonthsAtResidence>${request.months_at_residence}</MonthsAtResidence>`;
if (request.phone_last_4.toString().length === 4 ){
  ping_data += `<HomePhoneSuffix>${request.phone_last_4}</HomePhoneSuffix>`;
} else {
  ping_data += '<HomePhoneSuffix></HomePhoneSuffix>';
}
ping_data +=`</Contact>
      <AutoInsurance>
        <Drivers>
          <Driver>
            <Id>1</Id>
            <BirthDate>${request.driver1_dob}</BirthDate>
            <MaritalStatus>${marital_status}</MaritalStatus>
            <RelationshipToApplicant>Self</RelationshipToApplicant>
            <Gender>${request.driver1_gender === '0' ? 'Male' : 'Female'}</Gender>
            <LicenseState>${request.state}</LicenseState>
            <AgeLicensed>16</AgeLicensed>
            <LicenseStatus>Active</LicenseStatus>
            <LicenseEverSuspendedRevoked>False</LicenseEverSuspendedRevoked>
            <Occupation>${this.occupation_mapping(request.driver1_occupation)?.value}</Occupation>
            <YearsAtEmployer>5</YearsAtEmployer>
            <Education>${driver1_education}</Education>
            <Military>No Military Experience</Military>
            <RequiresSR22Filing>${request.driver1_requiredSR22 === '0' ? 'False' : 'True'}</RequiresSR22Filing>
            <TrainingRequired>False</TrainingRequired>
            <CreditRating>${creditRating}</CreditRating>
            <Bankruptcy>${request.bankruptcy === '0' ? 'False' : 'True'}</Bankruptcy>`;

            if(request.driver1_isTicketsAccidentsClaims == 1){
             ping_data += '<Violations>';

          ////////////////////  FOR Incident type 1 //////////////////////////
            if(request.driver1_incidentType1 == '1'){
            ping_data +=`<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${driver1_ticket1Description}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType1  == '3'){
            ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${driver1_violation1Description}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType1 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver1_accident1Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_accident1Amount}</ViolationAmount>
                    <AtFault>${request.driver1_accident1Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver1_accident1Damage)}</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType1 === '4'){
             ping_data +=`<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver1_claim1Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_claim1PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }

          ////////////////////  FOR Incident type 2 //////////////////////////
            if(request.driver1_incidentType2 == '1'){
            ping_data +=`<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver1_ticket2Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType2 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver1_violation2Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType2 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver1_accident2Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_accident2Amount}</ViolationAmount>
                    <AtFault>${request.driver1_accident2Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver1_accident2Damage)}</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType2 == '4'){
            ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver1_claim2Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_claim2PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }

            ////////////////////  FOR Incident type 3 //////////////////////////
            if(request.driver1_incidentType3 == '1'){
             ping_data += `<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver1_ticket3Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType3 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver1_violation3Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType3 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver1_accident3Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_accident3Amount}</ViolationAmount>
                    <AtFault>${request.driver1_accident3Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver1_accident3Damage)}</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType3 == '4'){
             ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver1_claim3Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_claim3PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }

            ////////////////////  FOR Incident type 4 //////////////////////////
            if(request.driver1_incidentType4 == '1'){
             ping_data += `<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver1_ticket4Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType4 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver1_violation4Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType4 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver1_accident4Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_accident4Amount}</ViolationAmount>
                    <AtFault>${request.driver1_accident4Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver1_accident4Damage)}</Damage>
                  </Violation>`;
            }
            else if(request.driver1_incidentType4 == '4'){
             ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver1_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver1_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver1_claim4Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver1_claim4PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            ping_data += '</Violations>';
          }
           ping_data += '</Driver>';
          /////DRIVER 1 END /////////////

          /////DRIVER 2 /////////////
          if(request.driver2_firstName && request.driver2_firstName != ''){
             ping_data += `<Driver>
            <Id>2</Id>
            <BirthDate>${request.driver2_dob}</BirthDate>
            <MaritalStatus>${marital_status_m}</MaritalStatus>
            <RelationshipToApplicant>${request.driver2_relationship}</RelationshipToApplicant>
            <Gender>${request.driver2_gender === '0' ? 'Male' : 'Female'}</Gender>
            <LicenseState>${request.state}</LicenseState>
            <AgeLicensed>16</AgeLicensed>
            <LicenseStatus>Active</LicenseStatus>
            <LicenseEverSuspendedRevoked>False</LicenseEverSuspendedRevoked>
            <Occupation>${this.occupation_mapping(request.driver2_occupation)?.value}</Occupation>
            <YearsAtEmployer>5</YearsAtEmployer>
            <Education>${driver2_education}</Education>
            <Military>No Military Experience</Military>
            <RequiresSR22Filing>${request.driver2_requiredSR22 === '0' ? 'False' : 'True'}</RequiresSR22Filing>
            <TrainingRequired>False</TrainingRequired>
            <CreditRating>${creditRating}</CreditRating>
            <Bankruptcy>${request.bankruptcy === '0' ? 'False' : 'True'}</Bankruptcy>`;

            if(request.driver2_isTicketsAccidentsClaims == 1){
             ping_data +=  '<Violations>';

          ////////////////////  FOR Incident type 1 //////////////////////////
            if(request.driver2_incidentType1 == '1'){
             ping_data += `<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver2_ticket1Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType1 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver2_violation1Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType1 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver2_accident1Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_accident1Amount}</ViolationAmount>
                    <AtFault>${request.driver2_accident1Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver2_accident1Damage)?.value}</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType1 == '4'){
             ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear1}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth1}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver2_claim1Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_claim1PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }

          ////////////////////  FOR Incident type 2 //////////////////////////
            if(request.driver2_incidentType2 == '1'){
             ping_data += `<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver2_ticket2Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType2 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver2_violation2Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType2 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver2_accident2Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_accident2Amount}</ViolationAmount>
                    <AtFault>${request.driver2_accident2Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver2_accident2Damage)?.value}</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType2 == '4'){
             ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear2}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth2}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver2_claim2Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_claim2PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }

            ////////////////////  FOR Incident type 3 //////////////////////////
            if(request.driver2_incidentType3 == '1'){
             ping_data += `<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver2_ticket3Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType3 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver2_violation3Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType3 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver2_accident3Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_accident3Amount}</ViolationAmount>
                    <AtFault>${request.driver2_accident3Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver2_accident3Damage)}</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType3 == '4'){
             ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear3}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth3}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver2_claim3Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_claim3PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }

            ////////////////////  FOR Incident type 4 //////////////////////////
            if(request.driver2_incidentType4 == '1'){
            ping_data += `<Violation>
                    <ViolationType>0</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.TICKET_DESCRIPTION(request.driver2_ticket4Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType4 == '3'){
             ping_data += `<Violation>
                    <ViolationType>1</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.VIOLATION_DESCRIPTION(request.driver2_violation4Description)?.value}</ViolationDesc>
                    <ViolationAmount>0</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType4 == '2'){
             ping_data += `<Violation>
                    <ViolationType>2</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.ACCIDENT_DESCRIPTION(request.driver2_accident4Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_accident4Amount}</ViolationAmount>
                    <AtFault>${request.driver2_accident4Atfault === 1 ? 'True' : 'False'}</AtFault>
                    <Damage>${this.ACCIDENT_DAMAGE(request.driver2_accident4Damage)}</Damage>
                  </Violation>`;
            }
            else if(request.driver2_incidentType4 == '4'){
             ping_data += `<Violation>
                    <ViolationType>3</ViolationType>
                    <ViolationYear>${request.driver2_incidentYear4}</ViolationYear>
                    <ViolationMonth>${request.driver2_incidentMonth4}</ViolationMonth>
                    <ViolationDesc>${this.CLAIM_DESCRIPTION(request.driver2_claim4Description)?.value}</ViolationDesc>
                    <ViolationAmount>${request.driver2_claim4PaidAmount}</ViolationAmount>
                    <AtFault>False</AtFault>
                    <Damage>Not Applicable</Damage>
                  </Violation>`;
            }
            ping_data += '</Violations>';
          }
          ping_data +='</Driver>';
          }

        ping_data += `</Drivers>
        <Vehicles>
          <Vehicle>
            <Year>${request.vehicle1_year}</Year>
            <Make>${request.vehicle1_make}</Make>
            <Model>${encodeURI(request.vehicle1_model)}</Model>
            <Submodel>${request.vehicle1_subModel !== '' ? encodeURI(request.vehicle1_subModel) : 'NO TRIM'}</Submodel>
            <VIN>${request.vehicle1_vin !== '' ? request.vehicle1_vin : ''}</VIN>
            <Garage>No Cover</Garage>
            <Ownership>${request.vehicle1_vehicleOwnership === '1' ? 'Owned' : 'Leased'}</Ownership>
            <PrimaryUse>${vehicle1_primaryUse}</PrimaryUse>
            <AnnualMiles>${this.MILEAGE(request.vehicle1_annualMileage)?.value > 25000 ? 25000 : this.MILEAGE(request.vehicle1_annualMileage)?.value}</AnnualMiles>
            <WeeklyCommuteDays>6</WeeklyCommuteDays>
            <OneWayDistance>${this.MILE_ONEWAY(request.vehicle1_dailyMileage)?.value}</OneWayDistance>
            <ComphrensiveDeductible>${request.vehicle1_comprehensiveDeductible ? this.COMPREHENSIVE_COLLISION(request.vehicle1_comprehensiveDeductible)?.value.replace('$', '') : this.COMPREHENSIVE_COLLISION(request.vehicle_comprehensiveDeductible)?.value.replace('$', '')}</ComphrensiveDeductible>
            <CollisionDeductible>${request.vehicle1_collisionDeductible ? this.COMPREHENSIVE_COLLISION(request.vehicle1_collisionDeductible)?.value.replace('$', '') : this.COMPREHENSIVE_COLLISION(request.vehicle_collisionDeductible)?.value.replace('$', '')}</CollisionDeductible>
            </Vehicle>`;

        /////Vehicle 2 /////////////
        if(request.vehicle2_year && request.vehicle2_year != ''){
          ping_data +=`
          <Vehicle>
            <Year>${request.vehicle2_year}</Year>
            <Make>${request.vehicle2_make}</Make>
            <Model>${encodeURI(request.vehicle2_model)}</Model>
            <Submodel>${request.vehicle2_subModel !== '' ? encodeURI(request.vehicle2_subModel) : 'NO TRIM'}</Submodel>
            <VIN>${request.vehicle2_vin !== '' ? request.vehicle2_vin : ''}</VIN>
            <Garage>No Cover</Garage>
            <Ownership>${request.vehicle2_vehicleOwnership !== '1' ? 'Owned' : 'Leased'}</Ownership>
            <PrimaryUse>${vehicle2_primaryUse}</PrimaryUse>
            <AnnualMiles>${this.MILEAGE(request.vehicle2_annualMileage)?.value > 25000 ? 25000 : this.MILEAGE(request.vehicle2_annualMileage)?.value}</AnnualMiles>
            <WeeklyCommuteDays>6</WeeklyCommuteDays>
            <OneWayDistance>${this.MILE_ONEWAY(request.vehicle2_dailyMileage)?.value}</OneWayDistance>
            <ComphrensiveDeductible>${request.vehicle2_comprehensiveDeductible ? this.COMPREHENSIVE_COLLISION(request.vehicle2_comprehensiveDeductible)?.value.replace('$', '') : this.COMPREHENSIVE_COLLISION(4)?.value.replace('$', '')}</ComphrensiveDeductible>
            <CollisionDeductible>${request.vehicle2_collisionDeductible ? this.COMPREHENSIVE_COLLISION(request.vehicle2_collisionDeductible)?.value.replace('$', '') : this.COMPREHENSIVE_COLLISION(4)?.value.replace('$', '')}</CollisionDeductible>
            </Vehicle>`;
        /////Vehicle 2 END/////////////
        }

          ping_data += `</Vehicles>
          <RequestedInsurance>
          <RequestedPolicy>
            <CoverageType>${coverageType}</CoverageType>
            <BodilyInjury>${BodilyInjury}</BodilyInjury>
            <PropertyDamage>${PropertyDamage}</PropertyDamage>
          </RequestedPolicy>`;

        if(request.haveInsurance == 1 ){
          ping_data +=`<CurrentPolicy>
            <InsuranceCompany>${this.CURRENT_INSURANCE_COMPANY(request.insuranceCompany)?.value}</InsuranceCompany>
            <ExpirationYear>${request.current_policy_expiration_date.split('-')[0]}</ExpirationYear>
            <ExpirationDay>${request.current_policy_expiration_date.split('-')[2]}</ExpirationDay>
            <ExpirationMonth>${request.current_policy_expiration_date.split('-')[1]}</ExpirationMonth>
            <HowLongYear>${howLongYear}</HowLongYear>
            <HowLongMonth>${howLongMonth}</HowLongMonth>
            <ContineousYear>${contineousYear}</ContineousYear>
            <ContineousMonth>${contineousMonth}</ContineousMonth>
            <CoverageType>${coverageType}</CoverageType>
          </CurrentPolicy>`;
        }
          ping_data += `</RequestedInsurance>
        </AutoInsurance>
     </Request>`;

      const pingResult = await axios.post(pingUrl, ping_data, {
        headers: { 'Content-Type': 'application/xml' }
      });

      const statusRegex = /<Status>(.+?)<\/Status>/g;
      const priceRegex = /<Price>(.+?)<\/Price>/g;
      const leadIdRegex = /<LeadId>(.+?)<\/LeadId>/g;
      const reasonRegex = /<Reason>(.+?)<\/Reason>/g;
      const price = priceRegex.exec(pingResult.data)[1];
      const leadId = leadIdRegex.exec(pingResult.data)[1];
      const status = statusRegex.exec(pingResult.data)[1];
      const rejectionReason = reasonRegex.exec(pingResult.data)[1];

      const bid = new Bid();
      bid.client = campaign.client;
      bid.client_price = parseFloat(price);
      bid.client_ping_confirmation_id = leadId;
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

      let post_data = `<Request>
        <Vendor>
          <IsTest>${campaign.client.user_status === CAMPAIGN_STATUSES.Active_Test || this.configService.get<string>('ENV') === 'staging' ? '1' : '0'}</IsTest>
          <VendorId>${campaign.parameter1}</VendorId>
          <SubVendorId>${request.vendor_id}</SubVendorId>
          <LeadTypeId>14</LeadTypeId>
        </Vendor>
        <Data>
          <LeadId>${bid.client_ping_confirmation_id}</LeadId>
          <FirstName>${request.first_name}</FirstName>
          <LastName>${request.last_name}</LastName>
          <Address>${request.address}</Address>
          <EmailAddress>${request.email}</EmailAddress>
          <HomePhoneNumber>${request.primary_phone}</HomePhoneNumber>
          <WorkPhoneNumber>${request.secondary_phone}</WorkPhoneNumber>
          <WhenToContact>Anytime</WhenToContact>
        </Data>
        <Drivers>
          <Driver>
            <Id>1</Id>
            <FirstName>${request.first_name}</FirstName>
            <LastName>${request.last_name}</LastName>
          </Driver>`;

        if(request.driver2_firstname && request.driver2_firstname != ''){
          post_data += `<Driver>
            <Id>2</Id>
            <FirstName>${request.driver2_firstname}</FirstName>
            <LastName>${request.driver2_lastname}</LastName>
          </Driver>`;
        }
        post_data += `</Drivers>
      </Request>`;

      const postResult = await axios.post(postUrl, post_data, {
        headers: { 'Content-Type': 'application/xml' }
      });

      const statusRegex = /<Status>(.+?)<\/Status>/g;
      const leadIDRegex = /<LeadId>(.+?)<\/LeadId>/g;
      const status = statusRegex.exec(postResult.data)[1];
      const confirmationID = leadIDRegex.exec(postResult.data)[1];

      return {
        status,
        confirmationID
      };
    }

  }
}