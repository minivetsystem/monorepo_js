export const rules = [{
    "_id": "64001a6070e8e20f15bc40e2",
    "description": "Numeric value between a range",
    "example": "1, 2",
    "type": "NumberWithMinMax"
  },{
    "_id": "64001b5f70e8e20f15bc40ec",
    "format": "YYYY-MM-DD hh:mm:ss",
    "description": "Date & time",
    "example": "2023-10-21 08:12:34",
    "type": "DatetimeWith12HourFormat"
  },{
    "_id": "6400255e70e8e20f15bc4110",
    "type": "NumberWithFixedLength",
    "description": "Numeric value with fixed length",
    "example": "12345"
  },{
    "_id": "640025bc70e8e20f15bc4111",
    "format": "YYYY-MM-DD",
    "description": "Future Date only",
    "example": "2023-09-02",
    "type": "DateFuture"
  },{
    "_id": "6400267170e8e20f15bc4115",
    "type": "USState",
    "format": "TwoCapitalLetters",
    "description": "US State two capital letters",
    "example": "NY, CA e.t.c"
  },{
    "_id": "6400272b70e8e20f15bc4118",
    "type": "Integer",
    "description": "No decimal point, only integer value",
    "example": "5000"
  },{
    "_id": "6400717570e8e20f15bc4127",
    "format": "YYYY-MM-DD",
    "description": "Any Date only",
    "type": "DateAny",
    "example": "2023-10-11"
  },{
    "_id": "640071e970e8e20f15bc4128",
    "type": "DatePast",
    "format": "YYYY-MM-DD",
    "description": "Past Date only",
    "example": "2020-10-11"
  },{
    "_id": "64007f5970e8e20f15bc4144",
    "description": "Field is required.",
    "type": "IsRequired"
  },{
    "_id": "6400802570e8e20f15bc4145",
    "type": "IsHiddenInSpec",
    "description": "This field will be hidden in the specs."
  },{
    "_id": "64018e795c41519539b84cf3",
    "type": "YearWithMinMax",
    "format": "YYYY",
    "description": "Only Year",
    "example": "2021"
  },{
    "_id": "6405a97f6d6b75d733c9818a",
    "type": "LeadID",
    "description": "3rd party LeadID Validation",
    "example": "3497fcb5-2fe5-4b31-b622-4402637aa108"
  },{
    "_id": "6405b3ea6d6b75d733c9818e",
    "type": "BlacklistAliancePhone",
    "description": "3rd party Blacklist Aliance Phone Validation",
    "example": ""
  },{
    "_id":  "6405b4266d6b75d733c98190",
    "type": "BlacklistAlianceTCPALitigatorPhone",
    "description": "3rd party Blacklist Aliance TCPA Litigator Phone Validation",
    "example": ""
  },{
    "_id": "6405c7426d6b75d733c9819e",
    "type": "MultipleValuesSingleChoice",
    "description": "This validation rule is for dropdowns, it checks if the value is one of the values in the range.",
    "example": ""
  },{
    "_id": "6406af996cb2f13f663706f4",
    "type": "Boolean",
    "description": "Only contains true/false",
    "example": ""
  },{
    "_id": "640802e8380b85e2e2a4b6f3",
    "type": "Email",
    "description": "This rule validates email address"
  },{
    "_id": "6408046c380b85e2e2a4b6f7",
    "type": "Phonenumber",
    "description": "phone number, exactly 10 digits (3 For PhoneAreaCode, 3 For PhoneExchange and 4 For PhoneSuffix ) no (), -, or spaces",
    "example": ""
  },{
    "_id": "6408053e380b85e2e2a4b6fa",
    "type": "ObjectId",
    "description": "A valid MongoDB ObjectId"
  },{
    "_id": "640805ab380b85e2e2a4b6fd",
    "type": "URL",
    "description": "A valid URL"
  },{
    "_id": "6408071b380b85e2e2a4b702",
    "type": "Zip",
    "description": "Valid 5-digit US Zip Code. Can be used when lead_mode=0 to influence test results."
  },{
    "_id": "6408079f380b85e2e2a4b705",
    "type": "UUID",
    "description": "A valid UUID v4 string"
  },{
    "_id": "6408081f380b85e2e2a4b708",
    "type": "IP",
    "description": "A valid IPv4 string"
  },{
    "_id": "64080882380b85e2e2a4b70b",
    "type": "Price",
    "description": "no $ symbol or commas, e.g. 2.00"
  },{
    "_id": "6408159d380b85e2e2a4b755",
    "type": "ConfirmationCode",
    "description": "This rule is used to validate the confirmation code"
  },{
    "_id": "64083521380b85e2e2a4b7e2",
    "type": "InternalBlacklist",
    "description": "Internal blacklist aliance phone validation."
  }]
  