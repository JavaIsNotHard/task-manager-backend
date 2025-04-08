import { getUserProfile, createUser, updateUserProfile, deleteUserProfile } from '../services/userService.js';

export async function getUserHandler(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await getUserProfile(userId);
        res.json(user);
    } catch(err)  {
        console.error(`Error while getting user with id ${userId}`)
        next(err)
    }
}

export async function postUserHandler(req, res, next) {
    try {
        console.log(req.body);
        res.json(await createUser(req.body));
    } catch(err) {
        console.error(`Error while creating a new user ${err}`)
        next(err);
    }
}

export async function updateUserHandler(req, res, next) {
    const userId = req.params.id;
    try {
        const user = await updateUserProfile(userId, req.body);
        res.json(user);
    } catch (err) {
        console.error(`Error while creating a new user ${err}`)
        next(err);
    }
}

export async function deleteUserHandler(req, res, next) {
    const userId = req.params.id;
    try {
        const user = await deleteUserProfile(userId);
        res.json(user);
    } catch (err) {
        console.error(`Error while creating a new user ${err}`)
        next(err);
    }
}