import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productRepo.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({ where: { id }, relations: ['category'] });
    if (!product) throw new NotFoundException('Product with ID ' + id + ' not found');
    return product;
  }

  async create(data: any): Promise<Product> {
    const product = this.productRepo.create({
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      category: data.categoryId ? ({ id: data.categoryId } as any) : null,
    });
    return this.productRepo.save(product);
  }

  async update(id: number, data: any): Promise<Product> {
    const product = await this.findOne(id);
    if (data.categoryId !== undefined) {
      product.category = { id: data.categoryId } as any;
    }
    if (data.name !== undefined) product.name = data.name;
    if (data.description !== undefined) product.description = data.description;
    if (data.price !== undefined) product.price = data.price;
    if (data.stock !== undefined) product.stock = data.stock;
    if (data.isActive !== undefined) product.isActive = data.isActive;
    
    return this.productRepo.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
  }
}