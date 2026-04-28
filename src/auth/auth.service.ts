import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity.js';
import { Role } from './enums/role.enum.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email вже зайнятий');
    const hashed = await bcrypt.hash(dto.password, 10);
    // Використовуємо Role.USER замість старого UserRole
    const user = this.usersRepo.create({ 
      email: dto.email, 
      password: hashed, 
      role: Role.USER 
    });
    const saved = await this.usersRepo.save(user);
    const { password, ...result } = saved;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ 
      where: { email: dto.email }, 
      select: ['id', 'email', 'password', 'role'] 
    });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Невірні дані');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
