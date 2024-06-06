import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe, Request, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { EventDto } from './dto/event.dto';

@Controller('event')
export class EventController {
    constructor(private eventService: EventService) { }

    @UsePipes(new ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Get(':date')
    async getEventsAndTasksByDate(@Param('date') date: string, @Request() req) {
        return this.eventService.getEventsAndTasksByDate(date, req.user.id);
    }

    @UsePipes(new ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll(@Request() req) {
        return this.eventService.getAllEventsAndTasks(req.user.id)
    }

    @UsePipes(new ValidationPipe)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: EventDto, @Request() req) {
        return this.eventService.createEvent(dto, req.user.id)
    }
}
