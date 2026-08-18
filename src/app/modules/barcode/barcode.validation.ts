import z from 'zod';

const createBarcode = z.object({
    productId: z.string(),
    barcode: z.string(),
});

export const BarcodeValidations = {
    createBarcode,
};
