import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { Category } from './categories/category.entity';
import { Product } from './products/product.entity';
import { CreateTables1700000001 } from './migrations/1700000001-CreateTables';
import { AddIsActiveToProducts1776437225119 } from './migrations/1776437225119-AddIsActiveToProducts';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'db'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'postgres'),
        database: configService.get<string>('DB_NAME', 'nestjs_db'),
        entities: [Category, Product],
        migrations: [CreateTables1700000001, AddIsActiveToProducts1776437225119],
        migrationsRun: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    ProductsModule,
  ],
})
export class AppModule {}
