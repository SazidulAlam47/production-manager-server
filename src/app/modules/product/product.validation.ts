import z from 'zod';

const createProduct = z.object({
    date: z.string().date(),
    productName: z.string(),
    plannedQuantity: z.number(),
    manufacturingOrder: z.string(),
});

const updateProduct = z.object({
    date: z.string().date().optional(),
    productName: z.string().optional(),
    plannedQuantity: z.number().optional(),
    manufacturingOrder: z.string().optional(),
});

export const ProductValidations = {
    createProduct,
    updateProduct,
};
