import { Product } from "./product";

export interface Receipt {
    imagePath: string;
    shopName: string;
    date: string;
    total: string;
    products: Product[]
}