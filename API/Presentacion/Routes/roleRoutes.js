import express from 'express';
import * as roleControllers from '../Controllers/RoleControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', checkAuth, checkRole(['admin']), roleControllers.getRoles);

router.post('/', checkAuth, checkRole(['admin']), roleControllers.createRole);

router.get('/:id', checkAuth, checkRole(['admin']), roleControllers.getRoleById);

export default router;
