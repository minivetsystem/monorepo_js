



export interface ResultRequest {

    _id: string;
    search_id: {
        _id: string;
        education_campaign_id: string;
        test: boolean;
        subid: string;
        subid2: string;
        subid3: string;
        subid4: string;
        lead: {
            phone: string;
            email: string;
            ip: string;
            gender: string;
            age: number;
            dob: string;
            besttime_contact: string;
            service_leadid: string;
            source_service_leadid: string;
            service_trusted_form: string;
            source_service_trusted_form: string;
            signup_url: string;
            consent_url: string;
        };
        lead_address: {
            address: string;
            address2: string;
            zip: number;
            city: string;
            state: string;
        };
        lead_education: {
            grad_year: number;
            education_level_id: string;
            start_date: string;
            school_type: number;
            level_interest: string;
            area_of_studies: string[];
            program_names: string[];
        };
        lead_background: {
            military_type: string;
            us_citizen: string;
            internet_pc: string;
            teaching_license: string;
            rn_license: string;
            enrolled_status: string;
        };
        search_response: {
            search_id: number;
            timestamp: string;
            buyer: string;
        }[];
        timestamp: string;
        __v: number;
    };
    success: boolean;
    processing_done: boolean;
    offers: {
        buyer: string;
        result_id: number;
        details: {
            name: string;
            logo_url: string;
            external_name: string;
            offer_type: string;
            description: string;
            short_description: string;
            identifier: number;
            is_warm_transfer: boolean;
            is_exclusive: boolean;
            internal_offer_id: number;
            internal_advertiser_id: number;
            form_fields: {
                id: number;
                name: string;
                prefilled_value: string;
                form_field_type_name: string;
                post_key: string;
                required: {
                    type: string;
                    conditions: {
                        program_ids: number[];
                    }[];
                };
                label_text: string;
                sequence: number;
                form_list_items: any;
            }[];
            campuses: {
                id: number;
                name: string;
                school_type: string;
                programs: {
                    id: number;
                    name: string;
                    payout: string;
                    estimated_payout: boolean;
                    degree_name: string;
                }[];
            }[];
        };
        expires_at: string;
    }[];
    timestamp: string;
    __v: number;
}

export interface ResultResponce {
    buyer: string;
    result_id: number;
    details: OfferDetails;
}

interface OfferDetails {
    name: string;
    logo_url: string;
    external_name: string;
    offer_type: string;
    description: string;
    short_description: string;
    identifier: number;
    is_warm_transfer: boolean;
    is_exclusive: boolean;
    internal_offer_id: number;
    internal_advertiser_id: number;
    form_fields: FormField[];
}

interface FormField {
    id: number;
    name: string;
    prefilled_value: string;
    form_field_type_name: string;
    post_key: string;
    required: RequiredField;
    label_text: string;
    sequence: number;
    form_list_items: any; // Change 'any' to specific type if needed
}

interface RequiredField {
    type: string;
    conditions: Condition[];
}

interface Condition {
    program_ids: number[];
}

export interface ReportPrams {
    start_date: string;
    end_date: string;
    limit: number;
    skip: number;
    search_id:string;
}



export interface RowData {
resultRequest: ResultRequest | null;
resultResponce:  ResultResponce | null;
}

export interface Props {
    resultRequests: ResultRequest[] | null;
}