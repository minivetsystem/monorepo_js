import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Bid, BidArchieve, BidArchieveDocument, BidDocument, BlacklistJornayaId, BlacklistJornayaIdDocument, IncomingRequest, IncomingRequestArchieve, IncomingRequestArchieveDocument, IncomingRequestDocument, OutgoingRequest, OutgoingRequestArchieve, OutgoingRequestArchieveDocument, OutgoingRequestDocument, Ping, PingArchieve, PingArchieveDocument, PingDocument, Post, PostArchieve, PostArchieveDocument, PostDocument } from './schemas';
import { Model } from 'mongoose';
import { sendEmail } from '../../helpers';
import { SettingsService } from '../../settings/settings.service';
import moment from 'moment';
import { REQUEST_TYPE } from '../../config/constants';

@Injectable()
export class ClearRequestsService {

    constructor(
        private configService: ConfigService,
        private settingsService: SettingsService,
        @InjectModel(IncomingRequest.name)
        private incomingRequestModel: Model<IncomingRequestDocument>,
        @InjectModel(IncomingRequestArchieve.name)
        private incomingRequestArchieveModel: Model<IncomingRequestArchieveDocument>,
        @InjectModel(OutgoingRequestArchieve.name)
        private outgoingRequestArchieveModel: Model<OutgoingRequestArchieveDocument>,
        @InjectModel(OutgoingRequest.name)
        private outgoingRequestModel: Model<OutgoingRequestDocument>,
        @InjectModel(BlacklistJornayaId.name)
        private blacklistJornayaIdsModel: Model<BlacklistJornayaIdDocument>,
        @InjectModel(BidArchieve.name)
        private bidArchieveModel: Model<BidArchieveDocument>,
        @InjectModel(Bid.name)
        private bidModel: Model<BidDocument>,
        @InjectModel(Ping.name)
        private pingModel: Model<PingDocument>,
        @InjectModel(PingArchieve.name)
        private pingArchieveModel: Model<PingArchieveDocument>,
        @InjectModel(Post.name)
        private postModel: Model<PostDocument>,
        @InjectModel(PostArchieve.name)
        private postArchieveModel: Model<PostArchieveDocument>
      ) { }

  @Cron('*/30 * * * *')
  async handleCron() {
    try {
      const totalPingRequests = await this.incomingRequestModel.aggregate([
        {
          $match: {
            request_type: REQUEST_TYPE.Ping,
            ping_time: {$lte: new Date(moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')) }
          }
        }
      ]);

      const totalPostRequests = await this.incomingRequestModel.aggregate([
        {
          $match: {
            request_type: REQUEST_TYPE.Post,
            post_time: {$lte: new Date(moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')) }
          }
        }
      ]);
  
      const totalBids = await this.bidModel.aggregate([
        {
          $match: {
            added_on: {$lte: new Date(moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')) }
          }
        }
      ]);
  
      const totalOutgoingRequests = await this.outgoingRequestModel.aggregate([
        {
          $match: {
            ping_time: {$lte: new Date(moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')) }
          }
        }
      ]);

      const totalPings = await this.pingModel.aggregate([
        {
          $match: {
            start_time: {$lte: new Date(moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')) }
          }
        }
      ]);

      const totalPosts = await this.postModel.aggregate([
        {
          $match: {
            start_time: {$lte: new Date(moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD HH:mm:ss')) }
          }
        }
      ]);
  
      await this.incomingRequestArchieveModel.insertMany(totalPingRequests);
      await this.incomingRequestModel.deleteMany({ _id: { $in: totalPingRequests.map(request => request._id) } }).exec();

      await this.incomingRequestArchieveModel.insertMany(totalPostRequests);
      await this.incomingRequestModel.deleteMany({ _id: { $in: totalPostRequests.map(request => request._id) } }).exec();
  
      await this.bidArchieveModel.insertMany(totalBids);
      await this.bidModel.deleteMany({ _id: { $in: totalBids.map(bid => bid._id) } }).exec();
  
      await this.outgoingRequestArchieveModel.insertMany(totalOutgoingRequests);
      await this.outgoingRequestModel.deleteMany({ _id: { $in: totalOutgoingRequests.map(request => request._id) } }).exec();

      await this.pingArchieveModel.insertMany(totalPings);
      await this.pingModel.deleteMany({ _id: { $in: totalPings.map(request => request._id) } }).exec();

      await this.postArchieveModel.insertMany(totalPosts);
      await this.postModel.deleteMany({ _id: { $in: totalPosts.map(request => request._id) } }).exec();
  
      const duplicateJornayaIds = await this.blacklistJornayaIdsModel.aggregate([
        { $group: {
          _id: '$universal_leadid',
          count: { $sum: 1 }
        } },
        { $match: {
          count: {$gt: 1}
        } }
      ]);
  
      await Promise.all(duplicateJornayaIds.map(async (lead) => {
        await this.blacklistJornayaIdsModel.deleteOne({ universal_leadid: lead._id }).exec();
      }));

      /* await sendEmail(
        'clearing-status.ejs',
        { 
         total_requests: totalPingRequests.length + totalPostRequests.length,
         total_deleted_requests: totalPingRequests.length + totalPostRequests.length,
         total_bids: totalBids.length,
         total_deleted_outgoing_requests: totalOutgoingRequests.length,
         total_deleted_bids: totalBids.length,
         total_duplicate_jornaya_ids: duplicateJornayaIds.length
        },
        this.settingsService.adminBCCEmailIds,
        null,
        null,
        "Exchange Data Clearing status",
        this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
        this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
        this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
        this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));*/
        
    } catch (err) {      
      await sendEmail(
        'report-exchange-error.ejs',
        { 
         error: err.message,
         request: '',
         operation: ''
        },
        this.settingsService.adminBCCEmailIds,
        null,
        null,
        `CLEARING DATA FOR => ${moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss')}`,
        null,
        null,
        this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
        this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
        this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
        this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
    }
  }
}