import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BarcodeServices } from './barcode.service';

const getAllBarcode = catchAsync(async (req, res) => {
    const result = await BarcodeServices.getAllBarcode();
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Barcodes fetched successfully',
        data: result,
    });
});

const getBarcodeById = catchAsync(async (req, res) => {
    const result = await BarcodeServices.getBarcodeById(
        req.params.barcodeId as string,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Barcode fetched successfully',
        data: result,
    });
});

const getAllBarcodeByProductId = catchAsync(async (req, res) => {
    const result = await BarcodeServices.getAllBarcodeByProductId(
        req.params.productId as string,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Barcodes fetched successfully',
        data: result,
    });
});

const createBarcode = catchAsync(async (req, res) => {
    const result = await BarcodeServices.createBarcode(req.body);
    sendResponse(res, {
        statusCode: status.CREATED,
        message: 'Barcode created successfully',
        data: result,
    });
});

const deleteBarcode = catchAsync(async (req, res) => {
    const result = await BarcodeServices.deleteBarcode(
        req.params.barcodeId as string,
    );
    sendResponse(res, {
        statusCode: status.OK,
        message: 'Barcode deleted successfully',
        data: result,
    });
});

export const BarcodeControllers = {
    getAllBarcode,
    getBarcodeById,
    getAllBarcodeByProductId,
    createBarcode,
    deleteBarcode,
};
