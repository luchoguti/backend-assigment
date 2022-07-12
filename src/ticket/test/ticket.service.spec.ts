import {Test, TestingModule} from '@nestjs/testing';
import {TicketService} from '../ticket.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TicketEntity} from "../entities/ticket.entity";
import {AgentEntity} from "../../agent/entities/agent.entity";
import {AgentService} from "../../agent/agent.service";

describe('TicketService', () => {
    let ticketService: TicketService;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TicketService,
                {provide: getRepositoryToken(TicketEntity), useValue: jest.fn()},
                AgentService,
                {provide: getRepositoryToken(AgentEntity), useValue: jest.fn()},
            ]
        }).compile()
        ticketService = await module.get<TicketService>(TicketService);
    });

    it('should be defined', () => {
        expect(ticketService).toBeDefined();
    });

});