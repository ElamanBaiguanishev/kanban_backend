import { Body, Controller, Get, Request, Post, Put, UseGuards, UseInterceptors, UploadedFile, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles-guard';
import { AddRoleDto } from './dto/add-role.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @UseGuards(RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Put('/updatePhoto')
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Request() req, @UploadedFile() image) {
        return this.userService.updatePhoto(req.user.id, image)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Request() req, @Body() dto: CreateUserDto) {
        return this.userService.updateUser(req.user.id, dto)
    }

    @Get(':userId')
    get(@Param('userId') userId: number) {
        return this.userService.getUser(userId)
    }

    // @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll(@Query('search') search: string) {
        return this.userService.getAllUsers(search);
    }


    // @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }
}
