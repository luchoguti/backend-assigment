import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from '../ticket.controller';
import {TicketModule} from "../ticket.module";
import {TicketEntity} from "../entities/ticket.entity";
import { getRepositoryToken } from '@nestjs/typeorm';
import {TicketService} from "../ticket.service";

describe('Validate Controller TicketController', () => {
  let controller: TicketController;
  let ticketService: TicketService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
     imports:[TicketModule]
    })
        .overrideProvider(getRepositoryToken(TicketEntity))
        .useValue(jest.fn())
        .compile();

    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});