import { AppDataSource } from './data-source';

// Скрипт для перевірки наявності таблиць у базі даних (для Скріншоту №3)
async function verifyDatabase() {
  try {
    console.log('--- Початок перевірки бази даних ---');
    // Ініціалізуємо зв'язок
    await AppDataSource.initialize();
    console.log('✅ Успішне підключення до PostgreSQL через TypeORM!');

    // Запит для отримання списку таблиць
    const queryRunner = AppDataSource.createQueryRunner();
    const tables = await queryRunner.query(
      `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`
    );

    if (tables.length === 0) {
      console.log('⚠️ Таблиць не знайдено. Переконайтеся, що міграції були запущені успішно.');
    } else {
      console.log('\nСписок створених таблиць у схемі public:');
      console.table(tables);
      console.log('\n--- Перевірка завершена успішно ---');
    }

    await AppDataSource.destroy();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('❌ Помилка підключення або виконання запиту:', message);
    process.exit(1);
  }
}

verifyDatabase();import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;
}