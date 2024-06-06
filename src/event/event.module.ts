import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './event.model';
import { JwtModule } from '@nestjs/jwt';
import { Task } from 'src/task/task.model';
import { EventUser } from './event_user.model';
import { User } from 'src/user/user.model';

@Module({
  controllers: [EventController],
  providers: [EventService],
  imports: [
    SequelizeModule.forFeature([Event, Task, EventUser, User]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class EventModule { }
