import { Campaign } from "../campaigns/schemas";
import { Bid } from "../verticals/autoinsurance/schemas";

export interface IAutoInsuranceClient {
  execute: (request: any, bid: Bid, campaign: Campaign) => Promise<Bid>;
}
