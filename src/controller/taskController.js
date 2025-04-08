import { getTasksByUserId, createTaskByUserId, deleteTaskById } from '../services/taskService.js';

export async function getTaskHandler(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await getTasksByUserId(userId);
        res.json(user);
    } catch(err)  {
        console.error(`Error while getting user with id ${userId}`)
        next(err)
    }
}

export async function postTaskHandler(req, res, next) {
    try {
        console.log(req.body);
        res.json(await createTaskByUserId(req.body));
    } catch(err) {
        console.error(`Error while creating a new user ${err}`)
        next(err);
    }
}

export async function deleteTaskHandler(req, res, next) {
    const taskId= req.params.id;
    try {
        const user = await deleteTaskById(taskId);
        res.json(user);
    } catch (err) {
        console.error(`Error while creating a new user ${err}`)
        next(err);
    }
}