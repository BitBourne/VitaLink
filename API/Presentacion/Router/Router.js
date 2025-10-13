import express from 'express';

import authRoutes from './authRoutes.js';

const router = express.Router();


app.use('/auth', authRoutes);

export default router;