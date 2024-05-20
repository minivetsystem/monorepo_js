

export const LOCAL_ENV = 'local';

export const enum VALIDATION_MESSAGES {
  invalid_vendor_id = `Property vendor_id is not valid.`,
  invalid_lead_type = `Property lead_type is not valid.`,
  invalid_date_range = `Invalid date range.`,
  lead_type_not_present = `Lead type doesn't exist with the id`,
  client_not_present = `client not present with the id`,
  duplicate_ping = `Duplicate ping`,
  max_ping_cap_reached = `Max ping cap reached`,
  client_per_min_ping_cap_reached = 'Client per min ping cap reached.',
  no_client_handler_found = 'No client handler found.',
  client_not_active = 'Client is not active',
  vendor_not_allowed = 'Vendor is not allowed to send pings',
  vendor_caps_not_set = 'Vendor daily & hoursly caps not set.',
  vendor_max_hourly_post_cap_reached = 'Vendor max hourly post cap reached.',
  vendor_max_daily_post_cap_reached = 'Vendor max daily post cap reached.'
}

export const enum CLIENT_RESPONSE_TYPES {
  NO_BUYER_FOUND = 'No Buyer Found',
  DUPLICATE = 'Duplicate',
  INTERNAL_NO_BUYER_FOUND = 'Internal No buyer found',
  CLIENT_VALIDATION_FAILED = 'Errors Detected',
  LEAD_CAP_EXHAUSTED = 'Per Minute Lead Cap Exhausted',
  BEYOND_EXPECTED_SCHEDULE = 'Error: Beyond accepted schedule',
  VENDOR_ACCOUNT_DISABLED = 'vendor_id temporarily disabled',
  PING_SUCCESSFUL = 'Ping Successful',
  POST_SUCCESSFUL = 'Post Successful',
  POST_REJECTED = 'Post Rejected'
}

export const CST_TIMEZONE = 'America/Chicago';

export const YELLOW_COLOR = 'warning-bg-report';
export const BLUE_COLOR = 'info-bg-report';
export const GREEN_COLOR = 'success-bg-report';
export const RED_COLOR = 'danger-bg-report';

export const ENV_STAGE = 'staging';

export const POST_TEST_RESPONSE = '<PostResponse><Response>Accepted</Response><Confirmation>1068378547</Confirmation><Price>2.25</Price><Reason></Reason><Message></Message></PostResponse>';

export const PING_TEST_RESPONSE = '<PingResponse><Response>Accepted</Response><Confirmation>1068378547</Confirmation><Price>2.25</Price><Reason></Reason><Message></Message></PingResponse>';

export const enum CLIENT_HANDLERS {
  IradiusMarketing = 'IradiusMarketing',
  LeadHoop = 'LeadHoop',
  Astoria = 'Astoria'
}

/**
 * This enum will store all the actions which can be performed on a lead.
 */
export const enum LEAD_ACTIONS {
  //This represents accepted action.
  Accepted = 'Accepted',
  //This represents rejections action.
  Rejected = 'Expired',
}
/**
 * This enum will store all the states in which a ping/post request can be at any given point in time.
 */
export const enum REQUEST_STATES {
  New = 'New',
  Expired = 'Expired',
  Bidded = 'Bidded',
  Rejected = 'Rejected',
  Accepted = 'Accepted'
}

export const enum CAMPAIGN_STATUSES {
  Active_Live = 'active_live',
  Active_Test = 'active_test',
  Inactive = 'inactive'
}

export const enum RESPONSE_STATUSES {
  VALID_PING_HIGHEST_BID_SENT = 'Valid Ping, highest bid sent.',
  VALID_TEST_PING_ACCEPTED = 'Valid test ping, accepted.',
  INVALID_PING_VALIDATION_ERRORS = 'Invalid Ping, validation errors.',
  TEST_PING_REJECTED = 'Test ping, rejected.',
  VALID_POST_ACCEPTED = 'Valid Post, accepted.',
  VALID_POST_REJECTED = 'Valid Post, rejected.',
  INVALID_POST_VALIDATION_ERRORS = 'Invalid Post, validation errors.',
  VALID_TEST_POST_ACCEPTED = 'Valid test post, accepted.',
  PING_REJECTED_NOT_BUYERS_FOUND = 'Ping rejected, no buyers found.',
  INVALID_SEARCH_VALIDATION_ERRORS = 'Invalid search, validation errors.'
}

