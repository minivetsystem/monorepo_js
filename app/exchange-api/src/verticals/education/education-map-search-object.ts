/*
* Service to map the incoming request data to take the shape required
* to perform a querty with LeadHoop
* */
import { Injectable } from "@nestjs/common";

/*
* Import user created modules
* */
import { CreateEducationSearchDto } from "./dto/create-education-search.dto";
import { User } from "../../users/schemas";


@Injectable()
export class EducationMapSearchObject {

  private pushArrayToQuery(query: string [], values: string[], key: string) {
    values.map((each) => query.push(`${key}=${each}`)
    );
    return query;
  }


  public map(searchQuery: CreateEducationSearchDto, buyer: User) {

    let query: string[] = [];

    /*
    * Mapping root level properties
    * */
    query.push(`partner_code=${buyer.leadhoop_partner_code}`);
    if (searchQuery.test) query.push(`test=${searchQuery.test}`);
    if (searchQuery.subid) query.push(`subid=${searchQuery.subid}`);
    if (searchQuery.subid2) query.push(`subid2=${searchQuery.subid2}`);
    if (searchQuery.subid3) query.push(`subid3=${searchQuery.subid3}`);
    if (searchQuery.subid4) query.push(`subid4=${searchQuery.subid4}`);

    // Adding properties for the lead object
    if (searchQuery.lead.phone) query.push(`lead[phone1]=${searchQuery.lead.phone}`);
    if (searchQuery.lead.email) query.push(`lead[email]=${searchQuery.lead.email}`);
    if (searchQuery.lead.ip) query.push(`lead[ip]=${searchQuery.lead.ip}`);
    if (searchQuery.lead.firstname) query.push(`lead[firstname]=${searchQuery.lead.firstname}`);
    if (searchQuery.lead.lastname) query.push(`lead[lastname]=${searchQuery.lead.lastname}`);
    if (searchQuery.lead.gender) query.push(`lead[gender]=${searchQuery.lead.gender}`);
    if (searchQuery.lead.age) query.push(`lead[age]=${searchQuery.lead.age}`);
    if (searchQuery.lead.dob) query.push(`lead[dob]=${searchQuery.lead.dob}`);
    if (searchQuery.lead.besttime_contact) query.push(`lead[besttime_contact]=${searchQuery.lead.besttime_contact}`);
    if (searchQuery.lead.service_leadid) query.push(`lead[service_leadid]=${searchQuery.lead.service_leadid}`);
    if (searchQuery.lead.source_service_leadid) query.push(`lead[source_service_leadid]=${searchQuery.lead.source_service_leadid}`);
    if (searchQuery.lead.service_trusted_form) query.push(`lead[service_trusted_form]=${searchQuery.lead.service_trusted_form}`);
    if (searchQuery.lead.source_service_trusted_form) query.push(`lead[source_service_trusted_form]=${searchQuery.lead.source_service_trusted_form}`);
    if (searchQuery.lead.signup_url) query.push(`lead[signup_url]=${searchQuery.lead.signup_url}`);
    if (searchQuery.lead.consent_url) query.push(`lead[consent_url]=${searchQuery.lead.consent_url}`);

    // Adding properties for the lead_address object
    if (searchQuery.lead_address.address) query.push(`lead_address[address]=${searchQuery.lead_address.address}`);
    if (searchQuery.lead_address.address2) query.push(`lead_address[address2]=${searchQuery.lead_address.address2}`);
    if (searchQuery.lead_address.zip) query.push(`lead_address[zip]=${searchQuery.lead_address.zip}`);
    if (searchQuery.lead_address.city) query.push(`lead_address[city]=${searchQuery.lead_address.city}`);
    if (searchQuery.lead_address.state) query.push(`lead_address[state]=${searchQuery.lead_address.state}`);

    // Adding properties for the lead_education object
    if (searchQuery.lead_education.grad_year) query.push(`lead_education[grad_year]=${searchQuery.lead_education.grad_year}`);
    if (searchQuery.lead_education.education_level_id) query.push(`lead_education[education_level_id]=${searchQuery.lead_education.education_level_id}`);
    if (searchQuery.lead_education.start_date) query.push(`lead_education[start_date]=${searchQuery.lead_education.start_date}`);
    if (searchQuery.lead_education.school_type) query.push(`lead_education[school_type]=${searchQuery.lead_education.school_type}`);
    if (searchQuery.lead_education.level_interest) query.push(`lead_education[level_interest]=${searchQuery.lead_education.level_interest}`);
    if (searchQuery.lead_education.area_of_studies) query = this.pushArrayToQuery(query, searchQuery.lead_education.area_of_studies, "lead_education[area_of_studies][]");
    if (searchQuery.lead_education.program_names) query = this.pushArrayToQuery(query, searchQuery.lead_education.program_names, "lead_education[program_names][]");

    // Adding properties for the lead_background object
    if (searchQuery.lead_background.military_type) query.push(`lead_background[military_type]=${searchQuery.lead_background.military_type}`);
    if (searchQuery.lead_background.us_citizen) query.push(`lead_background[us_citizen]=${searchQuery.lead_background.us_citizen}`);
    if (searchQuery.lead_background.internet_pc) query.push(`lead_background[internet_pc]=${searchQuery.lead_background.internet_pc}`);
    if (searchQuery.lead_background.teaching_license) query.push(`lead_background[teaching_license]=${searchQuery.lead_background.teaching_license}`);
    if (searchQuery.lead_background.rn_license) query.push(`lead_background[rn_license]=${searchQuery.lead_background.rn_license}`);
    if (searchQuery.lead_background.enrolled_status) query.push(`lead_background[enrolled_status]=${searchQuery.lead_background.enrolled_status}`);

    // Finally return the query
    return query.join('&');
  }
}
