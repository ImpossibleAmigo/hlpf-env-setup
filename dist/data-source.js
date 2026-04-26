"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./categories/category.entity");
const user_entity_1 = require("./users/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'nestuser',
    password: process.env.DB_PASSWORD || 'nestpassword',
    database: process.env.DB_NAME || 'nest_db',
    synchronize: false,
    logging: true,
    entities: [user_entity_1.User, category_entity_1.Category],
    migrations: ['./src/migrations/*.ts'],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map