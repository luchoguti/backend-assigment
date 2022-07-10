import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { TicketResolveService } from './ticket_resolve.service';
import { CreateTicketResolveDto } from './dto/create-ticket_resolve.dto';
import { UpdateTicketResolveDto } from './dto/update-ticket_resolve.dto';
import {ApiOperation} from "@nestjs/swagger";
import {AgentService} from "../agent/agent.service";
import {TicketService} from "../ticket/ticket.service";

@Controller('ticket-resolve')
export class TicketResolveController {
  constructor(
      private readonly ticketResolveService: TicketResolveService,
      private readonly agentService: AgentService,
      private readonly ticketService: TicketService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new ticket resolve'})
  async create(@Body() createTicketResolveDto: CreateTicketResolveDto) {
    let ticket_resolve_create = await this.ticketResolveService.create(createTicketResolveDto);
    if (ticket_resolve_create.id_ticket_resolve !== undefined){
      await this.ticketService.update(createTicketResolveDto.id_ticket,{
        state:"result",
        id_agent:createTicketResolveDto.id_agent
      });
      let assign_ticket = await this.ticketService.findTicketByAssign();
      if(assign_ticket.id_ticket !== undefined){
        await this.ticketService.update(assign_ticket.id_ticket,{
          state:"assign",
          id_agent:createTicketResolveDto.id_agent
        });
      }else{
        await this.agentService.update(createTicketResolveDto.id_agent,{state:true});
      }
    }
    return ticket_resolve_create;
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets resolve'})
  findAll() {
    return this.ticketResolveService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket resolve'})
  findOne(@Param('id') id: string) {
    return this.ticketResolveService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket resolve'})
  update(@Param('id') id: string, @Body() updateTicketResolveDto: UpdateTicketResolveDto) {
    return this.ticketResolveService.update(id, updateTicketResolveDto);
  }
}
