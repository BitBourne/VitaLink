import express from 'express';
import * as doctorControllers from '../Controllers/DoctorControllers/index.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', checkAuth, doctorControllers.getDoctores);

router.get('/search', checkAuth, doctorControllers.searchDoctors);

router.get('/:doctorId/clinics', checkAuth, doctorControllers.getDoctorClinics);

router.post('/:doctorId/clinics', checkAuth, checkRole(['admin']), doctorControllers.assignDoctorToClinic);

router.delete('/:doctorId/clinics/:clinicId', checkAuth, checkRole(['admin']), doctorControllers.removeDoctorFromClinic);

router.post('/:doctorId/specialties', checkAuth, checkRole(['admin']), doctorControllers.assignDoctorToSpecialty);

router.delete('/:doctorId/specialties/:specialtyId', checkAuth, checkRole(['admin']), doctorControllers.removeDoctorFromSpecialty);

router.put('/:doctorProfileId/salary', checkAuth, checkRole(['admin']), doctorControllers.updateDoctorSalary);

export default router;