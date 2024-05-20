import { ReturnLeadDto } from "./returnlead.dto";

export class ReturnsFileResultDto {

    leadsNotFound: string[];
  
    returnsAdded: ReturnLeadDto[];
  
    constructor() {
      this.leadsNotFound = [];
      this.returnsAdded = []
    }
  }