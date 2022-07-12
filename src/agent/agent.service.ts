import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import {AgentEntity} from "./entities/agent.entity";
import {Repository} from "typeorm";
import {AgentInterface} from "./interfaces/agent.interface";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class AgentService {
  constructor(
      @InjectRepository(AgentEntity)
      private readonly agentRepository: Repository<AgentInterface>
  ) {
  }
  async create(createAgentDto: CreateAgentDto):Promise<AgentInterface> {
    let create_agent = await this.agentRepository.save(createAgentDto);
    if(create_agent.id_agent === undefined){
      throw new HttpException('It Agent can not created!', HttpStatus.CONFLICT);
    }
    return create_agent;
  }

  async findAll():Promise<AgentInterface[]> {
    return await this.agentRepository.find();
  }

  async findOne(id: number):Promise<AgentInterface> {
    let agent = await this.agentRepository.findOneBy({
      id_agent:id
    });
    if(!agent){
      return {id_agent: 0, names: "", state: false}
    }else{
      return agent;
    }
  }

  async update(id: number, updateAgentDto: UpdateAgentDto):Promise<AgentInterface> {
    let agent = await this.agentRepository.findOneBy({
      id_agent: id
    });
    if (!agent){
      throw new HttpException('This agent does not exist', HttpStatus.CONFLICT);
    }
    let update_agent = Object.assign(agent,updateAgentDto);
    await this.agentRepository.update(id,updateAgentDto);
    return update_agent;
  }

  async remove(id: number):Promise<AgentInterface>{
    let agent = await this.agentRepository.findOneBy({
      id_agent: id
    });
    const agent_delete = await this.agentRepository.delete(id);
    if (agent_delete.affected == 0){
      throw new HttpException('This agent does not exist.', HttpStatus.CONFLICT);
    }
    return agent;
  }

  async searchAgentFree():Promise<Object>{
    let agent = await this.agentRepository.find({
      where:{
        state:true
      }
    });
    if(agent.length > 0){
      return agent[0];
    }else{
      return {};
    }
  }
}
