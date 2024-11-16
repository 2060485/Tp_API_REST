import { Products } from '../interfaces/product.interface';
import fs from 'fs/promises';
import { Product } from '../models/product.model';

export class ProductService {
    public static async getAllProducts(minPrice?: number,maxPrice?: number,minStock?: number,maxStock?: number): Promise<Products[]> {
        const data = await fs.readFile('./src/data/products.json', 'utf-8');
        const products = JSON.parse(data);
        const filteredProducts = [];

        for (const product of products) {
            const price = product.price;
            const stock = product.rating.count;

            if (minPrice != null && price < minPrice) {
                
            }else if (maxPrice != null && price > maxPrice) {
                
            }else if (minStock != null && stock < minStock) {
                
            }else if (maxStock != null && stock > maxStock) {
                
            }else{
                filteredProducts.push(product);
            }
        }
        return filteredProducts;
    }

    public static async postProduct(product: Product): Promise<Products[]> {
        const data = await fs.readFile('./src/data/products.json', 'utf-8');
        const products = JSON.parse(data);
        const lastProduct = products[products.length-1];
        product.id = lastProduct.id+1
        products.push(product)
        fs.writeFile('./src/data/products.json', JSON.stringify(products, null, 2))
        return products;
    }

    public static async putProduct(id: number, title:string,price:number,description:string,count:number): Promise<Products[]> {
        const data = await fs.readFile('./src/data/products.json', 'utf-8');
        const products = JSON.parse(data);
        if (id > products.length) {
            return products
        }
        const editedProduct = products[id-1];
        editedProduct.title = title;
        editedProduct.price = price;
        editedProduct.description = description;
        editedProduct.rating.count = count;
        products.push(editedProduct)
        fs.writeFile('./src/data/products.json', JSON.stringify(products, null, 2))
        return products;
    }
}
