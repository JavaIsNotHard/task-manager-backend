import express from 'express';
import session from 'express-session'
import cors from 'cors';

const app = express();
const port = 8000;

// import userRoutes from './src/routes/userRoutes.js'
import taskRoutes from './src/routes/taskRoutes.js'
import loginRoutes from './src/routes/loginRoutes.js'
import logoutRoutes from './src/routes/logoutRoutes.js'
import registerRoutes from './src/routes/registerRoutes.js'

import { authenticateJWT } from './src/auth/authMiddleware.js';

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: false}
}));

// app.use('/users', userRoutes);
app.use('/register', registerRoutes)
app.use('/login', loginRoutes)
app.use('/logout', logoutRoutes)
app.use('/tasks', authenticateJWT, taskRoutes)

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || 'Something is wrong!',
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})