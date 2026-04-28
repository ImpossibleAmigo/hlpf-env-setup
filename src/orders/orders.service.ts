import { Injectable, NotFoundException, BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { Product } from '../products/product.entity.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderQueryDto } from './dto/order-query.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';
import { OrderStatus } from '../common/enums/order-status.enum.js';
import { Role } from '../auth/enums/role.enum.js';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    private readonly dataSource: DataSource,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async create(dto: CreateOrderDto, userId: number): Promise<Order> {
    const qr = this.dataSource.createQueryRunner();
    await qr.connect(); await qr.startTransaction();
    try {
      let totalPrice = 0; const orderItems: OrderItem[] = [];
      for (const item of dto.items) {
        const product = await qr.manager.findOne(Product, { where: { id: Number(item.productId) } });
        if (!product) throw new NotFoundException(`Product #${Number(item.productId)} not found`);
        if (product.stock < Number(item.quantity)) {
          throw new BadRequestException(`Insufficient stock for "${product.name}"`);
        }
        product.stock -= Number(item.quantity);
        await qr.manager.save(product);
        const orderItem = qr.manager.create(OrderItem, {
          product, quantity: Number(item.quantity), price: product.price,
        });
        orderItems.push(orderItem);
        totalPrice += Number(product.price) * Number(item.quantity);
      }
      const order = qr.manager.create(Order, {
        user: { id: userId } as any, items: orderItems, totalPrice, status: OrderStatus.PENDING,
      });
      const saved = await qr.manager.save(order);
      await qr.commitTransaction();
      await this.clearProductsCache();
      return saved;
    } catch (err) { await qr.rollbackTransaction(); throw err; } finally { await qr.release(); }
  }

  async findAll(query: OrderQueryDto, userId: number, role: Role) {
    const qb = this.orderRepo.createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoinAndSelect('item.product', 'product');
    if (role !== Role.ADMIN) qb.andWhere('order.userId = :userId', { userId });
    if (query.status) qb.andWhere('order.status = :status', { status: query.status });
    return qb.skip((query.page - 1) * query.pageSize).take(query.pageSize).getMany();
  }

  async findOne(id: number, userId: number, role: Role) {
    const order = await this.orderRepo.findOne({ where: { id }, relations: ['items', 'items.product', 'user'] });
    if (!order) throw new NotFoundException();
    if (role !== Role.ADMIN && order.user.id !== userId) throw new ForbiddenException('Ownership check failed');
    return order;
  }

  async updateStatus(id: number, dto: UpdateOrderStatusDto) {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new NotFoundException();
    order.status = dto.status;
    return this.orderRepo.save(order);
  }

  async remove(id: number) { return this.orderRepo.delete(id); }

  private async clearProductsCache() {
    const keys: string[] = await (this.cacheManager as any).store?.keys('products:*') || [];
    if (keys.length > 0) await Promise.all(keys.map(k => this.cacheManager.del(k)));
  }
}
