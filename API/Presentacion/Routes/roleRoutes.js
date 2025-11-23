import express from 'express';
import * as roleControllers from '../Controllers/RoleControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

// Listar todos los roles (solo admin)
router.get('/', checkAuth, checkRole(['admin']), roleControllers.getRoles);

// Ver detalles de un rol (solo admin)
router.get('/:id', checkAuth, checkRole(['admin']), roleControllers.getRoleById);

export default router;
