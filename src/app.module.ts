import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module.js';
import { User } from './users/user.entity.js';
import { Product } from './products/product.entity.js';
import { Category } from './categories/category.entity.js';
import { ProductsModule } from './products/products.module.js';
import { CategoriesModule } from './categories/categories.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'redis',
            port: 6379,
          },
          ttl: 60000,
        }),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: 5432,
      username: process.env.DB_USERNAME || 'nestuser',
      password: process.env.DB_PASSWORD || 'nestpassword',
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