import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProducts();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Products fetched successfully',
        data: result,
    });
});

const getProductById = catchAsync(async (req, res) => {
    const result = await ProductServices.getProductById(
        req.params.productId as string,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Product fetched successfully',
        data: result,
    });
});

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProduct(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Product created successfully',
        data: result,
    });
});

const updateProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.updateProduct(
        req.params.productId as string,
        req.body,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Product updated successfully',
        data: result,
    });
});

const deleteProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.deleteProduct(
        req.params.productId as string,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Product deleted successfully',
        data: result,
    });
});

export const ProductControllers = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
