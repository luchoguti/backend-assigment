import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {TicketInterface} from "./interfaces/ticket.interface";
import {InjectRepository} from "@nestjs/typeorm";
import {TicketEntity} from "./entities/ticket.entity";
import {Repository} from "typeorm";

@Injectable()
export class TicketService {
  constructor(
      @InjectRepository(TicketEntity)
      private readonly ticketRepository: Repository<TicketInterface>
  ) {
  }
  async create(createTicketDto: CreateTicketDto):Promise<TicketInterface> {
    return await this.ticketRepository.save(createTicketDto);
  }

  async findAll():Promise<TicketInterface[]>{
    return await this.ticketRepository.find();
  }

  async findOne(id: number): Promise<TicketInterface | null> {
    return await this.ticketRepository.findOneBy({
      id_ticket: id
    })
  }

  async update(id: number, updateTicketDto: UpdateTicketDto):Promise<TicketInterface> {
    let ticket = await this.ticketRepository.findOneBy({
      id_ticket: id
    });
    if (!ticket){
      throw new HttpException('This ticket does not exist', HttpStatus.NOT_FOUND);
    }
    let update_ticket = Object.assign(ticket,updateTicketDto);
    await this.ticketRepository.update(id,update_ticket);
    return update_ticket;
  }

  async remove(id: number):Promise<TicketInterface>{
    let ticket = await this.ticketRepository.findOneBy({
      id_ticket: id
    });
    const ticket_delete = await this.ticketRepository.delete(id);
    if(ticket_delete.affected === 0){
      throw new HttpException('This ticket does not exist.', HttpStatus.NOT_FOUND);
    }
    return ticket;
  }
}
