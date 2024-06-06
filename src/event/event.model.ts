import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { EventUser } from "src/event/event_user.model";

@Table({ tableName: 'event' })
export class Event extends Model<Event> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING })
    name: string

    @Column({ type: DataType.STRING })
    description: string

    @Column({ type: DataType.DATE })
    dueDate: Date;

    @BelongsTo(() => User, { as: 'creator' })
    creator: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: 'creator_id' })
    creatorId: number;

    @BelongsToMany(() => User, { through: () => EventUser, as: 'participants' })
    participants: User[];
}
