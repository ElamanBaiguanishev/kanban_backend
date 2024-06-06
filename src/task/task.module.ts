import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  providers: [TaskService],
  imports: [
    SequelizeModule.forFeature([Task]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [TaskController]
})

export class TaskModule { }
