import express from 'express';
import * as reviewControllers from '../Controllers/ReviewControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

const router = express.Router();

router.post('/', checkAuth, checkRole(['patient']), auditAction('create_review', 'Review'), reviewControllers.createReview);

router.get('/doctor/:doctorId', checkAuth, reviewControllers.getReviewsByDoctor);

export default router;
