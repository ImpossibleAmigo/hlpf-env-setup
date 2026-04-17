import { Category } from '../categories/category.entity';
export declare class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    stock: number;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}
