/// <reference types="node" />
const { DataSource } = require('typeorm');

require('dotenv').config();

module.exports = new DataSource({
  type: 'postgres', // Замініть на ваш тип БД (наприклад, 'mysql', 'sqlite' тощо)
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'my_database',

  synchronize: false, // Рекомендується false для продакшену
  logging: process.env.NODE_ENV === 'development',

  // Шляхи до файлів (відносно поточної директорії)
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  subscribers: [__dirname + '/subscribers/*.{ts,js}'],
});