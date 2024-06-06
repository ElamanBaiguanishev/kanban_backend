import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SocketService } from 'src/chat/chat.gateway';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  providers: [SocketService],
  imports: [
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h'
      }
    }),
    ChatModule
  ],
})
export class SocketModule { }
