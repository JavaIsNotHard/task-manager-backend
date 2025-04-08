import db from '../db/dbservice.js';

export async function getTasksByUserId(userId) {
    try {
        const result = await db.query(
            `SELECT id, title, description
            FROM tasks
            WHERE user_id = $1`,
            [userId]
        );

        if (result.rows.length <= 0) {
            return null;
        }

        return result.rows;
    } catch (err) {
        throw err;
    }
}

export async function createTaskByUserId({ title, description, userId} ) {
    try {
        const result = await db.query(
            `INSERT INTO tasks (title, description, user_id)
            VALUES ($1, $2, $3)
            RETURNING id, title, description, user_id`,
            [title, description, userId]
        );

        return result.rows[0];
    } catch(err) {
        throw err;
    }
}

export async function deleteTaskById(taskId) {
    try {
        const result = await db.query(
            `DELETE FROM
            tasks
            WHERE id = $1
            RETURNING *`,
            [taskId]
        );

        return result.rows[0];
    } catch(err) {
        throw err;
    }
}