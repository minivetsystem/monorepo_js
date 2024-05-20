import { OutboundPingPostResultDetailsDto } from "./outbound-ping-post-result-details.dto";
import { OutboundPingPostResultClientDto } from "./outbound-ping-post-result-client.dto";

export class OutboundPingPostResultReportDto {

    data: OutboundPingPostResultDetailsDto[]

    gross_revenue: string;

    returned_revenue: string;

    net_revenue: string;

    total_cost: string;

    returned_cost: string;

    net_cost: string;

    net_profit: string;

    avg_revenue_per_lead: string;

    clients: OutboundPingPostResultClientDto [];

    constructor() {
      this.data = [];
      this.clients = [];
    }
  }