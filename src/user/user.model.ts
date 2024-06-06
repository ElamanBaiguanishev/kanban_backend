import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Chat } from "src/chat/chat.model";
import { ChatUser } from "src/chat/chat_user.model";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";
import { Task } from "src/task/task.model";
import { Event } from "src/event/event.model";
import { EventUser } from "src/event/event_user.model";

@Table({ tableName: 'user' })
export class User extends Model<User> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, unique: true })
    email: string

    @Column({ type: DataType.STRING, allowNull: true })
    name: string

    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @Column({ type: DataType.STRING, allowNull: true })
    image: string

    @HasMany(() => Task)
    tasks: Task[];

    @HasMany(() => Event, { foreignKey: 'creatorId', as: 'createdEvents' })
    createdEvents: Event[];

    @BelongsToMany(() => Event, () => EventUser)
    events: Event[];

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @BelongsToMany(() => Chat, () => ChatUser)
    chats: Chat[];
}
