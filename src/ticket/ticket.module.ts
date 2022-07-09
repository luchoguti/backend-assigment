import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TicketEntity} from "./entities/ticket.entity";
import {AgentService} from "../agent/agent.service";
import {AgentEntity} from "../agent/entities/agent.entity";

@Module({
  imports:[TypeOrmModule.forFeature([TicketEntity,AgentEntity])],
  controllers: [TicketController],
  providers: [TicketService,AgentService]
})
export class TicketModule {}
