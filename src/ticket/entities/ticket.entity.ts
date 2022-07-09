import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {ticketPriorityType} from "../types/ticket-priority.type";
import {ticketStateType} from "../types/ticket-state.type";

@Entity()
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id_ticket:number;
    @Column({nullable:true, default:null})
    id_agent:number;
    @Column()
    title:string;
    @Column()
    description:string;
    @Column({
        type:"enum",
        enum:["low","mean","high"],
        default:"low"
    })
    priority: ticketPriorityType;
    @Column({
        type:"enum",
        enum:["result","assign","to do","by assign"],
        default:"by assign"
    })
    state: ticketStateType;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    update_at:Date;
}
