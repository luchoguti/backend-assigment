import { CreateTicketDto } from './create-ticket.dto';
import {ticketStateType} from "../types/ticket-state.type";
import {ApiModelProperty, ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {ApiProperty, PartialType } from "@nestjs/swagger";
import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    @ApiModelProperty({ enum: [ "result","assign","to do","by assign"] })
    @ApiProperty({
        example: "by assign",
        description: 'state to ticket, it can be: result or assign or to do or by assign',
        required: false,
    })
    @IsString()
    @IsOptional()
    state: ticketStateType;
    @ApiModelPropertyOptional({
        required: false,
        description: 'id agent by assign the ticket',
        example: 1
    })
    @IsOptional()
    @IsNumber()
    id_agent:number;
}
