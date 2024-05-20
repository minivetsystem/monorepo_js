import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas';
import { sendEmail } from '../../helpers';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class VendorCheckService {

    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        private configService: ConfigService,
        private settingsService: SettingsService
      ) { }

  @Cron('0 0 * * *')
  async handleCron() {

    const inactiveVendors = await this.userModel.aggregate([
        {
            $lookup: {
              from: 'roles',
              localField: '_id',
              foreignField: 'users',
              as: 'role'
            }
          },
          {
            $unwind: {
              path: "$role",
              preserveNullAndEmptyArrays: true
            }
          }, 
          { $match: { 'role.name': 'Vendor' } },
          {
            $lookup: {
              from: 'incomingrequests',
              localField: '_id',
              foreignField: 'vendor',
              as: 'requests'
            }
          },
          { $match: {
            ping_time: {
                $gt: new Date(Date.now() - 24*60*60 * 1000 * 90)
              }
        } }, 
    ]);

    await Promise.all(inactiveVendors.map(async (vendor) => {
        if(vendor.requests.length === 0) {
            await this.userModel.findByIdAndUpdate(vendor._id, { $set: { user_status: 'inactive' } }).exec();
            await sendEmail(
                'vendor-deactivate.ejs',
                { 
                    vendor_name: `${vendor.first_name} ${vendor.last_name}`
                },
                vendor.email,
                this.settingsService.adminCCEmailIds,
                this.settingsService.adminBCCEmailIds,
                `Account de-activation`,
                null,
                null,
                this.configService.get<string>('SEND_GRID_EMAIL_SERVER'),
                this.configService.get<string>('SEND_GRID_EMAIL_PORT'),
                this.configService.get<string>('SEND_GRID_EMAIL_USERNAME'),
                this.configService.get<string>('SEND_GRID_EMAIL_PASSWORD'));
        }
    }));


  }
}