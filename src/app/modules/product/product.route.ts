import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductControllers } from './product.controller';
import { ProductValidations } from './product.validation';

const router = express.Router();

router.get('/', ProductControllers.getAllProducts);
router.get('/daily-summary', ProductControllers.getDailySummary);
router.get('/:productId', ProductControllers.getProductById);

router.post(
    '/',
    validateRequest(ProductValidations.createProduct),
    ProductControllers.createProduct,
);

router.patch(
    '/:productId',
    validateRequest(ProductValidations.updateProduct),
    ProductControllers.updateProduct,
);

router.delete('/:productId', ProductControllers.deleteProduct);

export const ProductRoutes = router;
