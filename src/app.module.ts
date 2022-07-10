import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AgentModule } from './agent/agent.module';
import { TicketResolveModule } from './ticket_resolve/ticket_resolve.module';
import { ScheduleModule } from '@nestjs/schedule';

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
        entities: [__dirname + '/**/*.entity.{ts,js}'],
        synchronize: true,
      }),
      AgentModule,
      TicketResolveModule,
      ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
