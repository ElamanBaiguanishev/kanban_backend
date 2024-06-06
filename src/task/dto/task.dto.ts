import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

export class TaskDto {
    @IsString()
    @IsOptional()
    name?: string

    @IsBoolean()
    @IsOptional()
    isCompleted?: boolean;

    @IsOptional()
    createdAt?: string
    
    @IsOptional()
    @IsEnum(['LOW', 'MEDIUM', 'HIGH'], { each: true, message: 'Priority must be one of: LOW, MEDIUM, HIGH' })
    priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}