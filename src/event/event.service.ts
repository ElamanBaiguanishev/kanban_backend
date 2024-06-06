import { Injectable } from '@nestjs/common';
import { Event } from './event.model';
import { InjectModel } from '@nestjs/sequelize';
import { EventDto } from './dto/event.dto';
import { Task } from 'src/task/task.model';
import { EventUser } from './event_user.model';
import { User } from 'src/user/user.model';
import { Op } from 'sequelize';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event) private eventRepository: typeof Event,
        @InjectModel(Task) private taskRepository: typeof Task,
    ) { }

    async getAllEventsAndTasks(userId: number): Promise<{ date: string, title: string }[]> {
        // Fetch events associated with the user through EventUser table
        const events = await this.eventRepository.findAll({
            include: [
                {
                    model: User,
                    as: 'participants', // Specify the alias here
                    through: { where: { userId } },
                },
            ],
        });

        // Fetch tasks from the database where userId matches the provided userId
        const tasks = await this.taskRepository.findAll({
            where: { userId },
        });

        // Map events to the desired format
        const formattedEvents = events.map(event => ({
            date: event.dueDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
            title: event.name,
        }));

        // Map tasks to the desired format
        const formattedTasks = tasks.map(task => ({
            date: task.dueDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
            title: task.name,
        }));

        // Combine the results into a single array
        return [...formattedEvents, ...formattedTasks];
    }

    async getEventsAndTasksByDate(date: string, userId: number): Promise<{ events: Event[], tasks: Task[] }> {
        const targetDate = new Date(date);

        // Начало и конец целевого дня
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        // Найти все события по дате
        const events = await this.eventRepository.findAll({
            include: [{
                model: User,
                as: 'participants', // Specify the alias here
                through: { where: { userId } },
            }],
            where: {
                dueDate: {
                    [Op.between]: [startOfDay, endOfDay],
                },
            },
        });

        // Найти все задачи по дате
        const tasks = await this.taskRepository.findAll({
            where: {
                userId,
                dueDate: {
                    [Op.between]: [startOfDay, endOfDay],
                },
            },
        });

        return { events, tasks };
    }

    async getAllEvents(userId: number) {
        const events = await this.eventRepository.findAll({
            where: {
                creatorId: userId
            },
            include: {
                all: true
            }
        })
        return events
    }

    async createEvent(dto: EventDto, userId: number) {
        const task = await this.eventRepository.create({
            ...dto,
            creatorId: userId
        });

        return task;
    }
}
