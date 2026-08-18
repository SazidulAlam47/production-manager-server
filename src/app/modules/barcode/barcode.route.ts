import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BarcodeControllers } from './barcode.controller';
import { BarcodeValidations } from './barcode.validation';

const router = express.Router();

router.get('/', BarcodeControllers.getAllBarcode);
router.get('/product/:productId', BarcodeControllers.getAllBarcodeByProductId);
router.get('/:barcodeId', BarcodeControllers.getBarcodeById);

router.post(
    '/',
    validateRequest(BarcodeValidations.createBarcode),
    BarcodeControllers.createBarcode,
);

router.delete('/:barcodeId', BarcodeControllers.deleteBarcode);

export const BarcodeRoutes = router;
