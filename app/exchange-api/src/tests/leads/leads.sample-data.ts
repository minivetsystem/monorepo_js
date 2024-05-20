import { Types } from 'mongoose';

/**
 * This const defines the default data for lead type.
 */
export const leadTypeDefault = {
  lead_type_id: 5,
  lead_type: 'Auto Finance',
};

/**
 * This const defines the default campaign data for testing.
 */
export const campaignDefault = {
  _id: "63ec55d2f0afdacb22b34e07",
  campaign_id: '',
  campaign_name: 'First Campaign',
  public_name: 'First Public Campaign',
};

/**
 * This const defines the default user data for testing.
 */
export const userDefault = {
  first_name: 'Eliès',
  last_name: 'Karpychev',
  email_id: 'lkarpychev0@goo.ne.jp',
  username: 'ekarpychev0',
  password: '6DFWZ3cVVQ',
  phone: '779-665-6472',
  address: 'PO Box 40818',
};

/**
 * This refers to the default vendor data which is required for testing.
 */
export const vendorDefault = {
  _id: new Types.ObjectId(),
  vendor_bid_type: 'Exclusive',
  is_call_center: false,
  accepts_returns: false,
  vendor_type: 'API',
  is_hide_leads_report: false,
  is_io_received: true,
  vendor_lead_quality: 'Premium',
  account_status: 'active',
  sales_person_id: null,
  lead_flow_status: 'Pause',
  allowed_by_ews: false,
  vehicle_api_enabled: false,
  universal_lead_id: '855248613-X',
  is_iq_quality_score_enabled: false,
  is_trust_form_certificate_claim_enabled: true,
  main_email: 'mlawlan0@hc360.com',
  tech_email: 'chaylands0@ycombinator.com',
};

/**
 * This refers to the default data for vendor campaign which is required for testing.
 */
export const vendorCampaignDefault = {
  _id: new Types.ObjectId(),
  status: 'Active',
  lead_flow_status: 'Running',
  payment_model_id: '',
  rev_share: '',
  vendor_min_payout_cap: '',
  vendor_max_payout_cap: '',
  tcpa_text: '',
  is_tcpa_text_active: true,
  daily_accepted_cap: '',
  is_daily_auto_verify_email: true,
  is_bla_dnc_active: true,
  is_litigator_active: false,
  is_blacklist_tcpa_litigator_active: true,
  is_enable_auto_resubmit: true,
};

/**
 * This refers to the default client data which is required for testing.
 */
export const clientDefault = {
  _id: new Types.ObjectId(),
  status: "active",
  lead_flow_status: "Running",
  allowed_by_ews: true,
  bad_login_count: 74,
  main_email: "vauckland0@kickstarter.com",
  tech_email: "cemanulsson0@liveinternet.ru",
  is_return_reminder_email: false,
  is_prepays: true,
  payment_terms: "morbi non lectus aliquam sit amet diam in magna bibendum imperdiet nullam orci pede",
  invoice_notes: null,
  payment_method: "Wire",
};

/**
 * This refers to the default data for client campaign which is required for testing.
 */
export const clientCampaignDefault = {
  _id: new Types.ObjectId(),
  client_class_name: "Josepha Magauran",
  per_min_ping_cap: "",
  monthly_credit_limit: "",
  daily_credit_limit: "",
  is_accept_call_center_leads: true,
  is_sends_returns: true,
  min_accepted_quality: "",
  is_automatically_map_new_vendors: false,
  posting_method: "",
  ping_test_url: "",
  ping_live_url: "",
  post_test_url: "",
  post_live_url: "",
  post_header: "",
  response_method: "",
  tier: "",
  is_redirect_url_required: false,
  posting_time_limit: "",
  parameter1: "",
  parameter2: "",
  parameter3: "",
  parameter4: "",
  io_received_date: "2022-08-07",
  in_development_date: "2022-05-16",
  production_testing_date: "2022-09-05",
  tests_approved_date: "2022-08-16",
  vendors_mapped_date: "2023-01-07",
  made_live_date: "2022-07-20",
  numbers_confirmed_date: "2022-06-03",
  price: "",
  is_third_party_verification: true,
  is_auto_verify_numbers: false,
  is_hourly_accepted_post_cap: true,
  is_daily_ping_cap: false,
  is_tcpa_shield_active: false,
  max_revenue_limit: "",
  start_date: "2022-06-28",
  end_date: "2022-09-18",
  bidding_attempt_1: "",
  bidding_attempt_2: "",
  bidding_attempt_3: "",
  bidding_attempt_4: "",
  bidding_attempt_5: "",
  adjusted_client_margin: "",
  notes: "",
  created_date: "2023-01-17",
  updated_date: "2023-02-04",
};

