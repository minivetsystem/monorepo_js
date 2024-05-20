import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { ClientReason } from "./clientreason.schema";
import { User } from "../../../users/schemas";
import { IncomingRequest } from './incomingrequest.schema';
import { Campaign } from '../../../campaigns/schemas';

export type PingClientDocument = HydratedDocument<PingClient>;

@Schema({ versionKey: false })
export class PingClient {

    @Prop({ type: ClientReason, _id: false })
    reasons: ClientReason;

    @Prop([{ type: { type: mongoose.Schema.Types.ObjectId, ref: 'IncomingRequest' } }])
    pings: IncomingRequest[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    client: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' })
    campaign: Campaign;
}

export const PingClientSchema = SchemaFactory.createForClass(PingClient);