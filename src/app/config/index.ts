import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV as string,
    port: process.env.PORT as string,
    database_url: process.env.DATABASE_URL as string,
    client_url: process.env.CLIENT_URL as string,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || '10',
    node_mailer: {
        email: process.env.EMAIL as string,
        password: process.env.EMAIL_PASSWORD as string,
    },
};
