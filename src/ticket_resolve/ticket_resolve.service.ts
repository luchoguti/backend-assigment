import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateTicketResolveDto} from './dto/create-ticket_resolve.dto';
import {UpdateTicketResolveDto} from './dto/update-ticket_resolve.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {TicketResolveEntity} from "./entities/ticket_resolve.entity";
import {Repository} from "typeorm";
import {TicketResolveInterface} from "./interfaces/ticket_resolve.interface";
import {AgentService} from "../agent/agent.service";
import {TicketService} from "../ticket/ticket.service";

@Injectable()
export class TicketResolveService {
    constructor(
        @InjectRepository(TicketResolveEntity)
        private readonly ticketResolveRepository: Repository<TicketResolveInterface>,
        private readonly agentService: AgentService,
        private readonly ticketService: TicketService
    ) {
    }

    async create(createTicketResolveDto: CreateTicketResolveDto): Promise<TicketResolveInterface> {
        return await this.ticketResolveRepository.save(createTicketResolveDto);
    }

    async findAll(): Promise<TicketResolveInterface[]> {
        return await this.ticketResolveRepository.find();
    }

    async findOne(id: string): Promise<TicketResolveInterface> {
        let data_ticket_resolve = await this.ticketResolveRepository.findOneBy({
            id_ticket_resolve: id
        });
        if (!data_ticket_resolve) {
            return {
                created_at: undefined,
                description: "",
                id_agent: 0,
                id_ticket: 0,
                id_ticket_resolve: "",
                update_at: undefined
            };
        } else {
            return data_ticket_resolve;
        }
    }

    async update(id: string, updateTicketResolveDto: UpdateTicketResolveDto) {
        let ticket_resolve = await this.ticketResolveRepository.findOneBy({
            id_ticket_resolve: id
        });
        if (!ticket_resolve) {
            throw new HttpException('This ticket try to resolve does not exist.', HttpStatus.CONFLICT);
        }
        let update_ticket_resolve = Object.assign(ticket_resolve, updateTicketResolveDto);
        let update_execute = await this.ticketResolveRepository.update(id, update_ticket_resolve);
        if (update_execute.affected > 0) {
            return update_ticket_resolve;
        } else {
            throw new HttpException('This ticket resolve was not execute.', HttpStatus.CONFLICT);
        }
    }

    async updateStateTicket(ticket_resolve_create_result, createTicketResolveDto: CreateTicketResolveDto) {
        if (ticket_resolve_create_result.id_ticket_resolve !== undefined) {
            await this.ticketService.update(createTicketResolveDto.id_ticket, {
                state: "result",
                id_agent: createTicketResolveDto.id_agent
            });
            let assign_ticket = await this.ticketService.findTicketByAssign();
            if (assign_ticket.id_ticket !== 0) {
                await this.ticketService.update(assign_ticket.id_ticket, {
                    state: "assign",
                    id_agent: createTicketResolveDto.id_agent
                });
            } else {
                await this.agentService.update(createTicketResolveDto.id_agent, {state: true});
            }
        }
    }
    async validateTicketResolve(id: number){
        let query_ticket = await this.ticketService.findOne(id);
        if(query_ticket.state === "result"){
            throw new HttpException('This ticket yet was resolve.', HttpStatus.CONFLICT);
        }
    }
}
