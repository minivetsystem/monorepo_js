export class OutboundClientPingPostResultReportDto {

    id: number;

    vendor_id: string;

    vendor_name: string;

    client_id: string;

    client_name: string;

    campaign_id: string;

    campaign_name: string;

    lead_type: string;

    client_status: string;

    error: string;

    count: number;

    min_ping_time: number;

    max_ping_time: number;

    avg_ping_time: number;

    min_bid_price: number;

    max_bid_price: number;

    avg_bid_price: number;

  }