export const isRequiredCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a37",
  name: "confirmation_id",
  description: "Astoria provided <Confirmation> code from corresponding ping repsonse. MUST be provided on Post, else it will be treated as a fresh Ping.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["641d828c1ec3f7f2e3a37dd8"],
  conditions: [],
  type: "Post"
}

export const isRequiredCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37dd8",
  campaign_field: "641d828b1ec3f7f2e3a37a37",
  rule: "64007f5970e8e20f15bc4144"
};

export const numberWithMinMaxCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a38",
  name: "lead_type",
  description: "Determines the type of lead. MUST be '5' for Auto Insurance",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001ad170e8e20f15bc40e4",
  rules: ["641d828c1ec3f7f2e3a37ddf"],
  conditions: []
}

export const numberWithMinMaxCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37ddf",
  campaign_field: "641d828b1ec3f7f2e3a37a38",
  rule: "64001a6070e8e20f15bc40e2",
  min: 1,
  max: 5
}

export const dateAnyCampaignField = {
  _id: "641d8d531bf2ca0852a584ca",
  name: "haveInsurance",
  description: "Indicates whether driver1 has a current auto insurance policy or not. Note: May include auto insurance policies that have expired no more than 30 days in the past.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001b1770e8e20f15bc40e5",
  rules: [],
  conditions: [
    {
      value: [1],
      fields: [
        {
          campaign_id: "63ec55d2f0afdacb22b34e07",
          field: "64001b3b70e8e20f15bc40e7",
          rules: ["641d8d531bf2ca0852a585e2"],
          name: "current_policy_start_date",
          description: "Driver1's current policy start date, in the format YYYY-MM-DD, e.g. '2020-09-02'",
          _id: "641d8d531bf2ca0852a585e0"
        }
      ]
    }
  ]
}

export const dateAnyCampaignFieldRule = {
  _id: "641d8d531bf2ca0852a585e2",
  campaign_field: "641d8d531bf2ca0852a585e0",
  rule: "6400717570e8e20f15bc4127"
}

export const dateFutureCampaignField = {
  _id: "641d8d531bf2ca0852a584ca",
  name: "haveInsurance",
  description: "Indicates whether driver1 has a current auto insurance policy or not. Note: May include auto insurance policies that have expired no more than 30 days in the past.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001b1770e8e20f15bc40e5",
  rules: [],
  conditions: [
    {
      value: [1],
      fields: [
        {
          campaign_id: "63ec55d2f0afdacb22b34e07",
          field: "64001b3b70e8e20f15bc40e7",
          rules: ["641d828c1ec3f7f2e3a37b0b"],
          name: "current_policy_expiration_date",
          description: "Driver1's current policy expiration date, in the format YYYY-MM-DD, e.g. '2021-03-03'",
          _id: "641d828c1ec3f7f2e3a37b09"
        }
      ]
    }
  ]
}

export const dateFutureCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37b0b",
  campaign_field: "641d828c1ec3f7f2e3a37b09",
  rule: "640025bc70e8e20f15bc4111"
}

export const uuidCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a3e",
  name: "universal_leadid",
  description: "Unique LeadiD as generated by LeadiD.com",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["641d828c1ec3f7f2e3a37c5a"],
  conditions: []
};

export const uuidCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37c5a",
  campaign_field: "641d828b1ec3f7f2e3a37a3e",
  rule: "6408079f380b85e2e2a4b705"
};

export const datePastCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a5a",
  name: "driver1_dob",
  description: "Driver1 date of birth, in the format YYYY-MM-DD, e.g. '1995-12-13'",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001b3b70e8e20f15bc40e7",
  rules: ["641d828c1ec3f7f2e3a37c7e"],
  conditions: []
};

export const datePastCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37c7e",
  campaign_field: "641d828b1ec3f7f2e3a37a5a",
  rule: "640071e970e8e20f15bc4128"
};

