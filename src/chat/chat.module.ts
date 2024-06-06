import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { User } from 'src/user/user.model';
import { Message } from './message.model';
import { ChatUser } from './chat_user.model';

@Module({
  providers: [ChatService],
  imports: [
    SequelizeModule.forFeature([Chat, User, Message, ChatUser]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  controllers: [ChatController],
  exports: [ChatService]
})
export class ChatModule { }
