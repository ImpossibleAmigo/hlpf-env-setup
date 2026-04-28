import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ds = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres_db',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'nestuser',
  password: process.env.DB_PASSWORD || 'nestpassword',
  database: process.env.DB_DATABASE || 'nestdb',
  entities: ['src/**/*.entity.ts'],
});

async function seed() {
  try {
    await ds.initialize();
    console.log('Database connected for seeding...');

    const cats = ['Electronics', 'Accessories', 'Clothing'];
    for (const name of cats) {
      await ds.query("INSERT INTO categories (name) VALUES ($1) ON CONFLICT DO NOTHING", [name]);
    }

    const products = [
      { name: 'iPhone 16', price: 999, stock: 50, cat: 1 },
      { name: 'Galaxy S24', price: 849, stock: 40, cat: 1 },
      { name: 'MacBook Pro', price: 2499, stock: 15, cat: 1 },
      { name: 'iPad Air', price: 599, stock: 30, cat: 1 },
      { name: 'AirPods Pro', price: 249, stock: 100, cat: 2 },
      { name: 'USB-C Cable', price: 19, stock: 500, cat: 2 },
      { name: 'MagSafe Charger', price: 39, stock: 80, cat: 2 },
      { name: 'Laptop Sleeve', price: 49, stock: 60, cat: 2 },
      { name: 'T-Shirt Dev', price: 25, stock: 200, cat: 3 },
      { name: 'Hoodie NestJS', price: 55, stock: 75, cat: 3 },
    ];

    for (let i = 0; i < 3; i++) {
      for (const p of products) {
        const suffix = i > 0 ? ` v${i + 1}` : '';
        await ds.query(
          `INSERT INTO products (name, price, stock, "category_id", "isActive") VALUES ($1, $2, $3, $4, true) ON CONFLICT DO NOTHING`,
          [`${p.name}${suffix}`, p.price + (i * 10), p.stock, p.cat]
        );
      }
    }

    console.log('Seed complete: 3 categories, 30 products');
    await ds.destroy();
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
}

seed();