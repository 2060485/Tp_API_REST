import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';


const router = Router();
const productController = new ProductController();

router.get('/', productController.getProducts);
router.post('/',verifyToken, productController.postProduct);
router.put('/:id', productController.putProducts);
router.delete('/:id',verifyToken, productController.deleteProducts);

export default router;
