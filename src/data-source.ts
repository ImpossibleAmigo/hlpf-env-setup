import 'reflect-metadata';
import { DataSource } from 'typeorm';
// Переконайся, що імпорт точно відповідає назві файлу в папці src/categories
import { Category } from './categories/category.entity';
import { User } from './users/user.entity'; // Перевір, чи цей файл теж існує

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'nestuser',
  password: process.env.DB_PASSWORD || 'nestpassword',
  database: process.env.DB_NAME || 'nest_db',
  synchronize: false,
  logging: true,
  entities: [User, Category], // Додаємо Category сюди
  migrations: ['./src/migrations/*.ts'],
  subscribers: [],
});