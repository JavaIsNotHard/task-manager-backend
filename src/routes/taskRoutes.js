import express from 'express';
import { getTaskHandler, postTaskHandler, deleteTaskHandler } from '../controller/taskController.js'

const router = express.Router()

router.post('/', postTaskHandler);

router.get('/:id', getTaskHandler);

router.delete('/:id', deleteTaskHandler);

export default router;