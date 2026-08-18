import status from 'http-status';
import ApiError from '../../errors/ApiError';

import { TProduct } from './product.interface';
import { Product } from './product.model';

const getAllProducts = async () => {
    const result = await Product.find();
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
    const existingProduct = await Product.findOne({
        productName: payload.productName,
    });
    if (existingProduct) {
        throw new ApiError(
            status.CONFLICT,
            'Product with this name already exists',
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
