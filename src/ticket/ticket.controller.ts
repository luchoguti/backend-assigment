import {Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiOperation } from "@nestjs/swagger";

@Controller('ticket')
export class TicketController {
  constructor(
      private readonly ticketService: TicketService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new ticket'})
  async create(@Body() createTicketDto: CreateTicketDto) {
    try {
      await this.ticketService.assignTicket(createTicketDto);
      return await this.ticketService.create(createTicketDto);
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
  async update(@Param('id') id: number, @Body() updateTicketDto: UpdateTicketDto) {
    await this.ticketService.assignTicket(updateTicketDto);
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a ticket'})
  remove(@Param('id') id: number) {
    return this.ticketService.remove(id);
  }
}
