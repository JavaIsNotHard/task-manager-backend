import express from 'express';
import { refreshHandler, logoutHandler } from '../auth/logoutController.js';

const router = express.Router()

router.post('/refresh', refreshHandler);
router.post('/', logoutHandler)

export default router;