import { RequestHandler } from 'express';
import status from 'http-status';

const notFound: RequestHandler = (req, res) => {
    res.status(status.NOT_FOUND).json({
        success: false,
        message: 'API Not Found!!',
        error: {
            path: req.originalUrl,
            method: req.method,
            message:
                'The requested API endpoint or HTTP method does not exist.',
        },
    });
};

export default notFound;
