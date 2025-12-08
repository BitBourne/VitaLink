import { Router } from 'express';
import {
    getAllSpecialties,
    getSpecialtyById,
    createSpecialty,
    updateSpecialty,
    deleteSpecialty,
    assignDoctorToSpecialty,
    removeDoctorFromSpecialty
} from '../Controllers/SpecialtyControllers/specialtyControllers.js';
import { checkAuth, checkPermission, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

const router = Router();

router.get('/', checkAuth, getAllSpecialties);
router.get('/:id', checkAuth, getSpecialtyById);
router.post(
    '/',
    checkAuth,
    checkRole(['admin']),
    checkPermission(['all']),
    auditAction('create_specialty', 'Specialty'),
    createSpecialty
);
router.put(
    '/:id',
    checkAuth,
    checkRole(['admin']),
    checkPermission(['all']),
    auditAction('update_specialty', 'Specialty'),
    updateSpecialty
);
router.delete(
    '/:id',
    checkAuth,
    checkRole(['admin']),
    checkPermission(['all']),
    auditAction('delete_specialty', 'Specialty'),
    deleteSpecialty
);
router.post(
    '/:specialtyId/doctors/:doctorId',
    checkAuth,
    checkRole(['admin']),
    checkPermission(['all']),
    auditAction('assign_doctor_specialty', 'DoctorSpecialty'),
    assignDoctorToSpecialty
);
router.delete(
    '/:specialtyId/doctors/:doctorId',
    checkAuth,
    checkRole(['admin']),
    checkPermission(['all']),
    auditAction('remove_doctor_specialty', 'DoctorSpecialty'),
    removeDoctorFromSpecialty
);
export default router;
