import { ApiProperty } from "@nestjs/swagger";
import {ticketPriorityType} from "../types/ticket-priority.type";
import {ticketStateType} from "../types/ticket-state.type";

export class CreateTicketDto {
    @ApiProperty({
        example: "title test",
        description: 'title to ticket'
    })
    readonly title:string;
    @ApiProperty({
        example: "description test",
        description: 'description to ticket'
    })
    readonly description:string;
    @ApiProperty({
        example: "low",
        description: 'priority to ticket'
    })
    readonly priority: ticketPriorityType;
    state: ticketStateType;
}
