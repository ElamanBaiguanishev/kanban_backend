import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddRoleDto } from './dto/add-role.dto';
import * as bcrypt from 'bcryptjs'
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { RolesService } from 'src/roles/roles.service';
import { FilesService } from 'src/files/files.service';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService,
        private fileService: FilesService
    ) { }

    async getUser(userId: number) {
        const user = await this.userRepository.findByPk(userId)
        return user
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.rolesService.getRoleByValue('USER')
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async updateUser(id: number, dto: CreateUserDto) {
        let data = dto

        if (dto.password) {
            data = { ...dto, password: await bcrypt.hash(dto.password, 5) }
        }

        const user = await this.userRepository.update(data, {
            where: { id },
            returning: true
        });

        return user
    }

    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id
            },
            include: {
                all: true
            }
        })
        return user
    }

    async getAllUsers(search: string = ''): Promise<User[]> {
        if (search) {
            return this.userRepository.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            });
        }
        return this.userRepository.findAll();
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            include: {
                all: true
            }
        })
        return user
    }


    async getProfile(id: number) {
        const profile = await this.getUserById(id)

        const totalTasks = profile.tasks.length
        // const completedTasks = await this.
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.rolesService.getRoleByValue(dto.value)
        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }
        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }


    async updatePhoto(userId: number, image: any) {
        try {
            // Найти пользователя по идентификатору
            const user = await this.userRepository.findByPk(userId);

            if (!user) {
                throw new Error('User not found');
            }

            // Создать новый файл фотографии и получить его имя
            const fileName = await this.fileService.createFile(image);

            // Обновить свойство `image` пользователя на новое имя файла
            user.image = fileName;

            // Сохранить обновленного пользователя
            await user.save();

            return user;
        } catch (error) {
            throw new Error(`Failed to update user photo: ${error.message}`);
        }
    }
}
