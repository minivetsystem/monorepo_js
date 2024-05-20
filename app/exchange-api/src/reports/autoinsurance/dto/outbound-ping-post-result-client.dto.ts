export class OutboundPingPostResultClientDto {
    client_id: string;

    client_name: string;

    total_leads: number;

    vendor_payout: string;

    total_price: string;

    return_leads: number;

    return_lead_revenue_lost: string;

    vendor_net_total_payout: string;

    client_net_total_leads: number;

    client_net_total_price: string;

    net_average: string;

    margin: string;

    margin_percent: string;

    constructor() {
        this.total_leads = 0;
        this.return_leads = 0;
        this.client_net_total_leads = 0;
    }
}