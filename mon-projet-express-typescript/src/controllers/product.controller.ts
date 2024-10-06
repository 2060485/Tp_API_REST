import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
    public async getProducts(req: Request, res: Response): Promise<void> {
        const minPrice = parseFloat(String(req.query.minPrice));
        const maxPrice = parseFloat(String(req.query.maxPrice));
        const minStock = parseInt(String(req.query.minStock));
        const maxStock = parseInt(String(req.query.maxStock));

        const products = await ProductService.getAllProducts(minPrice, maxPrice, minStock, maxStock);
        console.log(req.query.minStock)
        res.json(products);
    }
}
