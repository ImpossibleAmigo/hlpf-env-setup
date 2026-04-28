import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { ProductQueryDto } from './dto/product-query.dto.js';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Отримати продукти з пагінацією та фільтрами', description: 'Повертає список продуктів з мета-інформацією.' })
  @ApiResponse({ status: 200, description: 'Список продуктів повернуто успішно' })
  findAll(@Query() query: ProductQueryDto) { 
    return this.productsService.findAll(query); 
  }

  @Get(':id')
  @ApiOperation({ summary: 'Отримати продукт за ID' })
  @ApiParam({ name: 'id', description: 'Ідентифікатор продукту' })
  findOne(@Param('id', ParseIntPipe) id: number) { 
    return this.productsService.findOne(id); 
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Створити продукт (admin)' })
  create(@Body() dto: CreateProductDto) { 
    return this.productsService.create(dto); 
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Оновити продукт (admin)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Видалити продукт (admin)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
