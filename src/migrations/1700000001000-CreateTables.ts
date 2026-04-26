import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1700000001000 implements MigrationInterface {
    name = "CreateTables1700000001000"

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Створюємо таблиці, якщо їх ще немає
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "category" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500), CONSTRAINT "PK_9c4e4a89977d0311dd872efe21c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "product" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(1000), "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL DEFAULT 0, "categoryId" integer, CONSTRAINT "PK_bebc3511482d334005886d38e6" PRIMARY KEY ("id"))`);

        // Додаємо зовнішній ключ тільки якщо його не існує (чистий SQL)
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_ff568519ca47f630606334544d6') THEN
                    ALTER TABLE "product" ADD CONSTRAINT "FK_ff568519ca47f630606334544d6" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
                END IF;
            END $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT IF EXISTS "FK_ff568519ca47f630606334544d6"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "product"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "category"`);
    }
}