import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './ticket/ticket.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AgentModule } from './agent/agent.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
