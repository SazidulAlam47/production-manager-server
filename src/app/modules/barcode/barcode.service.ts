import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Barcode } from './barcode.model';
import { TBarcode } from './barcode.interface';
import { Product } from '../product/product.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllBarcode = async (query: Record<string, unknown>) => {
    const barcodeQuery = new QueryBuilder(Barcode.find(), query)
        .search(['barcode'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await barcodeQuery.modelQuery;
    const meta = await barcodeQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getAllBarcodeByProductId = async (
    productId: string,
    query: Record<string, unknown>,
) => {
    const barcodeQuery = new QueryBuilder(
        Barcode.find({ productId }),
        query,
    )
        .search(['barcode'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await barcodeQuery.modelQuery;
    const meta = await barcodeQuery.countTotal();

    return {
        meta,
        result,
    };
};

const getBarcodeById = async (barcodeId: string) => {
    const barcode = await Barcode.findById(barcodeId);
    if (!barcode) {
        throw new ApiError(status.NOT_FOUND, 'Barcode not found');
    }
    return barcode;
};

const createBarcode = async (payload: TBarcode) => {
    const existingBarcode = await Barcode.findOne({
        barcode: payload.barcode,
    });
    if (existingBarcode) {
        throw new ApiError(status.CONFLICT, 'Barcode already exists');
    }
    // increment production quantity of the product by 1
    const product = await Product.findById(payload.productId);
    if (!product) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }
    product.productionQuantity += 1;
    await product.save();
    const result = await Barcode.create(payload);
    return result;
};

const deleteBarcode = async (barcodeId: string) => {
    const barcode = await Barcode.findById(barcodeId);
    if (!barcode) {
        throw new ApiError(status.NOT_FOUND, 'Barcode not found');
    }
    const product = await Product.findById(barcode.productId);
    if (!product) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }
    // decrement production quantity of the product by 1
    product.productionQuantity -= 1;
    await product.save();
    const result = await Barcode.findByIdAndDelete(barcode._id);
    return result;
};

export const BarcodeServices = {
    createBarcode,
    deleteBarcode,
    getAllBarcode,
    getAllBarcodeByProductId,
    getBarcodeById,
};
