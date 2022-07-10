import { Test, TestingModule } from '@nestjs/testing';
import { TicketResolveController } from '../ticket_resolve.controller';
import { TicketResolveService } from '../ticket_resolve.service';

describe('TicketResolveController', () => {
  let controller: TicketResolveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketResolveController],
      providers: [TicketResolveService],
    }).compile();

    controller = module.get<TicketResolveController>(TicketResolveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
