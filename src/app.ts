import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import config from './app/config';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
    cors({
        origin: [
            config.client_dev_url as string,
            config.client_prod_url as string,
        ],
        credentials: true,
    }),
);
app.use(cookieParser());

const test = (req: Request, res: Response) => {
    res.send({ message: 'Production Manager Server is Running...' });
};

// test route
app.get('/', test);

// application routes
app.use('/api/v1', router);

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
