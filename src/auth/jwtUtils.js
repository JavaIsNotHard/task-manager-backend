import jwt from 'jsonwebtoken';

const access_token_secret = process.env.ACCESS_SECRET_KEY;
const refresh_token_secret = process.env.REFRESH_SECRET_KEY;

export function generateAccessJWT(user) {
    return jwt.sign(
        {
            userId: user.id,
            username: user.name,
            role: user.role,
        },
        access_token_secret,
        { expiresIn: '15m' }
    );
}

export function generateRefreshJWT(user) {
    return jwt.sign(
        {
            userId: user.id,
            username: user.name,
            role: user.role,
        },
        refresh_token_secret,
        { expiresIn: '7d' }
    );
}

export function verifyAccessToken(token) {
    return jwt.verify(token, access_token_secret);
}

export function verifyRefreshToken(token) {
    return jwt.verify(token, refresh_token_secret);
}