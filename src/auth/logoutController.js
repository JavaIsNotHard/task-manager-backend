import { getRefreshTokenByUserId, deleteRefreshTokenByUserId } from "../services/tokenService.js";
import { verifyRefreshToken, generateAccessJWT } from "./jwtUtils.js";

export async function refreshHandler(req, res, next) {
    const {refreshToken} = req.body;
    const decodedToken = verifyRefreshToken(refreshToken)
    req.user = decodedToken;
    console.log(req.user.userId);

    if (!refreshToken || !getRefreshTokenByUserId(req.user.userId)) {
        return res.status(403).json({ message: "invalid refresh token or token not found"})
    }

    try {
        const userData = verifyRefreshToken(refreshToken);
        const accessToken = generateAccessJWT(userData);
        res.json({ access_token: accessToken });
    } catch(err) {
        return res.status(403).json({message: "invalid refresh token"});
    }
}

export async function logoutHandler(req, res, next) {
    const decodedToken = verifyRefreshToken(refreshToken)
    req.user = decodedToken;
    const result = deleteRefreshTokenByUserId(req.user.userId);
    res.status(204).json({ message: `deleted token ${result.refresh_token} successfully`});
}