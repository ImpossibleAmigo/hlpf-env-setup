import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, Relation } from 'typeorm';
import { User } from '../../users/user.entity.js';
import { OrderItem } from './order-item.entity.js';
import { OrderStatus } from '../../common/enums/order-status.enum.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalPrice: number;

  @ManyToOne(() => User, { eager: false })
  user: User;

  @OneToMany(() => OrderItem, (item) => item.order, { eager: true, cascade: true })
  items: Relation<OrderItem>[]; // Використовуємо Relation

  @CreateDateColumn()
  createdAt: Date;
}
