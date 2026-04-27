import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всі продукти' })
  @ApiResponse({ status: 200, description: 'Список продуктів повернуто успішно' })
  findAll() { return this.productsService.findAll(); }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор продукту' })
  @ApiResponse({ status: 200, description: 'Продукт знайдено' })
  @ApiResponse({ status: 404, description: 'Продукт не знайдено' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.productsService.findOne(id); }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити продукт (admin)' })
  @ApiResponse({ status: 201, description: 'Продукт створено' })
  create(@Body() dto: CreateProductDto) { return this.productsService.create(dto); }
}