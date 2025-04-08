import db from '../db/dbservice.js';
import bcrypt from 'bcrypt';

const SALT_VALUE = 16;

export async function getUserByUsernameOrEmail(username, password) {
    try {
        const result = await db.query(
            `SELECT *
            FROM users
            WHERE name = $1 OR email = $2`,
            [username, username]
        );

        if (result.rows.length == 0) {
            return null;
        }

        const user = result.rows[0];

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null;
        }

        return user;
    } catch(err) {
        throw err;
    }
}

export async function getUserProfile(userId) {
    try {
        const result = await db.query(
            `SELECT id, name, email
            FROM users
            WHERE id = $1`,
            [userId]
        );

        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function createUser({ name, email, password }) {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_VALUE);

        const result = await db.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, name, email`,
            [name, email, hashedPassword]
        );

        return result.rows[0];
    } catch(err) {
        throw err;
    }
}

export async function updateUserProfile(userId, { name, email, password}) {
    try {
        const hashedPassword = await bcrypt.hash(password.SALT_VALUE);
        const result = await db.query(
            `UPDATE users
             SET name = $1, email = $2, password = $3
             WHERE id = $4
             RETURNING*`,
            [name, email, hashedPassword, userId]
        );

        if (result.rows.length == 0) {
            return null;
        }

        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

export async function deleteUserProfile(userId) {
    try {
        const result = await db.query(
            `DELETE FROM
            users
            WHERE id = $1
            RETURNING *`,
            [userId]
        );

        return result.rows[0];
    } catch(err) {
        throw err;
    }
}