import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { User } from './users/user.entity.js';
import { Product } from './products/product.entity.js';
import { Category } from './categories/category.entity.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres_db',
      port: 5432,
      username: process.env.DB_USERNAME || 'nestuser',
      password: process.env.DB_PASSWORD || 'nestpass',
      database: process.env.DB_DATABASE || 'nestdb',
      entities: [User, Product, Category],
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
    }),
    AuthModule,
    ProductsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
