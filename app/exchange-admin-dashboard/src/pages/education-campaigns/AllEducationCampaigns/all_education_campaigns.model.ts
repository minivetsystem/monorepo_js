interface Buyer {
    _id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    primary_phone: string;
    secondary_phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    website: string;
    user_status: string;
    is_call_center: boolean;
    accept_returns: boolean;
    is_hide_all_leads_reports: boolean;
    is_io_received: boolean;
    vendor_lead_quality: string;
    lead_flow_status: string;
    is_allowed_by_ews: boolean;
    is_trusted_form_claim_enabled: boolean;
    payment_method: string;
    is_return_reminder_email: boolean;
    prepays: boolean;
    main_email_list: string;
    tech_email_list: string;
    role: string;
    added_on: string;
    added_by: string;
    updated_on: string;
    updated_by: string;
    vendor_vortex: string[];
    lead_type_settings: string[];
    leadhoop_partner_code: string;
    leadhoop_partner_password: string;
    leadhoop_partner_username: string;
    leadhoop_service_url: string;
}

interface Vendor {
    client_vortex: any[];
    per_min_ping_caps: any[];
    vendor_subids: any[];
    _id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    primary_phone: string;
    secondary_phone: string;
    address: string;
    city: string;
    zip: string;
    country: string;
    website: string;
    user_status: string;
    is_call_center: boolean;
    accept_returns: boolean;
    is_hide_all_leads_reports: boolean;
    is_io_received: boolean;
    vendor_lead_quality: string;
    lead_flow_status: string;
    is_allowed_by_ews: boolean;
    is_trusted_form_claim_enabled: boolean;
    payment_method: string;
    is_return_reminder_email: boolean;
    prepays: boolean;
    main_email_list: string;
    tech_email_list: string;
    role: string;
    added_on: string;
    added_by: string;
    updated_on: string;
    updated_by: string;
    vendor_vortex: string[];
    lead_type_settings: string[];
    leadhoop_partner_code: string;
    leadhoop_partner_password: string;
    leadhoop_partner_username: string;
    leadhoop_service_url: string;
}

export interface EducationCampaignsReport {
    _id: string;
    name: string;
    active: boolean;
    start_date: string;
    commission_percentage: number;
    buyers: Buyer[];
    vendor: Vendor;
    __v: number;

}

export interface ReportPrams {
        start_date: string;
        end_date: string;
        limit: number;
        skip: number;
}

export interface FromDataParams {
    campaign_id: string;
    name: string;
    active: boolean;
    start_date: string;
    commission_percentage: number;
    buyers: string[];
    vendor: string;
  }

  export interface CampaignData {
    name: string;
    active: boolean;
    start_date: string;
    commission_percentage: number;
    buyers: string[]; 
    vendor: string;
    campaign_id?: string;
  }

 export interface FieldRefs {
    [key: string]: React.RefObject<HTMLInputElement>;
  }

export interface RowData {
    educationReports: EducationCampaignsReport[] | null;
}