/**
 * This enum stores all the rule names used to validate ping/post apis.
 */
export const enum RULES {
  IsRequired = 'IsRequired',
  NumberWithMinMax = 'NumberWithMinMax',
  DateAny = 'DateAny',
  DateFuture = 'DateFuture',
  DateFutureWithPast30Days = 'DateFutureWithPast30Days',
  DatePast = 'DatePast',
  DatetimeWith12HourFormat = 'DatetimeWith12HourFormat',
  DatetimeWith24HourFormat = 'DatetimeWith24HourFormat',
  Integer = 'Integer',
  IsHiddenInSpec = 'IsHiddenInSpec',
  NumberWithFixedLength = 'NumberWithFixedLength',
  USState = 'USState',
  YearWithMinMax = 'YearWithMinMax',
  LeadID = 'LeadID',
  BlacklistAliancePhone = 'BlacklistAliancePhone',
  BlacklistAlianceTCPALitigatorPhone = 'BlacklistAlianceTCPALitigatorPhone',
  MultipleValuesSingleChoice = 'MultipleValuesSingleChoice',
  Boolean = 'Boolean',
  Price = 'Price',
  IP = 'IP',
  ObjectId = 'ObjectId',
  URL = 'URL',
  Zipcode = 'Zip',
  ConfirmationCode = 'ConfirmationCode',
  UUID = 'UUID',
  InternalBlacklist = 'InternalBlacklist',
  PingIdForBid = 'PingIdForBid',
  Email = 'Email',
  Phonenumber = 'Phonenumber'
}

/**
 * This enum stores all the field types from Ping & Post request.
 */
export const enum PING_FIELD_TYPE {
  Age = 'Age',
  Text = 'Text',
  Email = 'Email',
  DateAndTime = 'Date and time',
  IPAddress = 'IP Address',
  State = 'State',
  Phone = 'Phone',
  Price = 'Price',
}

/**
 * This enum stores the types of requests.
 */
export const enum REQUEST_TYPE {
  Ping = 'Ping',
  Post = 'Post',
  Search = 'Search'
}

/**
 * Log types to be handled.
 */
export const enum LOG_TYPES {
  Error = 'Error'
}

/**
 * This const stores the wait time for ping/post request.
 */
export const REQUEST_WAIT_TIME = 20000;

/**
 * This represents all the events emitted by the api.
 */
export const enum EVENTS {
  DEACTIVATE_VENDOR = 'deactivate.vendor',
  SETTINGS_UPDATED = 'settings.updated'
};

/**
 * This represents all the actions performed on the vendor.
 */
export const enum VENDOR_ACTIONS {
  DEACTIVATED_HIGH_PING_VOLUME = 'DEACTIVATED_HIGH_PING_VOLUME'
};

/**
 * This identifies the system.
 */
export const CONST_SYSTEM = 'SYSTEM';

/**
 * This enum stores the response types
 */
