import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
@Entity()
export class TicketResolveEntity {
    @PrimaryGeneratedColumn("uuid")
    id_ticket_resolve:string;
    @Column()
    id_ticket:number;
    @Column()
    id_agent:number;
    @Column()
    description:string;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    update_at:Date;
}
