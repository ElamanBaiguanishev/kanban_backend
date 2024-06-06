import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateChatDto {
  @IsArray()
  @IsNotEmpty()
  userIds: number[];

  @IsString()
  @IsNotEmpty()
  name: string;
}