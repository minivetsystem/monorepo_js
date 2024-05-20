import { ApiProperty } from "@nestjs/swagger";

export class LeadTypeDto {
    
    @ApiProperty()
    lead_type: number;

    @ApiProperty()
    label: string;
}