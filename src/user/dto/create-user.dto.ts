import { IsEmail, MinLength } from "class-validator"
import { IsOptional } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    @IsOptional()
    email?: string

    @IsOptional()
    name?: string

    @IsOptional()
    @MinLength(6, { message: "Password must be at 6 characters long" })
    password?: string
}