import { Router } from 'express';
import { ProductController } from '../controllers/product_V2.controller';
import { verifyToken } from '../middlewares/auth.middleware';
import {verifyRole} from '../middlewares/roles.middleware';


const router = Router();
const productController = new ProductController();

/**
 * @swagger
 * /v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products from the API with optional filtering.
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Minimum price to filter products.
 *       - in: query
 *         name: maxPrice
 *         required: false
 *         schema:
 *           type: number
 *         description: Maximum price to filter products.
 *       - in: query
 *         name: minStock
 *         required: false
 *         schema:
 *           type: integer
 *         description: Minimum stock to filter products.
 *       - in: query
 *         name: maxStock
 *         required: false
 *         schema:
 *           type: integer
 *         description: Maximum stock to filter products.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Product Name"
 *                   price:
 *                     type: number
 *                     example: 19.99
 *                   description:
 *                     type: string
 *                     example: "A brief description of the product."
 *                   category:
 *                     type: string
 *                     example: "not set"
 *                   image:
 *                     type: string
 *                     example: "not set"
 *                   rating:
 *                     type: object
 *                     properties:
 *                       rate:
 *                         type: number
 *                         example: 4.5
 *                       count:
 *                         type: integer
 *                         example: 10
 */

/**
 * @swagger
 * /v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Product"
 *               price:
 *                 type: number
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 example: "Description of the new product."
 *               count:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 title:
 *                   type: string
 *                   example: "New Product"
 *                 price:
 *                   type: number
 *                   example: 29.99
 *                 description:
 *                   type: string
 *                   example: "Description of the new product."
 *       400:
 *         description: Missing required fields or validation errors
 *       401:
 *         description: No permission
 */

/**
 * @swagger
 * /v1/products/:id:
 *   put:
 *     summary: Update an existing product
 *     description: Updates a product in the database by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 example: 24.99
 *               description:
 *                 type: string
 *                 example: "Updated description."
 *               count:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Updated Product Name"
 *                 price:
 *                   type: number
 *                   example: 24.99
 *                 description:
 *                   type: string
 *                   example: "Updated description."
 *       400:
 *         description: Missing required fields or validation errors
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /v1/products/:id:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes a product from the database by ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: No permission
 */



router.get('/',verifyToken, productController.getProducts);
router.post('/',verifyToken,verifyRole, productController.postProduct);
router.put('/:id',verifyToken, productController.putProducts);
router.delete('/:id',verifyToken,verifyRole, productController.deleteProducts);

export default router;
