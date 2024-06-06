import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './dto/task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) { }

    @UsePipes(new ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req) {
        return this.taskService.getAllTasks(req.user.id)
    }

    @UsePipes(new ValidationPipe)
    @UseGuards(JwtAuthGuard)
    // @Roles("ADMIN")
    @Post()
    create(@Body() dto: TaskDto, @Request() req) {
        return this.taskService.createTask(dto, req.user.id)
    }

    @UsePipes(new ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Put(":id")
    update(@Request() req, @Param('id') taskId: number, @Body() dto: TaskDto) {
        return this.taskService.updateTask(dto, taskId, req.user.id)
    }

    @UsePipes(new ValidationPipe)
    @Delete(":id")
    delete(@Param('id') taskId: number) {
        return this.taskService.deleteTask(taskId)
    }
}
