import db from '../db/dbservice.js';

export async function addRefreshTokenToDatabase(refresh_token, userId) {
    try {
        const result = await db.query(
            `INSERT INTO tokens (refresh_token, user_id)
            VALUES ($1, $2)
            RETURNING refresh_token, user_id;`,
            [refresh_token, userId]
        );

        if (result.rows.length == 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function getRefreshTokenByUserId(userId) {
    try {
        const result = await db.query(
            `SELECT * FROM
            tokens WHERE user_id = $1;`,
            [userId]
        );

        if (result.rows.length == 0) {
            return null;
        }

        return result.rows[0];
    } catch(err) {
        throw err
    }
}

export async function deleteRefreshTokenByUserId(userId) {
    try {
        const result = await db.query(
            `DELETE FROM token
            WHERE user_id = $1
            RETURNING refresh_token`,
            [userId]
        );

        if (result.rows.length == 0) {
            return null;
        }

        return result.rows[0];
    } catch(err) {
        throw err
    }
}