export const STRING_OPERATORS = [
    { label: 'contains', value: 'contains' },
    { label: 'equals', value: 'equals' }
];

export const NUMERIC_OPERATORS = [
    { label: '=', value: '=' },
    { label: '!=', value: '!=' }
];

export const EQUAL_OPERATOR = [
    { label: '=', value: '=' }
];

export const USER_LISTING_COLUMNS = [
    { label: 'Name', value: 'name' },
    { label: 'Username', value: 'username' },
    { label: 'Email', value: 'email' },
    { label: 'Role', value: 'role' },
    { label: 'User Status', value: 'user_status' },
    { label: 'Phone', value: 'phone' }
];

export const OUTBOUND_REPORT_COLUMNS = [
    { label: 'Lead Type', value: 'lead_type' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Date Range', value: 'daterange' },
    { label: 'Lead Mode', value: 'lead_mode' },
];



export const COMMISSIONS_REPORT_COLUMNS = [
    { label: 'Lead Type', value: 'lead_type' },
    { label: 'Date Range', value: 'daterange' },
];

export const CAMPAIGN_LISTING_COLUMNS = [
    { label: 'Name', value: 'campaign_name' },
    { label: 'Lead Type', value: 'lead_type' },
    { label: 'Client', value: 'client' },
    { label: 'Campaign Status', value: 'campaign_status' }
];

export const USER_STATUS_OPTIONS = [
    { label: 'Active/Live', value: 'active_live' },
    { label: 'Active/Test', value: 'active_test' },
    { label: 'Inactive', value: 'inactive'}
];

export const CAMPAIGN_STATUS_OPTIONS = [
    { label: 'Active/Live', value: 'active_live' },
    { label: 'Active/Test', value: 'active_test' },
    { label: 'Inactive', value: 'inactive'}
];

export const LEAD_MODES = [
    { label: 'Live', value: 1 },
    { label: 'Test', value: 0 }
];

export const LEAD_STATUS = [
  { label: 'Returned', value: 2 },
  { label: 'Accepted', value: 1 },
  { label: 'Rejected', value: 0 },
];

export const COUNTRIES = [
    { label: 'United States', value: 'USA' }
];

export enum NOTIFICATIONS {
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}

export const CAMPAIGNS_MIN_ACCEPTED_QUALITIES = [
    { label: 'Standard', value: 'standard' },
    { label: 'Sub-prime', value: 'subprime' },
    { label: 'Premium', value: 'premium' }
];

export const FILTER_DATE_RANGES = [
    { label: 'User Defined', value: 'user_defined' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This Week', value: 'this_week' },
    { label: 'Last Week', value: 'last_week' },
    { label: 'This Month', value: 'this_month' },
    { label: 'Last Month', value: 'last_month' },
];

export const FILTER_PERIOD_MONTH	 = [
  { label: 'January', value: '01' },
  { label: 'February', value: '02' },
  { label: 'March', value: '03' },
  { label: 'April', value: '04' },
  { label: 'May', value: '05' },
  { label: 'June', value: '06' },
  { label: 'July', value: '07' },
  { label: 'August', value: '08' },
  { label: 'September', value: '09' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];

export const REQUEST_TYPES = [
    { label: 'Ping', value: 'ping' },
    { label: 'Post', value: 'post' }
];

export const CAMPAIGNS_POSTING_METHODS = [
    { label: 'POST', value: 'post' },
    { label: 'GET', value: 'get' },
    { label: 'XmlInPost', value: 'xmlinpost' },
    { label: 'XmlPost', value: 'xmlpost' },
    { label: 'InlineXML', value: 'inlinexml' },
    { label: 'XmlTagBase', value: 'xmltagbase' }
];

export const CAMPAIGNS_POST_HEADERS = [
    { label: 'Content-Type: application/x-www-form-urlencoded', value: 'Content-Type: application/x-www-form-urlencoded' },
    { label: 'Content-Type:text/xml; charset=utf-8', value: 'Content-Type:text/xml; charset=utf-8' },
    { label: 'Content-type: application/xml', value: 'Content-type: application/xml' },
    { label: 'Content-type: application/json', value: 'Content-type: application/json' }
];

export const CAMPAIGNS_RESPONSE_METHODS = [
    { label: 'XML', value: 'xml' },
    { label: 'HTML', value: 'html' }
];

export enum PAYMENT_MODELS {
    REVENUE_SHARING = 'rev_share',
    FIXED_PRICE = 'fixed_price'
};

export const LEAD_TYPE_PAYMENT_MODELS = [
    { label: 'Rev Share', value: 'rev_share' },
    { label: 'Fixed Price', value: 'fixed_price' }
];

export enum CLIENT_RETURNS_REJECTION_TYPES {
    RETURNED_BY_ADVERTISER = 'Returned by Advertiser',
    BAD_CONTACT_INFO = 'Bad Contact Info',
    CUSTOMER_ALREADY_PURCHASED = 'Customer already purchased',
    CUSTOMER_CLAIMS_THEY_DID_NOT_APPLY = 'Customer claims they did not apply',
    CUSTOMER_NOT_INTERESTED = 'Customer not interested',
}

export const VENDOR_LEAD_TYPE_STATUSES = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
];
export const ACTIVE_STATUS = [
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' }
];

export const CAMPAIGN_STATUS = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
]

export const VENDOR_LEAD_FLOW_STATUSES = [
    { label: 'Running', value: 'running' },
    { label: 'Paused', value: 'paused' }
];

export const CONST_UNAUTHORIZED = 'Unauthorized';

export enum NOTIFICATION_MESSAGES {
    GETTING_ALL_CAMPAIGNS_MSG = 'Getting all campaigns...',
    NOT_AUTHORIZED_MSG = 'You are not authorized for this action.',
    FAILED_TO_FETCH_ALL_CAMPAIGNS_MSG = 'Failed to fetch campaigns.',
    FAILED_TO_DELETE_CAMPAIGN_MSG = 'Failed to delete campaign.',
    FAILED_TO_DELETE_USER_MSG = 'Failed to delete user.',
    FAILED_TO_FETCH_ALL_USERS_MSG = 'Failed to fetch all users.',
    FAILED_TO_FETCH_CAMPAIGN_MSG = 'Failed to fetch campaign.',
    FAILED_TO_SAVE_USER_MSG = 'Failed to save user.',
    FAILED_TO_FETCH_ALL_ROLES_MSG = 'Failed to fetch roles.',
    FAILED_TO_FETCH_ALL_SETTINGS_MSG = 'Failed to fetch settings',
    GETTING_ALL_USERS_MSG = 'Getting all users...',
    GETTING_USER_DETAILS_MSG = 'Getting user details...',
    SAVING_USER_DETAILS_MSG = 'Saving user details...',
    USER_DETAILS_SAVED_SUCCESS_MSG = 'User details saved successfully!',
    DELETING_USER_MSG = 'Deleting user...',
    USER_DELETED_SUCCESS_MSG = 'User deleted successfully!',
    DELETING_CAMPAIGN_MSG = 'Deleting campaign...',
    CAMPAIGN_DELETED_SUCCESS_MSG = 'Campaign deleted successfully!',
    GETTING_CAMPAIGN_DETAILS_MSG = 'Getting campaign details...',
    SAVING_CAMPAIGN_DETAILS_MSG = 'Saving campaign...',
    CAMPAIGN_DETAILS_SAVED_SUCCESS_MSG = 'Campaign saved successfully.',
    FAILED_TO_SAVE_CAMPAIGN_MSG = 'Failed to save campaign.',
    GETTING_PROFILE_TABS_MSG = 'Getting profile tabs',
    GETTING_ENTITY_SETTINGS_MSG = 'Getting entity settings',
    GETTING_LEAD_TYPES_MSG = 'Getting lead types',
    GETTING_ROLES_MSG = 'Getting roles',
    GETTING_SETTINGS_MSG = 'Getting settings',
    DUPLICATE_LEAD_TYPES_FOUND_MSG = 'Duplicate lead types found.',
    GETTING_KPI_SUMMARY = 'Getting KPI Summary',
    GETTING_INBOUND_REPORT_MSG = 'Getting inbound report',
    FAILED_TO_FETCH_INBOUND_REPORT_MSG = 'Failed to get inbound report',
    UPDATING_REVENUEMATRIX_REPORT_MSG = 'Updating The Revenue Matrix Report',
    GETTING_REVENUEMATRIX_REPORT_MSG = 'Getting revenue matrix report',
    FAILED_TO_FETCH_REVENUEMATRIX_REPORT_MSG = 'Failed to get revenue matrix report',
    UPDATING_RETURNSUITE_REPORT_MSG = 'Updating the return suite snalysis report',
    GETTING_RETURNSUITE_REPORT_MSG = 'Getting revenue return suite snalysis report',
    FAILED_TO_FETCH_RETURNSUITE_REPORT_MSG = 'Failed to get return suite snalysis report',
    GETTING_OUTBOUND_REPORT_MSG = 'Getting outbound report',
    FAILED_TO_FETCH_OUTBOUND_REPORT_MSG = 'Failed to get outbound report',
    GETTING_CLIENT_HANDLERS_MSG = 'Getting client handlers',
    FAILED_TO_FETCH_CLIENT_HANDLERS_MSG = 'Failed to fetch client handlers.',
    PROCESSING_RETURNS_FILE = 'Processing returns file...',
    FAILED_TO_PROCESS_RETURNS_FILE_MSG = 'Failed to process returns file.',
    GETTING_COMMISSIONS_REPORT_MSG = 'Getting commissions report',
    FAILED_TO_FETCH_COMMISSIONS_REPORT_MSG = 'Failed to get commissions report',
    GETTING_REQUESTS_MSG = 'Getting requests',
    FAILED_TO_FETCH_REQUESTS_MSG = 'Failed to fetch requests',
    FAILED_TO_CREATE_LEADS_MSG = 'Failed to create leads',
    CREATING_LEADS = 'Creating leads...',
    FAILED_TO_SEND_RETURNS_EMAIL_MSG = 'Failed to send returns email',
    SENDING_RETURNS_EMAIL = 'Sending returns email...',
    SENDING_RETURNS_EMAIL_SUCCESS_MSG = 'Returns email sent successfully.',
    GETTING_EDUCATION_REPORTS_MSG = 'Getting education reports',
    FAILED_EDUCATION_REPORTS_MSG = 'Failed to get education reports',
    GETTING_EDUCATION_CAMPAIGNS_MSG = 'Getting education campaigns',
    FAILED_EDUCATION_CAMPAIGNS_MSG = 'Failed to get education campaigns',
}
