import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Chat } from "./chat.model";

@Table({ tableName: 'message' })
export class Message extends Model<Message> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    senderId: number;

    @BelongsTo(() => User)
    sender: User;

    @ForeignKey(() => Chat)
    @Column({ type: DataType.INTEGER })
    chatId: number;

    @BelongsTo(() => Chat)
    chat: Chat;

    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    createdAt: Date;
}