export const dateTimeWith24HourFormatCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a3f",
  name: "origination_datetime",
  description: "Date/time when lead was submitted by consumer, in format 'YYYY-MM-DD hh:mm:ss',e.g. '2021-02-17 14:47:01'",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001b3b70e8e20f15bc40e7",
  rules: ["641d828c1ec3f7f2e3a37dbf"],
  conditions: []
}

export const dateTimeWith24HourFormatCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37dbf",
  campaign_field: "641d828b1ec3f7f2e3a37a3f",
  rule: "64001b5f70e8e20f15bc40ec"
};

export const priceCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a45",
  name: "minimum_price",
  description: "Minimum price you would accept for this lead, no $ symbol or commas, e.g. '2.00' NOTE: For test leads (i.e. where lead_mode=0), our 'buyers' return very low prices (for safety). If you choose to include this optional parameter, then please set it to just '0.01' when testing to ensure you receive the expected responses. WARNING: Setting a minimum_price will cause you to sell fewer leads!",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001ad170e8e20f15bc40e4",
  rules: ["641d828c1ec3f7f2e3a37dbb"],
  conditions: []
}

export const priceCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37dbb",
  campaign_field: "641d828b1ec3f7f2e3a37a45",
  rule: "64080882380b85e2e2a4b70b"
}

export const urlCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a55",
  name: "xxtrustedformcerturl",
  description: "Trusted form URL.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["641d828c1ec3f7f2e3a37d46"],
  conditions: []
}

export const urlCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37d46",
  campaign_field: "641d828b1ec3f7f2e3a37a55",
  rule: "640805ab380b85e2e2a4b6fd"
}

export const zipCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a4a",
  name: "zip",
  description: "Valid 5-digit US Zip Code. Can be used when lead_mode=0 to influence test results.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001ad170e8e20f15bc40e4",
  rules: ["641d828c1ec3f7f2e3a37d05"],
  conditions: []
}

export const zipCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37d05",
  campaign_field: "641d828b1ec3f7f2e3a37a4a",
  rule: "6408071b380b85e2e2a4b702"
}

export const objectIdCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a3a",
  name: "vendor_id",
  description: "This is the VID code you were provided by Astoria; if you do not know it, please contact us.Please ensure you are using the correct code, otherwise your leads may be credited to another partner!",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["641d828c1ec3f7f2e3a37d27"],
  conditions: []
}

export const objectIdCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37d27",
  campaign_field: "641d828b1ec3f7f2e3a37a3a",
  rule: "6408053e380b85e2e2a4b6fa"
}

export const ipaddressCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a41",
  name: "ipaddress",
  description: "Applicants IP address, e.g. '192.168.1.179'",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["641d828c1ec3f7f2e3a37cf1"],
  conditions: []
}

export const ipaddressCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37cf1",
  campaign_field: "641d828b1ec3f7f2e3a37a41",
  rule: "6408081f380b85e2e2a4b708"
}

export const booleanCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a50",
  name: "bankruptcy",
  description: "Has primary applicant filed for bankruptcy in the past 7 years?",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001b1770e8e20f15bc40e5",
  rules: ["641d828c1ec3f7f2e3a37d23"],
  conditions: []
}

export const booleanCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37d23",
  campaign_field: "641d828b1ec3f7f2e3a37a50",
  rule: "6406af996cb2f13f663706f4"
}

export const numberWithFixedLengthCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a4b",
  name: "phone_last_4",
  description: "Last 4 digits of primary_phone. REQUESTED ON PING ONLY! REQUIRED by one of our largest buyers.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001ad170e8e20f15bc40e4",
  rules: ["641d828c1ec3f7f2e3a37dec"],
  conditions: []
}

export const numberWithFixedLengthCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37dec",
  campaign_field: "641d828b1ec3f7f2e3a37a4b",
  rule: "6400255e70e8e20f15bc4110",
  length: 4
}

