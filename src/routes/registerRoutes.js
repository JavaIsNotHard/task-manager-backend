import express from 'express';
import { postUserHandler } from '../controller/userController.js'

const router = express.Router()

router.post('/', postUserHandler);

export default router;