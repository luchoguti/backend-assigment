import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from '../ticket.controller';
import {TicketModule} from "../ticket.module";
import {TicketEntity} from "../entities/ticket.entity";
import { getRepositoryToken } from '@nestjs/typeorm';
import {TicketService} from "../ticket.service";
import {AgentService} from "../../agent/agent.service";
import {AgentEntity} from "../../agent/entities/agent.entity";

describe('Validate Controller TicketController', () => {
  let controller: TicketController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers:[TicketController],
      providers: [
        TicketService,
        {provide: getRepositoryToken(TicketEntity), useValue: jest.fn()},
        AgentService,
        {provide: getRepositoryToken(AgentEntity), useValue: jest.fn()},
      ]
    }).compile()
    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});