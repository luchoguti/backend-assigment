import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean,IsString } from 'class-validator';

export class CreateAgentDto {
    @ApiProperty({
        example: "Names agent",
        description: 'names to agent'
    })
    @IsString()
    readonly names:string;
    @ApiProperty({
         example: true,
         description: 'state to agent, true is free and false is busy'
    })
    @IsBoolean()
    readonly state:boolean;
}
