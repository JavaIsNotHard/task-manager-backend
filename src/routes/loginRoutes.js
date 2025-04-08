import express from 'express';
import { loginHandler } from '../auth/loginController.js'

const router = express.Router()

router.post('/', loginHandler);

export default router;