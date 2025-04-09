import { getUserByUsernameOrEmail } from '../services/userService.js'
import { addRefreshTokenToDatabase } from '../services/tokenService.js';
import { generateAccessJWT, generateRefreshJWT } from './jwtUtils.js';

export async function loginHandler(req, res, next) {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsernameOrEmail(username, password);
        if (user == null) {
            return res.status(400).json({ message: 'User not found' });
        }
        const newUser = {
            id: user.id,
            role: "read",
        };
        const access_token = generateAccessJWT(newUser);
        const refresh_token = generateRefreshJWT(newUser);
        const result = addRefreshTokenToDatabase(refresh_token, user.id);

        const returnUser = {
            userId: user.id,
            username: user.name,
            email: user.email,
        };

        if (result == null) {
            res.status(500).json({ message: "cannot store refresh token due to some unexpected error"});
        }

        res.json({ user: returnUser, access_token: access_token, refresh_token: refresh_token });
    } catch (err) {
        throw err;
    }
}