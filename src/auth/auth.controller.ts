import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Реєстрація нового користувача' })
  register(@Body() dto: RegisterDto) { return this.authService.register(dto); }

  @Post('login')
  @ApiOperation({ summary: 'Вхід у систему' })
  @ApiResponse({ status: 200, description: 'Повертає JWT токен' })
  login(@Body() dto: LoginDto) { return this.authService.login(dto); }
}
