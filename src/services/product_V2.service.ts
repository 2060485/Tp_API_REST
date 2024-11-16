import Product from '../models/product_V2.model';
import { Products_V2 } from '../interfaces/product_V2.interface';

export class ProductService {
    public static async getAllProducts(minPrice?: number,maxPrice?: number,minStock?: number,maxStock?: number): Promise<Products_V2[]> {
        const products = await Product.find();
        const filteredProducts = [];

        for (const product of products) {
            const price = product.price;
            const stock = product.quantity;

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

    public static async postProduct(newProductData: Products_V2): Promise<Products_V2> {
        const newProduct = new Product(newProductData);
        const savedProduct = await newProduct.save();
        return savedProduct;
    }

    public static async putProduct(id: string, name: string, price: number, description: string, quantity: number): Promise<Products_V2[]> {
        const editedProduct = await Product.findById(id);
        editedProduct.name = name;
        editedProduct.price = price;
        editedProduct.description = description;
        editedProduct.quantity = quantity;
        editedProduct.save();
        return editedProduct;
    }
}
