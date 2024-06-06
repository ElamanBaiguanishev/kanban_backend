import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Message } from './message.model';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @Post(':userId')
  async createPrivateChat(@Req() req, @Param('userId') companionId: number): Promise<any> {
    return this.chatService.createPrivateChat(+req.user.id, +companionId);
  }

  @Post()
  async createChat(@Body() createChatDto: CreateChatDto): Promise<any> {
    return this.chatService.createChat(createChatDto.userIds, createChatDto.name);
  }

  @Get()
  async getChatsByUserId(@Req() req): Promise<any> {
    return this.chatService.getChatsByUserId(req.user.id);
  }

  @Get(':chatId/messages')
  async getMessagesByChatId(@Param('chatId') chatId: number): Promise<Message[]> {
    return this.chatService.getMessagesByChatId(chatId);
  }

  @Post(':chatId/messages')
  async sendMessage(
    @Param('chatId') chatId: number,
    @Req() req,
    @Body('content') content: string,
  ): Promise<Message> {
    const senderId = req.user.id;
    return this.chatService.sendMessage(chatId, senderId, content);
  }
}
