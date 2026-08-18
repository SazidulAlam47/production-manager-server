import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV as string,
    port: process.env.PORT as string,
    database_url: process.env.DATABASE_URL as string,
    client_dev_url: process.env.CLIENT_DEV_URL as string,
    client_prod_url: process.env.CLIENT_PROD_URL as string,
};
