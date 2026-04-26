"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./categories/category.entity");
const product_entity_1 = require("./products/product.entity");
const _1700000001_CreateTables_1 = require("./migrations/1700000001-CreateTables");
const _1776437225119_AddIsActiveToProducts_1 = require("./migrations/1776437225119-AddIsActiveToProducts");
const dotenv = require("dotenv");
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'nestjs_db',
    entities: [category_entity_1.Category, product_entity_1.Product],
    migrations: [_1700000001_CreateTables_1.CreateTables1700000001, _1776437225119_AddIsActiveToProducts_1.AddIsActiveToProducts1776437225119],
    synchronize: false,
});
//# sourceMappingURL=data-source.js.map