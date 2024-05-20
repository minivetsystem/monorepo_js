
export interface EducationReport {
    _id: string,
    education_campaign_id: string,
    test: boolean,
    lead: {
        phone: string,
        email: string,
        ip: string,
        gender: string,
        age: number,
        dob: string,
        service_leadid: string,
        signup_url: string
    },
    lead_address: {
        address: string,
        address2: string,
        zip: number,
        city: string,
        state: string
    },
    lead_education: {
        grad_year: number,
        education_level_id: string,
        start_date: string,
        school_type: number
    },
    search_response?: SearchResult,
    timestamp: string,
    __v: number
}

export interface ReportPrams {
        start_date: string;
        end_date: string;
        limit: number;
        skip: number;
}

export interface SearchResult {
    search_response?: {
        search_id: number;
        timestamp: string;
        buyer: string;
    }[];
}

export interface RowData {
    educationReport: EducationReport | null;
    searchResponse: SearchResult | null;
}

export interface Props {
    educationReports: EducationReport[] | null;
}