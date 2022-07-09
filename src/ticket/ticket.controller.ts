import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiOperation } from "@nestjs/swagger";
import {AgentService} from "../agent/agent.service";


@Controller('ticket')
export class TicketController {
  constructor(
      private readonly ticketService: TicketService,
      private readonly agentService: AgentService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new ticket'})
  async create(@Body() createTicketDto: CreateTicketDto) {
    try {
      let agent_free = await this.agentService.searchAgentFree();
      if(Object.values(agent_free).length > 0){
        createTicketDto['id_agent'] = agent_free['id_agent'];
        createTicketDto['state'] = 'assign';
        await this.agentService.update(agent_free['id_agent'],{state:false});
      }
      let new_ticket = await this.ticketService.create(createTicketDto);
      if(new_ticket.id_ticket === undefined){
        throw new HttpException('It ticket can not created!', HttpStatus.FORBIDDEN);
      }
      return new_ticket;
    }catch (error){
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all tickets'})
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a ticket'})
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a ticket'})
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket'})
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
