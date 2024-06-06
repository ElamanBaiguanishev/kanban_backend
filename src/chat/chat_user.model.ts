import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Chat } from "./chat.model";

@Table({ tableName: 'chat_user' })
export class ChatUser extends Model<ChatUser> {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Chat)
    @Column({ type: DataType.INTEGER })
    chatId: number;

    @BelongsTo(() => Chat)
    chat: Chat;
}