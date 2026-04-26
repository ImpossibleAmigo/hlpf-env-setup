"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const categories_module_1 = require("./categories/categories.module");
const products_module_1 = require("./products/products.module");
const category_entity_1 = require("./categories/category.entity");
const product_entity_1 = require("./products/product.entity");
const _1700000001_CreateTables_1 = require("./migrations/1700000001-CreateTables");
const _1776437225119_AddIsActiveToProducts_1 = require("./migrations/1776437225119-AddIsActiveToProducts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST', 'db'),
                    port: configService.get('DB_PORT', 5432),
                    username: configService.get('DB_USERNAME', 'postgres'),
                    password: configService.get('DB_PASSWORD', 'postgres'),
                    database: configService.get('DB_NAME', 'nestjs_db'),
                    entities: [category_entity_1.Category, product_entity_1.Product],
                    migrations: [_1700000001_CreateTables_1.CreateTables1700000001, _1776437225119_AddIsActiveToProducts_1.AddIsActiveToProducts1776437225119],
                    migrationsRun: true,
                    synchronize: false,
                }),
                inject: [config_1.ConfigService],
            }),
            categories_module_1.CategoriesModule,
            products_module_1.ProductsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map