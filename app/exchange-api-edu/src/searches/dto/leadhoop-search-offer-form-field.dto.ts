import { LeadHoopSearchOfferFormFieldListItem } from "./leadhoop-search-offer-form-field-listitem.dto";

export class LeadHoopSearchOfferFormField {
  id: string;
  label_text: string;
  name: string;
  form_field_type_name: string;
  post_key: string;
  element_id: string;
  sequence: string;
  prefilled_value: string;
  required: boolean;
  form_list_items: LeadHoopSearchOfferFormFieldListItem[];

}
