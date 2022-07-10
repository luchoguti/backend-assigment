import { Test, TestingModule } from '@nestjs/testing';
import { TicketResolveService } from '../ticket_resolve.service';

describe('TicketResolveService', () => {
  let service: TicketResolveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketResolveService],
    }).compile();

    service = module.get<TicketResolveService>(TicketResolveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
