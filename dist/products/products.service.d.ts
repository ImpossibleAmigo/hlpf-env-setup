import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductsService {
    private readonly productRepo;
    constructor(productRepo: Repository<Product>);
    findAll(): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    create(data: any): Promise<Product>;
    update(id: number, data: any): Promise<Product>;
    remove(id: number): Promise<void>;
}
