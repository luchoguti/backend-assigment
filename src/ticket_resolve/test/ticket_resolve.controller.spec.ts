import {Test, TestingModule} from '@nestjs/testing';
import {TicketResolveController} from '../ticket_resolve.controller';
import {TicketResolveService} from '../ticket_resolve.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TicketEntity} from "../../ticket/entities/ticket.entity";
import {TicketResolveEntity} from "../entities/ticket_resolve.entity";
import {TicketService} from "../../ticket/ticket.service";
import {AgentService} from "../../agent/agent.service";
import {AgentEntity} from "../../agent/entities/agent.entity";

describe('TicketResolveController', () => {
    let controller: TicketResolveController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TicketResolveController],
            providers: [
                TicketResolveService,
                {provide: getRepositoryToken(TicketResolveEntity), useValue: jest.fn()},
                TicketService,
                {provide: getRepositoryToken(TicketEntity), useValue: jest.fn()},
                AgentService,
                {provide: getRepositoryToken(AgentEntity), useValue: jest.fn()},
            ],
        }).compile();
        controller = module.get<TicketResolveController>(TicketResolveController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});

