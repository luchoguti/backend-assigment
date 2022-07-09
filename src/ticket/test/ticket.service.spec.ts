import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from '../ticket.service';
import {getRepositoryToken} from "@nestjs/typeorm";
import {TicketEntity} from "../entities/ticket.entity";
import {TicketModule} from "../ticket.module";

describe('TicketService', () => {
  let ticketService: TicketService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TicketModule],
    })
        .overrideProvider(getRepositoryToken(TicketEntity))
        .useValue(jest.fn())
        .compile();

    ticketService = await module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(ticketService).toBeDefined();
  });

});