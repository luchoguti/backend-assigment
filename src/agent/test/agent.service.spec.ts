import {Test, TestingModule} from '@nestjs/testing';
import {AgentService} from '../agent.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TicketEntity} from "../../ticket/entities/ticket.entity";
import {AgentEntity} from "../entities/agent.entity";

describe('AgentService', () => {
    let service: AgentService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AgentService,
                {provide: getRepositoryToken(AgentEntity), useValue: jest.fn()},
            ],
        }).compile();

        service = module.get<AgentService>(AgentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
