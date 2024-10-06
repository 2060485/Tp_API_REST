import { Products } from '../interfaces/product.interface';
import fs from 'fs/promises';

export class ProductService {
    public static async getAllProducts(minPrice?: number,maxPrice?: number,minStock?: number,maxStock?: number): Promise<Products[]> {
        const data = await fs.readFile('./src/data/products.json', 'utf-8');
        const products = JSON.parse(data);
        const filteredProducts = [];

        for (const product of products) {
            const price = product.price;
            const stock = product.rating.count;

            let isValid = true;

            if (minPrice != null && price < minPrice) {
                isValid = false;
            }if (maxPrice != null && price > maxPrice) {
                isValid = false;
            }if (minStock != null && stock < minStock) {
                isValid = false;
            }if (maxStock != null && stock > maxStock) {
                isValid = false;
            }if (isValid) {
                filteredProducts.push(product);
            }
        }
        return filteredProducts;
    }
}
