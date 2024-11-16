import { Request, Response } from 'express';
import { ProductService } from '../services/product_V2.service';
import Product from '../models/product_V2.model';
import { logger } from '../utils/logger';

export class ProductController {

    
    public async getProducts(req: Request, res: Response): Promise<void> {

        // req.query https://www.shecodes.io/athena/72173-what-does-req-query-do-in-express-js#:~:text=in%203.34%20seconds-,In%20Express.,URL%20after%20a%20question%20mark.
        const minPrice = parseFloat(String(req.query.minPrice));
        const maxPrice = parseFloat(String(req.query.maxPrice));
        const minStock = parseInt(String(req.query.minStock));
        const maxStock = parseInt(String(req.query.maxStock));

        const products = await ProductService.getAllProducts(minPrice, maxPrice, minStock, maxStock);
        res.json(products);
        logger.info('GET /v1/products - getAllProducts');
    }

    public async postProduct(req: Request, res: Response): Promise<void> {
        
        if (req.body.title == undefined || req.body.price == undefined || req.body.description == undefined || req.body.count == undefined) {
            res.status(400).send('Valeurs manquantes')
            logger.info('POST /v1/products - Valeurs manquantes');
        }else{
            const newProduct = new Product()
            newProduct.name = req.body.title;
            newProduct.description = req.body.description;
            newProduct.category = "not set";
            newProduct.quantity = req.body.count;
            newProduct.price = req.body.price;

            const titleRegex = /^.{3,50}$/;
            const priceRegex = /^(?:0|[1-9]\d*)(?:\.\d+)?$/;
            const countRegex = /^[1-9]\d*$/; 
            if (!titleRegex.test(newProduct.name)) {
                res.status(400).send('Le titre doit contenir entre 3 et 50 caractères');
                logger.info('POST /v1/products - Titre Invalide');
            }else if (!priceRegex.test(newProduct.price.toString())) {
                res.status(400).send('Le prix doit être un nombre positif');
                logger.info('POST /v1/products - Prix Invalide');
            }else if (!countRegex.test(newProduct.quantity.toString())) {
                res.status(400).send('La quantité doit être un entier positif');
                logger.info('POST /v1/products - Quantité invalide');
            }else{
                const products = await ProductService.postProduct(newProduct);
                res.status(201)
                res.json(products);
                logger.info('POST /v1/products - postProduct');
            }
        }
    }
    
    public async putProducts(req: Request, res: Response): Promise<void> {
        const productList = await Product.find();
        const id = req.params.id;
        const name = req.body.title
        const price = req.body.price
        const description = req.body.description
        const quantity = req.body.count
        let found = false

        for (let index = 0; index < productList.length; index++) {
            const element = productList[index];
            if (element.id == id) {
                found = true
            }
        }
        if( id == undefined || name == undefined || price == undefined || description == undefined || quantity == undefined ){
            res.status(400).send('Valeurs manquantes')
            logger.info('PUT /v1/products/'+id+' - Valeurs manquantes');
        }else if (found) {
            const products = await ProductService.putProduct(id,name,price,description,quantity);
            res.json(products);
            logger.info('PUT /v1/products/'+id+' - putProduct');
        }else{
            res.status(404).send('Produit inexistant')
            logger.info('PUT /v1/products/'+id+' - Produit inexistant');
        }
        
    }

    public async deleteProducts(req: Request, res: Response): Promise<void> {
        const productList = await Product.find();
        const id = req.params.id;
        let found = false

        for (let index = 0; index < productList.length; index++) {
            const element = productList[index];
            if (element.id == id) {
                found = true
                productList.splice(index, 1);
                
            }
        }
        if (found) {
            await Product.findByIdAndDelete(id)
            res.status(204).send()
            logger.info('DELETE /v1/products'+id+' - deleteProducts');
        }else{
            res.status(404).send('Produit inexistant')
            logger.info('DELETE /v1/products'+id+' - Produit inexistant');
        }
        
    }
}
