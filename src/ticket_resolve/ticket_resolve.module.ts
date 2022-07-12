import { Module } from '@nestjs/common';
import { TicketResolveService } from './ticket_resolve.service';
import { TicketResolveController } from './ticket_resolve.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TicketResolveEntity} from "./entities/ticket_resolve.entity";
import {AgentService} from "../agent/agent.service";
import {TicketService} from "../ticket/ticket.service";
import {AgentModule} from "../agent/agent.module";
import {TicketModule} from "../ticket/ticket.module";
import {AgentEntity} from "../agent/entities/agent.entity";
import {TicketEntity} from "../ticket/entities/ticket.entity";

@Module({
  imports:[TypeOrmModule.forFeature([TicketResolveEntity,AgentEntity,TicketEntity]),AgentModule,TicketModule],
  controllers: [TicketResolveController],
  providers: [TicketResolveService,AgentService,TicketService]
})
export class TicketResolveModule {}
