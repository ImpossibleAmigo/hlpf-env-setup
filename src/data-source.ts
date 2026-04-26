import { DataSource } from "typeorm";
import { CreateTables1700000001000 } from "./migrations/1700000001000-CreateTables";
import * as dotenv from "dotenv";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [CreateTables1700000001000],
});

