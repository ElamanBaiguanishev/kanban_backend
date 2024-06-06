// EventUser model
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";
import { Event } from "src/event/event.model";

@Table({ tableName: 'event_user' })
export class EventUser extends Model<EventUser> {
    @ForeignKey(() => Event)
    @Column({ type: DataType.INTEGER })
    eventId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => Event)
    event: Event;

    @BelongsTo(() => User)
    user: User;
}
