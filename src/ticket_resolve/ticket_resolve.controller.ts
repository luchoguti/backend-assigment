import {Controller, Get, Post, Body, Patch, Param} from '@nestjs/common';
import {TicketResolveService} from './ticket_resolve.service';
import {CreateTicketResolveDto} from './dto/create-ticket_resolve.dto';
import {UpdateTicketResolveDto} from './dto/update-ticket_resolve.dto';
import {ApiOperation} from "@nestjs/swagger";

@Controller('ticket-resolve')
export class TicketResolveController {
    constructor(
        private readonly ticketResolveService: TicketResolveService,
    ) {
    }

    @Post()
    @ApiOperation({summary: 'Create new ticket resolve'})
    async create(@Body() createTicketResolveDto: CreateTicketResolveDto) {
        await this.ticketResolveService.validateTicketResolve(createTicketResolveDto.id_ticket);
        let ticket_resolve_create_result = await this.ticketResolveService.create(createTicketResolveDto);
        await this.ticketResolveService.updateStateTicket(ticket_resolve_create_result, createTicketResolveDto);
        return ticket_resolve_create_result;
    }

    @Get()
    @ApiOperation({summary: 'Get all tickets resolve'})
    findAll() {
        return this.ticketResolveService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get a ticket resolve'})
    findOne(@Param('id') id: string) {
        return this.ticketResolveService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Update a ticket resolve'})
    update(@Param('id') id: string, @Body() updateTicketResolveDto: UpdateTicketResolveDto) {
        return this.ticketResolveService.update(id, updateTicketResolveDto);
    }
}
