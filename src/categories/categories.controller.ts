import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати всі категорії' })
  findAll() { return this.categoriesService.findAll(); }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити категорію (admin)' })
  create(@Body() dto: CreateCategoryDto) { return this.categoriesService.create(dto); }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Оновити категорію (admin)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoryDto) { return this.categoriesService.update(id, dto); }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Видалити категорію (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.categoriesService.remove(id); }
}
