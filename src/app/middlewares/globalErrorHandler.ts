/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import status from 'http-status';
import { ZodError } from 'zod';
import { duplicateErrorRegex } from '../constant/error';
import formatZodErrorMessage from '../utils/formatZodErrorMessage';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode: number = err?.statusCode || status.INTERNAL_SERVER_ERROR;
    let message: string = err?.message || 'Something went wrong';
    const error = err;

    let match: RegExpMatchArray | undefined;

    if (err instanceof ZodError) {
        statusCode = status.UNPROCESSABLE_ENTITY;
        message = formatZodErrorMessage(err);
    } else if (err?.name === 'ValidationError') {
        statusCode = status.UNPROCESSABLE_ENTITY;
        message = 'Validation Error';
    } else if (err?.name === 'CastError') {
        statusCode = status.BAD_REQUEST;
        message = `${err.value} is not a valid ID`;
    } else if ((match = err?.message.match(duplicateErrorRegex))) {
        statusCode = status.CONFLICT;
        message = `${match[2]} is already exits in ${match[1]}`;
    }

    res.status(statusCode).json({
        success: false,
        message,
        error,
        stack: config.NODE_ENV === 'development' ? err?.stack : undefined,
    });
};

export default globalErrorHandler;
