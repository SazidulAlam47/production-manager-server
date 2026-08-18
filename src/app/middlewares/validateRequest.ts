import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AnyZodObject } from 'zod';

const validateRequest = (schema: AnyZodObject) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            req.body = await schema.parseAsync(req.body);
            next();
        },
    );
};

export default validateRequest;
