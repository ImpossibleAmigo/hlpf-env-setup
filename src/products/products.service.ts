import { Injectable, NotFoundException, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Product } from "./product.entity.js";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { ProductQueryDto } from "./dto/product-query.dto.js";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  private async clearProductsCache(): Promise<void> {
    const cacheManagerAny = this.cacheManager as any;
    
    // Сумісність з cache-manager v7: беремо перший store з масиву stores
    const store = cacheManagerAny.stores 
      ? cacheManagerAny.stores[0] 
      : cacheManagerAny.store;

    if (store && typeof store.keys === 'function') {
      const keys: string[] = await store.keys('products:*');
      if (keys.length > 0) {
        // В cache-manager v7 метод del знаходиться на store, а не на cacheManager
        await Promise.all(keys.map(key => store.del(key)));
      }
    }
  }

  async findAll(query: ProductQueryDto) {
    const cacheKey = `products:${JSON.stringify(query)}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const { page = 1, pageSize = 10, sort = 'created_at', order = 'desc', categoryId, minPrice, maxPrice, search } = query;

    const qb = this.productRepo.createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category');

    if (categoryId) {
      qb.andWhere('category.id = :categoryId', { categoryId });
    }

    if (minPrice !== undefined) {
      qb.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      qb.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (search) {
      qb.andWhere('product.name ILIKE :search', { search: `%${search}%` });
    }

    qb.orderBy(`product.${sort}`, order.toUpperCase() as 'ASC' | 'DESC');

    const skip = (page - 1) * pageSize;
    qb.skip(skip).take(pageSize);

    const [items, total] = await qb.getManyAndCount();
    const result = {
      items,
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };

    await this.cacheManager.set(cacheKey, result, 60000);
    return result;
  }

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
    const saved = await this.productRepo.save(product);
    await this.clearProductsCache();
    return saved;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    const { categoryId, ...data } = dto;
    Object.assign(product, data);
    if (categoryId !== undefined) product.category = categoryId ? ({ id: categoryId } as any) : null;
    const saved = await this.productRepo.save(product);
    await this.clearProductsCache();
    return saved;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    const deleted = await this.productRepo.remove(product);
    await this.clearProductsCache();
    return deleted;
  }
}