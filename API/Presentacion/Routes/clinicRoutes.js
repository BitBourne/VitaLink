import { Router } from 'express';
import { checkAuth, checkPermission } from '../../Infraestructura/middlewares/authMiddleware.js';
import {
    createClinicController,
    getAllClinicsController,
    getClinicByIdController,
    updateClinicController,
    deleteClinicController
} from '../Controllers/ClinicControllers/index.js';

const router = Router();

router.post('/', checkAuth, checkPermission(['all', 'manage_clinics']), createClinicController);

router.get('/', checkAuth, getAllClinicsController);

router.get('/:id', checkAuth, getClinicByIdController);

router.put('/:id', checkAuth, checkPermission(['all', 'manage_clinics']), updateClinicController);

router.delete('/:id', checkAuth, checkPermission(['all', 'manage_clinics']), deleteClinicController);

export default router;
