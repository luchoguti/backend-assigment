import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateTicketResolveDto {
    @ApiProperty({
        example: 1,
        description: 'it is id ticked to resolve'
    })
    @IsNumber()
    readonly id_ticket:number;
    @ApiProperty({
        example: 1,
        description: 'it is id agent to resolve'
    })
    @IsNumber()
    readonly id_agent:number;
    @ApiProperty({
        example: "test description who resolve this ticked",
        description: 'It is a description the who resolve ticket.'
    })
    @IsString()
    readonly description:string;
}
