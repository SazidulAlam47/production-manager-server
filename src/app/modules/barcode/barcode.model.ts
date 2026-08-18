import { Schema, model } from 'mongoose';
import { TBarcode } from './barcode.interface';

const barcodeSchema = new Schema<TBarcode>(
    {
        productId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
        },
        barcode: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

export const Barcode = model<TBarcode>('Barcode', barcodeSchema);
