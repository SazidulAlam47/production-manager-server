import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
    {
        date: {
            type: Date,
            required: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        plannedQuantity: {
            type: Number,
            required: true,
        },
        productionQuantity: {
            type: Number,
            default: 0,
        },
        manufacturingOrder: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Product = model<TProduct>('Product', productSchema);
