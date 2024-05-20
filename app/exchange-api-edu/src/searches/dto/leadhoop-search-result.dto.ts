import { LeadHoopSearchOfferDto } from "./leadhoop-search-offer.dto";

export class LeadHoopSearchResultDto {
    success: boolean
    processing_done: boolean
    offers: LeadHoopSearchOfferDto[]
}
