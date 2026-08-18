import { Router } from 'express';
import { ProductRoutes } from '../modules/product/product.route';
import { BarcodeRoutes } from '../modules/barcode/barcode.route';
const router = Router();

const moduleRoutes = [
    {
        path: '/products',
        route: ProductRoutes,
    },
    {
        path: '/barcode',
        route: BarcodeRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
