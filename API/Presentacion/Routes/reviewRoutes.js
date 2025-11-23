// reviewRoutes.js
import express from 'express';
import * as reviewControllers from '../Controllers/ReviewControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

const router = express.Router();

// Crear review (solo pacientes autenticados)
router.post('/', checkAuth, checkRole(['paciente']), auditAction('create_review', 'Review'), reviewControllers.createReview);

// Ver reviews de un doctor (público - cualquier usuario autenticado)
router.get('/doctor/:doctorId', checkAuth, reviewControllers.getReviewsByDoctor);

export default router;
