import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer, ConnectedSocket, MessageBody, OnGatewayInit, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { log } from 'console';

@WebSocketGateway(
  {
    cors: {
      origin: "*"
    }
  }
)
export class SocketService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private chatService: ChatService,
    private jwtService: JwtService
  ) { }

  @WebSocketServer() server: Server;


  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: any): Promise<void> {
    const token = client.handshake.auth.token;
    const chatId = payload.chatId;
    const content = payload.content;

    const user = this.jwtService.verify(token);

    await this.chatService.sendMessage(chatId, user.id, content);

    // Получаем экземпляр пользователя по его ID
    const sender = await User.findByPk(user.id);

    // Добавляем имя отправителя к объекту payload
    payload.sender = {
      'name': sender ? sender.name : 'Unknown'
    }

    // Отправляем payload в комнату с идентификатором chatId
    this.server.emit(chatId, payload);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}

