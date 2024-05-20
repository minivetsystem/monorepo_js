import { ClientReturnDto } from "./clientreturn.dto";

export class ClientReturnsFileDto {

    from_date: Date;
  
    to_date: Date;

    lead_type_id: string;

    client_id: string;

    returnsData: ClientReturnDto[];

    added_by: string;
  }