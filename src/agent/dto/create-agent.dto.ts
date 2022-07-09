import { ApiProperty } from "@nestjs/swagger";

export class CreateAgentDto {
    @ApiProperty({
        example: "Names agent",
        description: 'names to agent'
    })
    readonly names:string;
    @ApiProperty({
        example: true,
        description: 'state to agent'
    })
    readonly state:boolean;
}
