import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { secret, expiration } from './constants.js';

export const signProviderToken = async ({ email, providerName, _id }) => {
    const payload = { email, providerName, _id };
    if (secret) {

        return jwt.sign({ data: payload }, secret, { expiresIn: expiration});
    } else {
        return 'NO SECRET, WILL DELETE LATER';
    };
};

export const signPatientToken = async ({ email, userName, _id }) => {
    const payload = { email, userName, _id };
    if (secret) {
        return jwt.sign({ data: payload}, secret, { expiresIn: expiration});
    } else {
        return 'NO SECRET, WILL DELETE LATER';
    }
};

export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
}


