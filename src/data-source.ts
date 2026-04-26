import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/user.entity.js';
import { Product } from './products/product.entity.js';
import { Category } from './categories/category.entity.js';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'postgres_db',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'nestuser',
    password: process.env.DB_PASSWORD || 'nestpass',
    database: process.env.DB_DATABASE || 'nestdb',
    synchronize: false,
    logging: true,
    entities: [User, Product, Category],
    migrations: ['src/migrations/*.ts'],
    migrationsRun: true, // ЦЕ ВАЖЛИВО: NestJS сам запустить міграції при старті
});
