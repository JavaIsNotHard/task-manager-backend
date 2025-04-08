import express from 'express';
import { getUserHandler, postUserHandler, updateUserHandler, deleteUserHandler } from '../controller/userController.js'

const router = express.Router()

router.post('/', postUserHandler);

router.get('/:id', getUserHandler);

router.put('/:id', updateUserHandler);

router.delete('/:id', deleteUserHandler);

export default router;