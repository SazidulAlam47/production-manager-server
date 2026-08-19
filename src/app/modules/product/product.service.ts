import status from 'http-status';
import ApiError from '../../errors/ApiError';
import { Barcode } from '../barcode/barcode.model';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import getDayRange from '../../utils/getDayRange';

const getAllProducts = async () => {
    const result = await Product.find().sort({ date: -1, createdAt: -1 });
    return result;
};

const getProductById = async (productId: string) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }
    return product;
};

const createProduct = async (payload: TProduct) => {
    const { startOfDay, endOfDay } = getDayRange(payload.date);

    // Check if same product exists on the same date
    const existingProduct = await Product.findOne({
        productName: {
            $regex: new RegExp(`^${payload.productName.trim()}$`, 'i'),
        },
        date: {
            $gte: startOfDay,
            $lte: endOfDay,
        },
    });

    if (existingProduct) {
        throw new ApiError(
            status.CONFLICT,
            `Product "${payload.productName}" already exists on this date`,
        );
    }

    const result = await Product.create(payload);
    return result;
};

const updateProduct = async (productId: string, payload: Partial<TProduct>) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }

    const checkProductName = payload.productName || product.productName;
    const checkDate = payload.date || product.date;

    if (payload.productName || payload.date) {
        const { startOfDay, endOfDay } = getDayRange(checkDate);

        const existingProduct = await Product.findOne({
            _id: { $ne: product._id },
            productName: {
                $regex: new RegExp(`^${checkProductName.trim()}$`, 'i'),
            },
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        if (existingProduct) {
            throw new ApiError(
                status.CONFLICT,
                `Product "${checkProductName}" already exists on this date`,
            );
        }
    }

    const result = await Product.findByIdAndUpdate(product._id, payload, {
        new: true,
    });
    return result;
};

const deleteProduct = async (productId: string) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(status.NOT_FOUND, 'Product not found');
    }

    await Barcode.deleteMany({ productId: product._id });
    const result = await Product.findByIdAndDelete(product._id);
    return result;
};

export const ProductServices = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
};
