import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import {ApiOperation} from "@nestjs/swagger";

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  @ApiOperation({ summary: 'Create new agent'})
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentService.create(createAgentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all agents'})
  findAll() {
    return this.agentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a agent'})
  findOne(@Param('id') id: string) {
    return this.agentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a agent'})
  update(@Param('id') id: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentService.update(+id, updateAgentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a agent'})
  remove(@Param('id') id: string) {
    return this.agentService.remove(+id);
  }
}
