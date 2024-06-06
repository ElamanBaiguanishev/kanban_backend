import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { Message } from './message.model';
import { User } from 'src/user/user.model';
import { ChatUser } from './chat_user.model';
import { Op } from 'sequelize';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat)
        private readonly chatModel: typeof Chat,
        @InjectModel(Message)
        private readonly messageModel: typeof Message,
        @InjectModel(ChatUser)
        private readonly chatUser: typeof ChatUser,
    ) { }

    async createPrivateChat(userId: number, companionId: number) {
        let chat

        if (userId == companionId) {
            const userChats = await this.chatModel.findAll({
                where: {
                    name: 'privateChat',
                },
                include: [
                    {
                        model: User
                    },
                    {
                        model: Message
                    }
                ]
            });

            chat = userChats.find(chat => {
                const userIds = chat.users.map(user => user.id);
                if (userIds.length == 1)
                    return userIds[0] == userId
            });
        }
        else {

            const userChats = await this.chatModel.findAll({
                where: {
                    name: 'privateChat',
                },
                include: [
                    {
                        model: User
                    },
                    {
                        model: Message
                    }
                ]
            });

            chat = userChats.find(chat => {
                const userIds = chat.users.map(user => user.id);
                return [userId, companionId].every(id => userIds.includes(id));
            });
        }

        if (chat) {
            return chat
        } else {
            // Если чат не существует, создаем новый приватный чат
            const chat = await this.chatModel.create({ name: 'privateChat' });

            // Добавляем пользователей в чат
            if (userId == companionId) {
                await chat.$add('users', [userId]);
            }
            else {
                await chat.$add('users', [userId, companionId]);
            }

            return chat;
        }
    }

    async createChat(userIds: number[], name: string): Promise<Chat> {
        const chat = await this.chatModel.create({ name });

        // Добавляем пользователей в чат
        await chat.$add('users', userIds);

        return chat;
    }

    async getChatsByUserId(userId: number): Promise<Chat[]> {
        return this.chatModel.findAll({
            where: {
                name: {
                    [Op.ne]: 'privateChat'
                }
            },
            include: [
                {
                    model: User,
                    where: { id: userId },
                    required: true
                },
            ],
        });
    }

    async getMessagesByChatId(chatId: number): Promise<Message[]> {
        return this.messageModel.findAll({
            where: { chatId },
            include: {
                model: User,
                attributes: ['name', 'image'] // указываем, что хотим получить только поле 'name' из модели User
            }
        });
    }

    async sendMessage(chatId: number, senderId: number, content: string): Promise<Message> {
        const message = await this.messageModel.create({
            chatId,
            senderId,
            content,
        });

        // Получаем экземпляр пользователя по его ID
        const sender = await User.findByPk(senderId);

        message.sender = sender

        return message;
    }


}
