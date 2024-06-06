import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class EventDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsString()
    @IsOptional()
    description: string

    @IsArray()
    @IsNotEmpty()
    userIds: number[];

    dueDate: Date;
}