import express from 'express';
import { addReview, createProduct, getProductById, getProducts } from '../controllers/productController.js';

const router = express.Router();

// Define routes
router.get('/products', getProducts);
router.get("/products/:id", getProductById)
router.post('/products', createProduct)
router.post('/products/:id/review', addReview)



export default router;