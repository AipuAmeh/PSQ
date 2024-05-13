import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;
const expiration = process.env.JWT_EXPIRATION;

const signProviderToken = async ({ email, providerName, _id }) => {
    const payload = { email, providerName, _id };
    if (secret) {

        return await jwt.signAsync({ data: payload }, secret, { expiresIn: expiration});
    } else {
        return 'NO SECRET, WILL DELETE LATER';
    };
};

const signPatientToken = async ({ email, username, _id }) => {
    const payload = { email, username, _id };
    if (secret) {
        return await jwt.sign({ data: payload}, secret, { expiresIn: expiration});
    } else {
        return 'NO SECRET, WILL DELETE LATER';
    }
};


export default { signProviderToken, signPatientToken };