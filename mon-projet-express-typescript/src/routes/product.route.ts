import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';


const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/', productController.postProduct);
router.put('/:id', productController.putProducts);
router.delete('/:id', productController.deleteProducts);

export default router;
