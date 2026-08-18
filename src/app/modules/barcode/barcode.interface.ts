import { Types } from 'mongoose';

export type TBarcode = {
    productId: Types.ObjectId;
    barcode: string;
};
