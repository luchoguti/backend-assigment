import { ApiProperty } from "@nestjs/swagger";
import {ticketPriorityType} from "../types/ticket-priority.type";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {IsString} from "class-validator";

export class CreateTicketDto {
    @ApiProperty({
        example: "title test",
        description: 'title to ticket'
    })
    @IsString()
    readonly title:string;
    @ApiProperty({
        example: "description test",
        description: 'description to ticket'
    })
    @IsString()
    readonly description:string;
    @ApiModelProperty({ enum: [ "low","mean","high" ] })
    @ApiProperty({
        example: "low",
        description: 'priority to ticket, it can be: low or mean or high'
    })
    @IsString()
    readonly priority: ticketPriorityType;
}
