import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/user/user.model";

@Table({ tableName: 'task' })
export class Task extends Model<Task> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING })
    name: string

    @Column({ type: DataType.ENUM('LOW', 'MEDIUM', 'HIGH'), allowNull: true })
    priority: 'LOW' | 'MEDIUM' | 'HIGH';

    @Column({ type: DataType.ENUM('ToDo', 'InProgress', 'OnHold', 'Completed'), allowNull: true, defaultValue: 'ToDo' })
    status: 'ToDo' | 'InProgress' | 'OnHold' | 'Completed';

    @Column({ type: DataType.DATE })
    dueDate: Date;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, field: 'user_id' })
    userId: number;
}