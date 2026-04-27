import { AppDataSource } from './data-source.js';

// РЎРєСЂРёРїС‚ РґР»СЏ РїРµСЂРµРІС–СЂРєРё РЅР°СЏРІРЅРѕСЃС‚С– С‚Р°Р±Р»РёС†СЊ Сѓ Р±Р°Р·С– РґР°РЅРёС… (РґР»СЏ РЎРєСЂС–РЅС€РѕС‚Сѓ в„–3)
async function verifyDatabase() {
  try {
    console.log('--- РџРѕС‡Р°С‚РѕРє РїРµСЂРµРІС–СЂРєРё Р±Р°Р·Рё РґР°РЅРёС… ---');
    // Р†РЅС–С†С–Р°Р»С–Р·СѓС”РјРѕ Р·РІ'СЏР·РѕРє
    await AppDataSource.initialize();
    console.log('вњ… РЈСЃРїС–С€РЅРµ РїС–РґРєР»СЋС‡РµРЅРЅСЏ РґРѕ PostgreSQL С‡РµСЂРµР· TypeORM!');

    // Р—Р°РїРёС‚ РґР»СЏ РѕС‚СЂРёРјР°РЅРЅСЏ СЃРїРёСЃРєСѓ С‚Р°Р±Р»РёС†СЊ
    const queryRunner = AppDataSource.createQueryRunner();
    const tables = await queryRunner.query(
      `SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`
    );

    if (tables.length === 0) {
      console.log('вљ пёЏ РўР°Р±Р»РёС†СЊ РЅРµ Р·РЅР°Р№РґРµРЅРѕ. РџРµСЂРµРєРѕРЅР°Р№С‚РµСЃСЏ, С‰Рѕ РјС–РіСЂР°С†С–С— Р±СѓР»Рё Р·Р°РїСѓС‰РµРЅС– СѓСЃРїС–С€РЅРѕ.');
    } else {
      console.log('\nРЎРїРёСЃРѕРє СЃС‚РІРѕСЂРµРЅРёС… С‚Р°Р±Р»РёС†СЊ Сѓ СЃС…РµРјС– public:');
      console.table(tables);
      console.log('\n--- РџРµСЂРµРІС–СЂРєР° Р·Р°РІРµСЂС€РµРЅР° СѓСЃРїС–С€РЅРѕ ---');
    }

    await AppDataSource.destroy();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('вќЊ РџРѕРјРёР»РєР° РїС–РґРєР»СЋС‡РµРЅРЅСЏ Р°Р±Рѕ РІРёРєРѕРЅР°РЅРЅСЏ Р·Р°РїРёС‚Сѓ:', message);
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
