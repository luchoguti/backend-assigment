import { Test, TestingModule } from '@nestjs/testing';
import { AgentController } from '../agent.controller';
import {AgentModule} from "../agent.module";
import {getRepositoryToken} from "@nestjs/typeorm";
import {AgentEntity} from "../entities/agent.entity";

describe('AgentController', () => {
  let controller: AgentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AgentModule]
    }).overrideProvider(getRepositoryToken(AgentEntity))
        .useValue(jest.fn())
        .compile();

    controller = module.get<AgentController>(AgentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
