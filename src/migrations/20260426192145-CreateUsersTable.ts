import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable20260426192145 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "email" varchar UNIQUE NOT NULL,
                "password" varchar NOT NULL,
                "role" "users_role_enum" NOT NULL DEFAULT 'user',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }
}
