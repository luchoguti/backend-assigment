import { Test, TestingModule } from '@nestjs/testing';
import { TicketResolveService } from '../ticket_resolve.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TicketResolveEntity} from "../entities/ticket_resolve.entity";
import {TicketService} from "../../ticket/ticket.service";
import {TicketEntity} from "../../ticket/entities/ticket.entity";
import {AgentService} from "../../agent/agent.service";
import {AgentEntity} from "../../agent/entities/agent.entity";

describe('TicketResolveService', () => {
  let ticketResolveService: TicketResolveService;
  const mockTicketResolveService = () => ({
    create: jest.fn()
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketResolveService,
        {provide: getRepositoryToken(TicketResolveEntity), useFactory: mockTicketResolveService},
        TicketService,
        {provide: getRepositoryToken(TicketEntity), useValue: jest.fn()},
        AgentService,
        {provide: getRepositoryToken(AgentEntity), useValue: jest.fn()},
      ],
    }).compile();

    ticketResolveService = await module.get<TicketResolveService>(TicketResolveService);
  });

  it('should be defined', () => {
    expect(ticketResolveService).toBeDefined();
  });
});
