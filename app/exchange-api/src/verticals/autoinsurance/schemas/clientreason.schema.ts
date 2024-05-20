import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from 'mongoose';
import { ClientReasonDetail } from "./clientreasondetail.schema";

export type ClientReasonDocument = HydratedDocument<ClientReason>;

@Schema({ versionKey: false })
export class ClientReason {

    @Prop({ type: ClientReasonDetail })
    no_buyer_found: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    duplicate: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    client_validation_failed: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    internal_no_buyer_found: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    lead_cap_exhausted: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    beyond_expected_schedule: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    vendor_account_disabled: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    ping_successful: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    post_accepted: ClientReasonDetail;

    @Prop({ type: ClientReasonDetail })
    post_rejected: ClientReasonDetail;
}

export const ClientReasonSchema = SchemaFactory.createForClass(ClientReason);