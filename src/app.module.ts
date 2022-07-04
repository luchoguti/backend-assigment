import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketController } from './ticket/ticket.controller';
import { TicketModule } from './ticket/ticket.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TicketEntity} from "./ticket/entities/ticket.entity";

@Module({
  imports: [
      TicketModule,
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3310,
        username: 'user_docred',
        password: 'practicalDocred22#',
        database: 'practicadocred',
        entities: [TicketEntity],
        synchronize: true,
      }),
  ],
  controllers: [AppController, TicketController],
  providers: [AppService],
})
export class AppModule {}
