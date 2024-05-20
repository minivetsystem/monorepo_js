import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Setting, SettingDocument } from "./schemas";
import { Model } from "mongoose";
import { OnEvent } from "@nestjs/event-emitter";
import { EVENTS } from "../config/constants";

@Injectable()
export class SettingsService {

    public pingMinCap: number;
    public adminCCEmailIds: string;
    public adminBCCEmailIds: string;

    constructor(
        @InjectModel(Setting.name)
        private globalSettingModel: Model<SettingDocument>
    ) {}
    
    async load(): Promise<boolean> {
        
        //Check if the vendor has exceeded the ping volume as per the global settings.
        const pingMinCapResult = await this.globalSettingModel
        .findOne({ name: 'PING_MIN_CAP' })
        .exec();

        this.pingMinCap = pingMinCapResult ?  parseInt(pingMinCapResult.value) : 60;

        const adminCCEmails = await this.globalSettingModel
        .findOne({ name: 'ADMIN_CC_EMAILS' })
        .exec();

        const adminBCCEmails = await this.globalSettingModel
        .findOne({ name: 'ADMIN_BCC_EMAILS' })
        .exec();

        this.adminCCEmailIds = adminCCEmails.value;

        this.adminBCCEmailIds = adminBCCEmails.value;

        return true;
    }

    async fetchSettings() {
        const allSettings = await this.globalSettingModel.find({}).exec();

        return allSettings;
    }

    /**
     * This handles the event when the setting is updated.
     */
    @OnEvent(EVENTS.SETTINGS_UPDATED)
    async deactivateVendor () {
        this.load();
    }

}
