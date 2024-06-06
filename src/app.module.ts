import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.model';
import { User } from './user/user.model';
import { Event } from './event/event.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/roles.model';
import { ChatUser } from './chat/chat_user.model';
import { Message } from './chat/message.model';
import { Chat } from './chat/chat.model';
import { ChatModule } from './chat/chat.module';
import { SocketModule } from './websocket/websocket';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { FilesModule } from './files/files.module';
import { EventModule } from './event/event.module';
import { EventUser } from './event/event_user.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Task, ChatUser, Message, Chat, Event, EventUser],
      autoLoadModels: true
    }),
    UserModule,
    AuthModule,
    TaskModule,
    RolesModule,
    ChatModule,
    SocketModule,
    FilesModule,
    EventModule
  ],
  controllers: [],
  providers: []
})
export class AppModule { }
