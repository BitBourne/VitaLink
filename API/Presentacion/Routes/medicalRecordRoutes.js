import { Router } from 'express';
import createMedicalRecord from '../Controllers/medicalRecordControllers/createMedicalRecordController.js';
import getMedicalRecord from '../Controllers/medicalRecordControllers/getMedicalRecordController.js';
import updateMedicalRecord from '../Controllers/medicalRecordControllers/updateMedicalRecordController.js';
import deleteMedicalRecord from '../Controllers/medicalRecordControllers/deleteMedicalRecordController.js';
import getPatientHistory from '../Controllers/medicalRecordControllers/getPatientHistoryController.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';
import checkDoctorVerified from '../../Infraestructura/middlewares/checkDoctorVerified.js';
import {
    logMedicalAccess,
    checkMedicalRecordAccess,
    checkPatientHistoryAccess
} from '../../Infraestructura/middlewares/hipaaMiddleware.js';

const router = Router();

router.post(
    '/',
    checkAuth,
    checkRole(['doctor']),
    checkDoctorVerified(),
    logMedicalAccess('create'),
    createMedicalRecord
);

router.get(
    '/:id',
    checkAuth,
    checkMedicalRecordAccess,
    logMedicalAccess('view'),
    getMedicalRecord
);

router.put(
    '/:id',
    checkAuth,
    checkRole(['doctor', 'admin']),
    logMedicalAccess('update'),
    updateMedicalRecord
);

router.delete(
    '/:id',
    checkAuth,
    checkRole(['doctor', 'admin']),
    logMedicalAccess('delete'),
    deleteMedicalRecord
);

router.get(
    '/patient/:patientId',
    checkAuth,
    checkPatientHistoryAccess,
    logMedicalAccess('view_history'),
    getPatientHistory
);

export default router;
