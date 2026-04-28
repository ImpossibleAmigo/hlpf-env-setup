import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderQueryDto } from './dto/order-query.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '../auth/enums/role.enum.js';
import { CurrentUser } from '../auth/decorators/current-user.decorator.js';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Orders') @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Post() create(@Body() dto: CreateOrderDto, @CurrentUser('sub') userId: number) { return this.ordersService.create(dto, userId); }
  @Get() findAll(@Query() query: OrderQueryDto, @CurrentUser('sub') userId: number, @CurrentUser('role') role: Role) { return this.ordersService.findAll(query, userId, role); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser('sub') userId: number, @CurrentUser('role') role: Role) { return this.ordersService.findOne(id, userId, role); }
  @Patch(':id/status') @Roles(Role.ADMIN) updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrderStatusDto) { return this.ordersService.updateStatus(id, dto); }
  @Delete(':id') @Roles(Role.ADMIN) remove(@Param('id', ParseIntPipe) id: number) { return this.ordersService.remove(id); }
}
