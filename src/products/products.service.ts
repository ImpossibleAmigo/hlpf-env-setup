import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private readonly productRepo: Repository<Product>) {}
  findAll() { return this.productRepo.find({ relations: ["category"] }); }
  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id }, relations: ["category"] });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }
  async create(dto: CreateProductDto) {
    const { categoryId, ...data } = dto;
    const product = this.productRepo.create({
      ...data,
      category: categoryId ? ({ id: categoryId } as any) : undefined
    });
    return this.productRepo.save(product);
  }
  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    const { categoryId, ...data } = dto;
    Object.assign(product, data);
    if (categoryId !== undefined) product.category = categoryId ? ({ id: categoryId } as any) : null;
    return this.productRepo.save(product);
  }
  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
