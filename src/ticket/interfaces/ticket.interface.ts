import {ticketPriorityType} from "../types/ticket-priority.type";
import {ticketStateType} from "../types/ticket-state.type";

export interface TicketInterface{
    readonly id_ticket:number;
    readonly id_agent:number;
    readonly title:string;
    readonly description:string;
    readonly priority: ticketPriorityType;
    state: ticketStateType;
    readonly created_at:Date;
    readonly  update_at:Date;

}