import { verifyAccessToken } from './jwtUtils.js';

const secret = process.env.SECRET_KEY;

export function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token found'});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = verifyAccessToken(token)
        req.user = decodedToken;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or Expired token '});
    }
}