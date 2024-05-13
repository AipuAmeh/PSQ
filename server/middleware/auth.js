import jwt from 'jsonwebtoken';
import { secret, expiration } from '../utils/jwt';

const authMiddleware = async ({ req }) => {

    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    };

    if (!token) {
        return req;
    }
    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
       req.user = data;
    } catch (error) {
        console.log('JWT Verfication Failed', error.message);
    }
    return await req;
};

export default authMiddleware;




