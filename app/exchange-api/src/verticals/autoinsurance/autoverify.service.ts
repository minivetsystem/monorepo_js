import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class AutoVerifyService {

    constructor(
        private configService: ConfigService,
        private settingsService: SettingsService
      ) { }

  @Cron('0 0 * * *')
  async handleCron() {

    /* const perDayLeads = await this.leadModel.aggregate([
        { $match: {
            lead_time: {
                $gt: new Date(Date.now() - 24*60*60 * 1000)
              }
        } }, 
        {
            $lookup: {
              from: 'incomingrequests',
              localField: '_id',
              foreignField: 'lead',
              as: 'request'
            }
          },
          {
            $unwind: {
              path: "$request",
              preserveNullAndEmptyArrays: true
            }
          },
          { $match: { 'request.request_type': 'Post' } },
          {
            $lookup: {
              from: 'incomingrequests',
              localField: 'request.ping_request',
              foreignField: '_id',
              as: 'request.ping_request'
            }
          },
          {
            $unwind: {
              path: "$request.ping_request",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'bids',
              localField: 'request.ping_request.bids',
              foreignField: '_id',
              as: 'request.ping_request.bids'
            }
          },
          {
            $unwind: {
              path: "$request.ping_request.bids",
              preserveNullAndEmptyArrays: true
            }
          },
          { $match: { 'request.ping_request.bids.confirmation_code': { $ne: '' } } },
          { 
             $lookup: {
              from: 'users',
              localField: 'request.vendor',
              foreignField: '_id',
              as: 'request.vendor'
            }
          },
          {
            $unwind: {
              path: "$request.vendor",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'leadtypes',
              localField: 'request.lead_type',
              foreignField: '_id',
              as: 'request.lead_type'
            }
          },
          {
            $unwind: {
              path: "$request.lead_type",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'leads',
              as: 'client'
            }
          },
          {
            $unwind: {
              path: "$client",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $lookup: {
              from: 'campaigns',
              localField: 'client.campaign',
              foreignField: '_id',
              as: 'client.campaign'
            }
          },
          {
            $unwind: {
              path: "$client.campaign",
              preserveNullAndEmptyArrays: true
            }
          },
          {
            $project: {
              _id: 1,
              lead_type: '$request.lead_type.lead_type',
              ping_request: '$request.ping_request._id',
              bids: {
                _id: '$request.ping_request.bids._id',
                client_price: '$request.ping_request.bids.client_price',
                vendor_price: '$request.ping_request.bids.vendor_price',
                revenue_share: '$request.ping_request.bids.revenue_share'
              },
              vendor_id: '$request.vendor._id',
              vendor_name: { $concat: [ "$request.vendor.first_name", " ", "$request.vendor.last_name" ] },
              vendor_username: '$request.vendor.username',
              vendor_email: '$request.vendor.email',
              client_id: '$client._id',
              client_name: { $concat: [ "$client.first_name", " ", "$client.last_name" ] },
              client_campaign_name: '$client.campaign.campaign_name',
              client_email: '$client.email'
            }
          },
          { $group: { 
            _id: {
                lead_type: '$lead_type',
                vendor_id: '$vendor_id',
                vendor_name: '$vendor_name',
                vendor_username: '$vendor_username',
                vendor_email: '$vendor_email',
                client_id: '$client_id',
                client_name: '$client_name',
                client_campaign_name: '$client_campaign_name',
                client_email: '$client_email'
            },
            count: {
                $sum: 1
              },
            ping_requests: {
                $addToSet: '$ping_request'
            },
            bids: {
                $addToSet: '$bids'
            }
           }},
           {
            $project: {
              _id: 0,
              ping_requests: '$ping_requests',
              bids: '$bids',
              lead_type: '$_id.lead_type',
              vendor_id: '$_id.vendor_id',
              vendor_name: '$_id.vendor_name',
              vendor_username: '$_id.vendor_username',
              vendor_email: '$_id.vendor_email',
              client_id: '$_id.client_id',
              client_name: '$_id.client_name',
              client_campaign_name: '$_id.client_campaign_name',
              client_email: '$_id.client_email',
              count: '$count',
            }
          }
    ]);

    const vendorData = [];
    await Promise.all(perDayLeads.map(async (lead) => {
      vendorData.push({
            vendor_name: lead.vendor_name,
            email_date: moment().subtract(1, 'day').format('YYYY-MM-DD'),
            total_lead_count: lead.count,
            vendor_username: lead.vendor_username,
            vendor_id: lead.vendor_id.toString(),
            total_price: sum(lead.bids.map((bid) => {
                return bid.client_price;
            }))
        });
    }));

    const clientData = [];
    await Promise.all(perDayLeads.map(async (lead) => {
      clientData.push({
            client_name: lead.client_name,
            client_campaign_name: lead.client_campaign_name,
            email_date: moment().subtract(1, 'day').format('YYYY-MM-DD'),
            total_lead_count: lead.count,
            vendor_username: lead.vendor_username,
            vendor_id: lead.vendor_id.toString(),
            total_price: sum(lead.bids.map((bid) => {
                return bid.client_price;
            }))
        });
    }));

    await Promise.all(perDayLeads.map(async (lead) => {
        await sendEmail(
            'daily-verify-vendor.ejs',
            { 
                vendor_name: lead.vendor_name,
                email_date: moment().subtract(1, 'day').format('YYYY-MM-DD'),
                total_lead_count: lead.count,
                vendor_username: lead.vendor_username,
                vendor_id: lead.vendor_id,
                total_price: lead.total_price
            },
            lead.vendor_email,
            this.settingsService.adminCCEmailIds,
            this.settingsService.adminBCCEmailIds,
            `Please Verify Numbers for ${lead.lead_type} Leads Purchased From Astoria`,
            this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
            this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
            this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
            this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
    }));*/


  }
}