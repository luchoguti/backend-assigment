import { Injectable} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {InjectRepository} from "@nestjs/typeorm";
import {AgentEntity} from "./entities/agent.entity";
import {Repository} from "typeorm";
import {AgentInterface} from "./interfaces/agent.interface";

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(AgentEntity)
        private readonly agentRepository: Repository<AgentInterface>
    ) {
    }
    @Cron(CronExpression.EVERY_30_SECONDS)
    async assignAgentFreeCron() {
        let agent = await this.agentRepository.findBy({
            state:true
        });
        if(agent.length > 0) {
            for (const data_agent of agent) {

            }
        }
    }
}