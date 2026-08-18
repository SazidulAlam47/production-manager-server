/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import ms from 'ms';
import status from 'http-status';
import ApiError from '../errors/ApiError';

export type TDecodedUser = {
    name?: string;
    email?: string;
    profilePhoto?: string;
    hasPassword?: boolean;
    [key: string]: any;
};

export const createToken = (
    jwtPayload: {
        name: string;
        email: string;
        profilePhoto?: string;
        hasPassword: boolean;
    },
    secret: Secret,
    expiresIn: ms.StringValue,
) => {
    const options: SignOptions = { algorithm: 'HS256', expiresIn };
    return jwt.sign(jwtPayload, secret, options);
};

export const verifyToken = (token: string, secret: Secret) => {
    try {
        return jwt.verify(token, secret) as TDecodedUser;
    } catch (err) {
        throw new ApiError(status.UNAUTHORIZED, 'You are not authorized');
    }
};
