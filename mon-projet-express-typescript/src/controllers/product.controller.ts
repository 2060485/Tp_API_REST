import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

export class ProductController {

    
    public async getProducts(req: Request, res: Response): Promise<void> {

        // req.query https://www.shecodes.io/athena/72173-what-does-req-query-do-in-express-js#:~:text=in%203.34%20seconds-,In%20Express.,URL%20after%20a%20question%20mark.
        const minPrice = parseFloat(String(req.query.minPrice));
        const maxPrice = parseFloat(String(req.query.maxPrice));
        const minStock = parseInt(String(req.query.minStock));
        const maxStock = parseInt(String(req.query.maxStock));

        const products = await ProductService.getAllProducts(minPrice, maxPrice, minStock, maxStock);
        res.json(products);
    }

    public async postProduct(req: Request, res: Response): Promise<void> {
        
        if (req.body.title == undefined || req.body.price == undefined || req.body.description == undefined || req.body.count == undefined) {
            res.status(400).send('Valeurs manquantes')
        }else{
            const product: Product = { 
                id: 0,
                title: req.body.title, 
                price: req.body.price, 
                description: req.body.description, 
                category: "not set", 
                image: "not set", 
                rating: {rate: 0,count: req.body.count}
            };
            const products = await ProductService.postProduct(product);
            res.json(products);
        }
    }

    public async putProducts(req: Request, res: Response): Promise<void> {

        const id = parseInt(req.params.id);
        const title = req.body.title
        const price = req.body.price
        const description = req.body.description
        const count = req.body.count
        const products = await ProductService.putProduct(id,title,price,description,count);
        res.json(products);
    }

    public async deleteProducts(req: Request, res: Response): Promise<void> {

        const id = parseInt(req.params.id);
        const products = await ProductService.deleteProduct(id);
        res.json(products);
    }
}