export const usstateCampaignField = {
  "_id": "641d828b1ec3f7f2e3a37a68",
  "name": "driver2_hasTAVCs",
  "description": "Does Driver2 have any Tickets, Accidents, Violations or Claims?",
  "campaign": "63ec55d2f0afdacb22b34e07",
  "field": "64001b1770e8e20f15bc40e5",
  "rules": [],
  "conditions": [
    {
      "value": [1],
      "fields": [
        {
          "campaign_id": "63ec55d2f0afdacb22b34e07",
          "field": "64001d8070e8e20f15bc40f4",
          "rules": [],
          "name": "driver2_numOfIncidents",
          "description": "The number of incidents to report for driver2.",
          "conditions": [
            {
              "value": [
                3
              ],
              "fields": [
                {
                  "campaign_id": "63ec55d2f0afdacb22b34e07",
                  "field": "64001d8070e8e20f15bc40f4",
                  "rules": [],
                  "name": "driver2_incidentType2",
                  "description": "The type of incident to report for driver2.",
                  "conditions": [
                    {
                      "value": [
                        3
                      ],
                      "fields": [
                        {
                          "campaign_id": "63ec55d2f0afdacb22b34e07",
                          "field": "640024fc70e8e20f15bc410a",
                          "rules": ["641d828c1ec3f7f2e3a37cbe"],
                          "name": "driver2_violation2State",
                          "description": "State in which violation was committed. Two captial letters (NY, CA, etc).",
                          "_id": "641d828c1ec3f7f2e3a37c9d"
                        }
                      ]
                    }
                  ],
                  "_id": "641d828c1ec3f7f2e3a37c8a"
                },
              ]
            },
          ],
          "_id": "641d828c1ec3f7f2e3a37c89"
        }
      ]
    }
  ]
}

export const usstateCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37cbe",
  campaign_field: "641d828c1ec3f7f2e3a37c9d",
  rule: "6400267170e8e20f15bc4115",
}

export const emailCampaignField = {
  _id: "641d828b1ec3f7f2e3a37a46",
  name: "email",
  description: "Email address",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["641d828c1ec3f7f2e3a37d41"],
  conditions: [],
  type: "Post"
}

export const emailCampaignFieldRule = {
  _id: "641d828c1ec3f7f2e3a37d41",
  campaign_field: "641d828b1ec3f7f2e3a37a46",
  rule: "640802e8380b85e2e2a4b6f3",
}

export const phoneNumberCampaignField = {
  _id: "6422da9b23a66c9e772304e1",
  name: "secondary_phone",
  description: "Secondary phone number, exactly 10 digits (3 For PhoneAreaCode, 3 For PhoneExchange and 4 For PhoneSuffix ) no (), -, or spaces",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["6422da9c23a66c9e772305cd"],
  conditions: [],
  type: "Post"
}

export const phoneNumberCampaignFieldRule = {
  _id: "6422da9c23a66c9e772305cd",
  campaign_field: "6422da9b23a66c9e772304e1",
  rule: "6408046c380b85e2e2a4b6f7",
}

export const leadIdCampaignField = {
  _id: "6422da9b23a66c9e772304d6",
  name: "universal_leadid",
  description: "Unique LeadiD as generated by LeadiD.com",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["6422da9c23a66c9e77230617"],
  conditions: []
}

export const leadIdCampaignFieldRule = {
  _id: "6422da9c23a66c9e77230617",
  campaign_field: "6422da9b23a66c9e772304d6",
  rule: "6405a97f6d6b75d733c9818a",
}

export const multipleValuesSingleChoiceCampaignField = {
  _id: "6422da9b23a66c9e772304d8",
  name: "origination_timezone",
  description: "The timezone for the date/time passed in origination_datetime.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "64001d8070e8e20f15bc40f4",
  rules: ["6422da9c23a66c9e772305bc"],
  conditions: []
}

export const multipleValuesSingleChoiceCampaignFieldRule = {
  _id: "6422da9c23a66c9e772305bc",
  campaign_field: "6422da9b23a66c9e772304d8",
  rule: "6405c7426d6b75d733c9819e",
  values: [
    { value: 1, label: "EST / EDT" },
    { value: 2, label: "CST / CDT" },
    { value: 3, label: "MST / MDT" },
    { value: 4, label: "PST / PDT" }]
}

export const confirmationIdCampaignField = {
  _id: "6422da9b23a66c9e772304cf",
  name: "confirmation_id",
  description: "Astoria provided <Confirmation> code from corresponding ping repsonse. MUST be provided on Post, else it will be treated as a fresh Ping.",
  campaign: "63ec55d2f0afdacb22b34e07",
  field: "640024fc70e8e20f15bc410a",
  rules: ["6422da9c23a66c9e772305a4"],
  conditions: [],
  type: "Post"
}

export const confirmationIdCampaignFieldRule = {
  _id: "6422da9c23a66c9e772305a4",
  campaign_field: "6422da9b23a66c9e772304cf",
  rule: "6408159d380b85e2e2a4b755",
}
