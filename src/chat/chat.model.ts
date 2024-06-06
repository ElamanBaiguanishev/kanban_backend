import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Message } from "./message.model";
import { User } from "src/user/user.model";
import { ChatUser } from "./chat_user.model";

@Table({ tableName: 'chat' })
export class Chat extends Model<Chat> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    // Дополнительные поля для чата (например, название)
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @BelongsToMany(() => User, () => ChatUser)
    users: User[];

    // Один чат может иметь несколько сообщений
    @HasMany(() => Message)
    messages: Message[];
}
