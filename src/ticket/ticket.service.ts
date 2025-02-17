import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTicketDto} from './dto/create-ticket.dto';
import {UpdateTicketDto} from './dto/update-ticket.dto';
import {TicketInterface} from "./interfaces/ticket.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {TicketEntity} from "./entities/ticket.entity";
import {Repository} from "typeorm";
import {AgentService} from "../agent/agent.service";

@Injectable()
export class TicketService {
    constructor(
        @InjectRepository(TicketEntity)
        private readonly ticketRepository: Repository<TicketInterface>,
        private readonly agentService: AgentService
    ) {
    }

    private implementTicketInterface: TicketInterface = {
        created_at: undefined,
        description: "",
        id_agent: 0,
        id_ticket: 0,
        priority: undefined,
        state: undefined,
        title: "",
        update_at: undefined
    }

    async create(createTicketDto: CreateTicketDto): Promise<TicketInterface> {
        let new_ticket = await this.ticketRepository.save(createTicketDto);
        if (new_ticket.id_ticket === undefined) {
            throw new HttpException('It ticket can not created!', HttpStatus.CONFLICT);
        }
        return new_ticket;
    }

    async findAll(): Promise<TicketInterface[]> {
        return await this.ticketRepository.find();
    }

    async findOne(id: number): Promise<TicketInterface> {
        let ticket = await this.ticketRepository.findOneBy({
            id_ticket: id
        });
        if (!ticket) {
            return this.implementTicketInterface;
        } else {
            return ticket;
        }

    }

    async update(id: number, updateTicketDto: UpdateTicketDto): Promise<TicketInterface> {
        let ticket = await this.ticketRepository.findOneBy({
            id_ticket: id
        });
        if (!ticket) {
            throw new HttpException('This ticket does not exist', HttpStatus.CONFLICT);
        }
        let update_ticket = Object.assign(ticket, updateTicketDto);
        let update_execute = await this.ticketRepository.update(id, update_ticket);
        if (update_execute.affected > 0) {
            return update_ticket;
        } else {
            throw new HttpException('This ticket was not update!', HttpStatus.CONFLICT);
        }
    }

    async remove(id: number): Promise<TicketInterface> {
        let ticket = await this.ticketRepository.findOneBy({
            id_ticket: id
        });
        const ticket_delete = await this.ticketRepository.delete(id);
        if (ticket_delete.affected === 0) {
            throw new HttpException('This ticket does not exist.', HttpStatus.CONFLICT);
        }
        return ticket;
    }

    async findTicketByAssign(): Promise<TicketInterface> {
        let ticket_find = await this.ticketRepository.findBy({
            state: "by assign"
        });
        if (ticket_find.length > 0) {
            return ticket_find[0];
        } else {
            return this.implementTicketInterface;
        }
    }

    async assignAgentTicket(updateTicketDto: UpdateTicketDto) {
        let agent_free = await this.agentService.searchAgentFree();
        if (Object.values(agent_free).length > 0 && updateTicketDto.id_agent === undefined) {
            updateTicketDto['id_agent'] = agent_free['id_agent'];
            updateTicketDto['state'] = 'assign';
            await this.agentService.update(agent_free['id_agent'], {state: false});
        }else if(updateTicketDto.id_agent !== undefined){
            let agent_validate = await this.agentService.findOne(updateTicketDto.id_agent);
            if(agent_validate.state){
                updateTicketDto['state'] = 'assign';
                await this.agentService.update(updateTicketDto.id_agent, {state: false});
            }else{
                throw new HttpException('Agent is in state busy', HttpStatus.CONFLICT);
            }
        }
        return updateTicketDto;
    }
}