export const enum RESPONSE_TYPE {
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

/**
 * This const stores all the US State 2 chars.
 */
export const US_STATE_CODES = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

/**
 * This represents the account status for both vendor and client.
 */
export const USER_ACCOUNT_STATUS = {
  Inactive: 'inactive',
  ActiveLive: 'active_live',
  ActiveTest: 'active_test'
}

/**
 * This represents the lead flow status for both vendor and client.
 */
export const LEAD_FLOW_STATUSES = {
  Running: 'running',
  Paused: 'paused'
}

/**
 * This represents the vendor bid types
 */
export const VENDOR_BID_TYPE = {
  exclusive: 'exclusive',
  shared: 'shared'
}

/**
 * This represents the vendor type
 */
export const VENDOR_TYPE = {
  API: 'api'
}

/**
 * This represents the campaign status.
 */
export const CAMPAIGN_STATUS = {
  active: 'active',
  inactive: 'inactive'
}

//min 8 letter password, with at least a symbol, upper and lower case letters and a number
export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

/**
 * This enum will store all the permission actions for authorisation.
 */
export enum PERMISSION_ACTION {
  CAN_MANAGE_VENDOR = 'CAN_MANAGE_VENDOR',
  CAN_MANAGE_CLIENT = 'CAN_MANAGE_CLIENT',
  CAN_MANAGE_ADMIN = 'CAN_MANAGE_ADMIN',
  CAN_MANAGE_CAMPAIGN = 'CAN_MANAGE_CAMPAIGN',
  CAN_MANAGE_REPORTS = 'CAN_MANAGE_REPORTS',
  CAN_MANAGE_LEADS = 'CAN_MANAGE_LEADS'
}

export enum USER_TYPES {
  ADMIN = 'Admin'
}

export enum ENTITIES {
  User = 'User',
  Campaign = 'Campaign',
  Report = 'Report',
  Lead = 'Lead'
}

/**
 * Permission checker key
 */
export const PERMISSION_CHECKER_KEY = "permission_checker_params_key";

export const LEAD_TYPES = [
  { value: 5, label: 'Auto Insurance' },
  { value: 34, label: 'Education' }
];

export enum LEAD_TYPES_ENUM {
  AUTO_INSURANCE = 5,
  EDUCATION = 34
}

export const AUTO_INSURANCE_FILTER_OPERATORS = [
  { value: '=', label: 'Equal To' },
  { value: '>', label: 'Greater Than' },
  { value: '<', label: 'Less Than' },
  { value: '<>', label: 'Is NOT Equal To' },
  { value: '>=', label: 'Greater Than or Equal To' },
  { value: '<=', label: 'Less Than or Equal To' },
  { value: 'between', label: 'Between' },
  { value: 'not_between', label: 'Not Between' },
  { value: 'string_starts_with', label: 'String starts with' },
  { value: 'string_ends_with', label: 'String ends with' },
  { value: 'string_contains', label: 'String contains' },
  { value: 'string_does_not_start_with', label: 'String does not start with' },
  { value: 'string_does_not_end_with', label: 'String does not end with' },
  { value: 'string_does_not_contain', label: 'String does not contain' },
  { value: 'is_blank', label: 'Is Blank' },
  { value: 'is_not_blank', label: 'Is Not Blank' },
  { value: 'in_comma_separated_list', label: 'In Comma Separated List' },
  { value: 'not_in_comma_separated_list', label: 'Not in Comma Separated List' }
];

export enum AUTO_INSURANCE_CAMPAIGN_FILTERS {
   age = 'age',
   age_driver2 = 'age_driver2',
   age_driver3 = 'age_driver3',
   age_driver4 = 'age_driver4',
   time_of_day = 'time_of_day',
   day_of_week = 'day_of_week',
   longdistance_moving = 'longdistance_moving',
   source_id = 'source_id',
   total_tickets = 'total_tickets',
   total_at_fault_accidents = 'total_at_fault_accidents',
   total_sr22s = 'total_sr22s',
   total_duis = 'total_duis',
   address = 'address',
   bankruptcy = 'bankruptcy',
   city = 'city',
   coverageType = 'coverageType',
   creditRating = 'creditRating',
   data_vid = 'data_vid',
   driver1_accident1Amount = 'driver1_accident1Amount',
   driver1_accident1Atfault = 'driver1_accident1Atfault',
   driver1_accident1Damage = 'driver1_accident1Damage',
   driver1_accident1Description = 'driver1_accident1Description',
   driver1_accident2Amount = 'driver1_accident2Amount',
   driver1_accident2Atfault = 'driver1_accident2Atfault',
   driver1_accident2Damage = 'driver1_accident2Damage',
   driver1_accident2Description = 'driver1_accident2Description',
   driver1_accident3Amount = 'driver1_accident3Amount',
   driver1_accident3Atfault = 'driver1_accident3Atfault',
   driver1_accident3Damage = 'driver1_accident3Damage',
   driver1_accident3Description = 'driver1_accident3Description',
   driver1_accident4Atfault = 'driver1_accident4Atfault',
   driver1_accident4Damage = 'driver1_accident4Damage',
   driver1_accident4Description = 'driver1_accident4Description',
   driver1_claim1Description = 'driver1_claim1Description',
   driver1_claim1PaidAmount = 'driver1_claim1PaidAmount',
   driver1_claim2Description = 'driver1_claim2Description',
   driver1_claim2PaidAmount = 'driver1_claim2PaidAmount',
   driver1_claim3Description = 'driver1_claim3Description',
   driver1_claim3PaidAmount = 'driver1_claim3PaidAmount',
   driver1_claim4PaidAmount = 'driver1_claim4PaidAmount',
   driver1_education = 'driver1_education',
   driver1_gender = 'driver1_gender',
   driver1_incidentType1 = 'driver1_incidentType1',
   driver1_incidentType2 = 'driver1_incidentType2',
   driver1_incidentType3 = 'driver1_incidentType3',
   driver1_incidentType4 = 'driver1_incidentType4',
   driver1_incidentdate1 = 'driver1_incidentdate1',
   driver1_incidentdate2 = 'driver1_incidentdate2',
   driver1_incidentdate3 = 'driver1_incidentdate3',
   driver1_isTicketsAccidentsClaims = 'driver1_isTicketsAccidentsClaims',
   driver1_maritalStatus = 'driver1_maritalStatus',
   driver1_monthsAtResidence = 'driver1_monthsAtResidence',
   driver1_numOfIncidents = 'driver1_numOfIncidents',
   driver1_occupation = 'driver1_occupation',
   driver1_policy_date = 'driver1_policy_date',
   driver1_requiredSR22 = 'driver1_requiredSR22',
   driver1_ticket1Description = 'driver1_ticket1Description',
   driver1_ticket2Description = 'driver1_ticket2Description',
   driver1_ticket3Description = 'driver1_ticket3Description',
   driver1_ticket4Description = 'driver1_ticket4Description',
   driver1_violation1Description = 'driver1_violation1Description',
   driver1_violation1State = 'driver1_violation1State',
   driver1_violation2Description = 'driver1_violation2Description',
   driver1_violation2State = 'driver1_violation2State',
   driver1_violation3State = 'driver1_violation3State',
   driver1_violation4State = 'driver1_violation4State',
   driver1_yearsAtResidence = 'driver1_yearsAtResidence',
   driver2_accident1Amount = 'driver2_accident1Amount',
   driver2_accident1Atfault = 'driver2_accident1Atfault',
   driver2_accident1Damage = 'driver2_accident1Damage',
   driver2_accident1Description = 'driver2_accident1Description',
   driver2_accident2Amount = 'driver2_accident2Amount',
   driver2_accident2Atfault = 'driver2_accident2Atfault',
   driver2_accident2Damage = 'driver2_accident2Damage',
   driver2_accident2Description = 'driver2_accident2Description',
   driver2_accident3Amount = 'driver2_accident3Amount',
   driver2_accident3Atfault = 'driver2_accident3Atfault',
   driver2_accident3Description = 'driver2_accident3Description',
   driver2_accident4Amount = 'driver2_accident4Amount',
   driver2_accident4Atfault = 'driver2_accident4Atfault',
   driver2_accident4Damage = 'driver2_accident4Damage',
   driver2_accident4Description = 'driver2_accident4Description',
   driver2_claim1Description = 'driver2_claim1Description',
   driver2_claim1PaidAmount = 'driver2_claim1PaidAmount',
   driver2_claim2Description = 'driver2_claim2Description',
   driver2_claim2PaidAmount = 'driver2_claim2PaidAmount',
   driver2_claim3Description = 'driver2_claim3Description',
   driver2_claim3PaidAmount = 'driver2_claim3PaidAmount',
   driver2_claim4Description = 'driver2_claim4Description',
   driver2_claim4PaidAmount = 'driver2_claim4PaidAmount',
   driver2_education = 'driver2_education',
   driver2_gender = 'driver2_gender',
   driver2_incidentType1 = 'driver2_incidentType1',
   driver2_incidentType2 = 'driver2_incidentType2',
   driver2_incidentType3 = 'driver2_incidentType3',
   driver2_incidentdate1 = 'driver2_incidentdate1',
   driver2_incidentdate2 = 'driver2_incidentdate2',
   driver2_incidentdate3 = 'driver2_incidentdate3',
   driver2_incidentdate4 = 'driver2_incidentdate4',
   driver2_isTicketsAccidentsClaims = 'driver2_isTicketsAccidentsClaims',
   driver2_maritalStatus = 'driver2_maritalStatus',
   driver2_monthsAtResidence = 'driver2_monthsAtResidence',
   driver2_numOfIncidents = 'driver2_numOfIncidents',
   driver2_occupation = 'driver2_occupation',
   driver2_requiredSR22 = 'driver2_requiredSR22',
   driver2_ticket1Description = 'driver2_ticket1Description',
   driver2_ticket2Description = 'driver2_ticket2Description',
   driver2_ticket3Description = 'driver2_ticket3Description',
   driver2_ticket4Description = 'driver2_ticket4Description',
   driver2_violation1Description = 'driver2_violation1Description',
   driver2_violation2Description = 'driver2_violation2Description',
   driver2_violation2State = 'driver2_violation2State',
   driver2_violation3Description = 'driver2_violation3Description',
   driver2_violation3State = 'driver2_violation3State',
   driver2_violation4Description = 'driver2_violation4Description',
   driver2_violation4State = 'driver2_violation4State',
   driver2_yearsAtResidence = 'driver2_yearsAtResidence',
   driver3_accident1Amount = 'driver3_accident1Amount',
   driver3_accident1Atfault = 'driver3_accident1Atfault',
   driver3_accident1Damage = 'driver3_accident1Damage',
   driver3_accident1Description = 'driver3_accident1Description',
   driver3_accident2Amount = 'driver3_accident2Amount',
   driver3_accident2Atfault = 'driver3_accident2Atfault',
   driver3_accident2Damage = 'driver3_accident2Damage',
   driver3_accident3Amount = 'driver3_accident3Amount',
   driver3_accident3Atfault = 'driver3_accident3Atfault',
   driver3_accident3Damage = 'driver3_accident3Damage',
   driver3_accident3Description = 'driver3_accident3Description',
   driver3_accident4Amount = 'driver3_accident4Amount',
   driver3_accident4Atfault = 'driver3_accident4Atfault',
   driver3_accident4Damage = 'driver3_accident4Damage',
   driver3_accident4Description = 'driver3_accident4Description',
   driver3_claim1Description = 'driver3_claim1Description',
   driver3_claim1PaidAmount = 'driver3_claim1PaidAmount',
   driver3_claim2Description = 'driver3_claim2Description',
   driver3_claim2PaidAmount = 'driver3_claim2PaidAmount',
   driver3_claim3Description = 'driver3_claim3Description',
   driver3_claim3PaidAmount = 'driver3_claim3PaidAmount',
   driver3_claim4Description = 'driver3_claim4Description',
   driver3_claim4PaidAmount = 'driver3_claim4PaidAmount',
   driver3_education = 'driver3_education',
   driver3_gender = 'driver3_gender',
   driver3_incidentType1 = 'driver3_incidentType1',
   driver3_incidentType2 = 'driver3_incidentType2',
   driver3_incidentType3 = 'driver3_incidentType3',
   driver3_incidentdate1 = 'driver3_incidentdate1',
   driver3_incidentdate2 = 'driver3_incidentdate2',
   driver3_incidentdate3 = 'driver3_incidentdate3',
   driver3_incidentdate4 = 'driver3_incidentdate4',
   driver3_isTicketsAccidentsClaims = 'driver3_isTicketsAccidentsClaims',
   driver3_maritalStatus = 'driver3_maritalStatus',
   driver3_monthsAtResidence = 'driver3_monthsAtResidence',
   driver3_numOfIncidents = 'driver3_numOfIncidents',
   driver3_occupation = 'driver3_occupation',
   driver3_requiredSR22 = 'driver3_requiredSR22',
   driver3_ticket1Description = 'driver3_ticket1Description',
   driver3_ticket2Description = 'driver3_ticket2Description',
   driver3_ticket3Description = 'driver3_ticket3Description',
   driver3_ticket4Description = 'driver3_ticket4Description',
   driver3_violation1Description = 'driver3_violation1Description',
   driver3_violation1State = 'driver3_violation1State',
   driver3_violation2Description = 'driver3_violation2Description',
   driver3_violation2State = 'driver3_violation2State',
   driver3_violation3Description = 'driver3_violation3Description',
   driver3_violation3State = 'driver3_violation3State',
   driver3_violation4Description = 'driver3_violation4Description',
   driver3_violation4State = 'driver3_violation4State',
   driver3_yearsAtResidence = 'driver3_yearsAtResidence',
   driver4_accident1Amount = 'driver4_accident1Amount',
   driver4_accident1Atfault = 'driver4_accident1Atfault',
   driver4_accident1Damage = 'driver4_accident1Damage',
   driver4_accident1Description = 'driver4_accident1Description',
   driver4_accident2Amount = 'driver4_accident2Amount',
   driver4_accident2Atfault = 'driver4_accident2Atfault',
   driver4_accident2Damage = 'driver4_accident2Damage',
   driver4_accident2Description = 'driver4_accident2Description',
   driver4_accident3Amount = 'driver4_accident3Amount',
   driver4_accident3Atfault = 'driver4_accident3Atfault',
   driver4_accident3Damage = 'driver4_accident3Damage',
   driver4_accident3Description = 'driver4_accident3Description',
   driver4_accident4Amount = 'driver4_accident4Amount',
   driver4_accident4Atfault = 'driver4_accident4Atfault',
   driver4_accident4Damage = 'driver4_accident4Damage',
   driver4_accident4Description = 'driver4_accident4Description',
   driver4_claim1Description = 'driver4_claim1Description',
   driver4_claim1PaidAmount = 'driver4_claim1PaidAmount',
   driver4_claim2Description = 'driver4_claim2Description',
   driver4_claim2PaidAmount = 'driver4_claim2PaidAmount',
   driver4_claim3Description = 'driver4_claim3Description',
   driver4_claim3PaidAmount = 'driver4_claim3PaidAmount',
   driver4_claim4Description = 'driver4_claim4Description',
   driver4_claim4PaidAmount = 'driver4_claim4PaidAmount',
   driver4_education = 'driver4_education',
   driver4_gender = 'driver4_gender',
   driver4_incidentType1 = 'driver4_incidentType1',
   driver4_incidentType2 = 'driver4_incidentType2',
   driver4_incidentType3 = 'driver4_incidentType3',
   driver4_incidentType4 = 'driver4_incidentType4',
   driver4_incidentdate1 = 'driver4_incidentdate1',
   driver4_incidentdate2 = 'driver4_incidentdate2',
   driver4_incidentdate3 = 'driver4_incidentdate3',
   driver4_incidentdate4 = 'driver4_incidentdate4',
   driver4_isTicketsAccidentsClaims = 'driver4_isTicketsAccidentsClaims',
   driver4_maritalStatus = 'driver4_maritalStatus',
   driver4_monthsAtResidence = 'driver4_monthsAtResidence',
   driver4_numOfIncidents = 'driver4_numOfIncidents',
   driver4_occupation = 'driver4_occupation',
   driver4_requiredSR22 = 'driver4_requiredSR22',
   driver4_ticket1Description = 'driver4_ticket1Description',
   driver4_ticket2Description = 'driver4_ticket2Description',
   driver4_ticket3Description = 'driver4_ticket3Description',
   driver4_ticket4Description = 'driver4_ticket4Description',
   driver4_violation1Description = 'driver4_violation1Description',
   driver4_violation1State = 'driver4_violation1State',
   driver4_violation2Description = 'driver4_violation2Description',
   driver4_violation2State = 'driver4_violation2State',
   driver4_violation3Description = 'driver4_violation3Description',
   driver4_violation3State = 'driver4_violation3State',
   driver4_violation4Description = 'driver4_violation4Description',
   driver4_violation4State = 'driver4_violation4State',
   driver4_yearsAtResidence = 'driver4_yearsAtResidence',
   haveInsurance = 'haveInsurance',
   insuranceCompany = 'insuranceCompany',
   ipaddress = 'ipaddress',
   live_xfer_phone_number = 'live_xfer_phone_number',
   medicalPayment = 'medicalPayment',
   monthSince = 'monthSince',
   phone_last_4 = 'phone_last_4',
   policy_expire_date = 'policy_expire_date',
   residenceType = 'residenceType',
   return_credit_status = 'return_credit_status',
   state = 'state',
   subid = 'subid',
   tcpa_optin = 'tcpa_optin',
   tcpa_text = 'tcpa_text',
   unique_hash = 'unique_hash',
   universal_leadid = 'universal_leadid',
   url = 'url',
   user_agent = 'user_agent',
   vehicle1_annualMileage = 'vehicle1_annualMileage',
   vehicle1_collisionDeductible = 'vehicle1_collisionDeductible',
   vehicle1_comprehensiveDeductible = 'vehicle1_comprehensiveDeductible',
   vehicle1_dailyMileage = 'vehicle1_dailyMileage',
   vehicle1_make = 'vehicle1_make',
   vehicle1_model = 'vehicle1_model',
   vehicle1_primaryUse = 'vehicle1_primaryUse',
   vehicle1_subModel = 'vehicle1_subModel',
   vehicle1_vehicleOwnership = 'univvehicle1_vehicleOwnershipersal_leadid',
   vehicle1_vin = 'vehicle1_vin',
   vehicle1_year = 'vehicle1_year',
   vehicle2_annualMileage = 'vehicle2_annualMileage',
   vehicle2_dailyMileage = 'vehicle2_dailyMileage',
   vehicle2_make = 'vehicle2_make',
   vehicle2_model = 'vehicle2_model',
   vehicle2_primaryUse = 'vehicle2_primaryUse',
   vehicle2_subModel = 'vehicle2_subModel',
   vehicle2_vehicleOwnership = 'vehicle2_vehicleOwnership',
   vehicle2_vin = 'vehicle2_vin',
   vehicle2_year = 'vehicle2_year',
   vehicle3_annualMileage = 'vehicle3_annualMileage',
   vehicle3_dailyMileage = 'vehicle3_dailyMileage',
   vehicle3_make = 'vehicle3_make',
   vehicle3_model = 'vehicle3_model',
   vehicle3_primaryUse = 'vehicle3_primaryUse',
   vehicle3_subModel = 'vehicle3_subModel',
   vehicle3_vehicleOwnership = 'vehicle3_vehicleOwnership',
   vehicle3_vin = 'vehicle3_vin',
   vehicle3_year = 'vehicle3_year',
   vehicle4_annualMileage = 'vehicle4_annualMileage',
   vehicle4_dailyMileage = 'vehicle4_dailyMileage',
   vehicle4_make = 'vehicle4_make',
   vehicle4_model = 'vehicle4_model',
   vehicle4_primaryUse = 'vehicle4_primaryUse',
   vehicle4_subModel = 'vehicle4_subModel',
   vehicle4_vehicleOwnership = 'vehicle4_vehicleOwnership',
   vehicle4_vin = 'vehicle4_vin',
   vehicle4_year = 'vehicle4_year',
   vendor_agent_id = 'vendor_agent_id',
   vendor_id = 'vendor_id',
   xxtrustedformcerturl = 'xxtrustedformcerturl',
   z_params = 'z_params',
   zip = 'zip'
}
