import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'admin@test.com', description: 'Email користувача' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль (мін. 6 символів)', minLength: 6 })
  @MinLength(6)
  password: string;
}
