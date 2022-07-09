import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity()
export class AgentEntity {
    @PrimaryGeneratedColumn()
    id_agent:number;
    @Column()
    names:string;
    @Column({ comment:'true is free and false is busy', default:true})
    state:boolean;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    update_at:Date;
}
