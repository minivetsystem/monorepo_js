import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import mongoose from "mongoose";

export type ClientReasonDetailDocument = HydratedDocument<ClientReasonDetail>;

@Schema({ versionKey: false })
export class ClientReasonDetail {

    @Prop({ type: mongoose.Schema.Types.Number })
    no_of_pings: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    no_of_posts: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    min_client_price: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    max_client_price: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    total_client_price: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    total_vendor_price: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    total_revenue_share: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    min_time: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    max_time: number;

    @Prop({ type: mongoose.Schema.Types.Number })
    total_time: number;
}

export const CClientReasonDetailSchema = SchemaFactory.createForClass(ClientReasonDetail);