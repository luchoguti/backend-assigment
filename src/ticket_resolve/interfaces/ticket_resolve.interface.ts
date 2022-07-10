export interface TicketResolveInterface{
    readonly id_ticket_resolve:string;
    readonly id_ticket:number;
    readonly id_agent:number;
    readonly description:string;
    readonly created_at:Date;
    readonly update_at:Date;
}