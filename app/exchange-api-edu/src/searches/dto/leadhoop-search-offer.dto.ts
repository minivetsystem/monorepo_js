import { LeadHoopSearchOfferFormField } from "./leadhoop-search-offer-form-field.dto";
import { LeadHoopSearchOfferCampus } from "./leadhoop-search-offer-campus.dto";

export class LeadHoopSearchOfferDto {
  id: number;
  name: string;
  short_description: string;
  description: string;
  logo_url: string;
  offer_type: string;
  is_exclusive: boolean;
  payout: string;
  form_fields: LeadHoopSearchOfferFormField[]
  campuses: LeadHoopSearchOfferCampus[]
}
