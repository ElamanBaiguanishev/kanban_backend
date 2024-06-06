import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task) private taskRepository: typeof Task) { }

    async getAllTasks(userId: number) {
        const tasks = await this.taskRepository.findAll({
            where: {
                userId
            },
            include: {
                all: true
            }
        })
        return tasks
    }

    async createTask(dto: TaskDto, userId: number) {
        const task = await this.taskRepository.create({
            ...dto,
            userId
        });

        return task;
    }

    async updateTask(dto: Partial<TaskDto>, taskId: number, userId: number) {
        const task = await this.taskRepository.update(dto, {
            where: { userId, id: taskId },
            returning: true
        });

        return task
    }

    async deleteTask(taskId: number) {
        const task = await this.taskRepository.destroy({
            where: {
                id: taskId
            }
        });

        return task
    }
}
