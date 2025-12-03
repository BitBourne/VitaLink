import { Router } from 'express';
import { checkAuth, checkPermission } from '../../Infraestructura/middlewares/authMiddleware.js';
import {
    getAllSpecialtiesController,
    createSpecialtyController,
    updateSpecialtyController,
    deleteSpecialtyController
} from '../Controllers/SpecialtyControllers/index.js';

const router = Router();

router.get('/', checkAuth, getAllSpecialtiesController);

router.post('/', checkAuth, checkPermission(['all', 'manage_specialties']), createSpecialtyController);

router.put('/:id', checkAuth, checkPermission(['all', 'manage_specialties']), updateSpecialtyController);

router.delete('/:id', checkAuth, checkPermission(['all', 'manage_specialties']), deleteSpecialtyController);

export default router;
