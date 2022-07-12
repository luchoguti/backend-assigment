import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TicketEntity} from "./entities/ticket.entity";
import {AgentEntity} from "../agent/entities/agent.entity";
import {AgentModule} from "../agent/agent.module";

@Module({
  imports:[TypeOrmModule.forFeature([TicketEntity,AgentEntity]),AgentModule],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService]
})
export class TicketModule {}
