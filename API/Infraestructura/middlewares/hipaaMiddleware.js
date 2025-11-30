import logAuditService from "../../Negocio/auditServices/logAuditService.js";
import MedicalRecordDAO from "../../Datos/DAOs/MedicalRecordDAO.js";
import DoctorProfileDAO from "../../Datos/DAOs/DoctorProfileDAO.js";
import logger from "../utils/logger.js";

/**
 * Registro de auditoría mejorado específicamente para acceso a registros médicos (cumplimiento HIPAA)
 * Registra todos los accesos a registros médicos con información detallada
 * @param {string} action - Acción que se está realizando (view, create, update, delete)
 * @returns {Function} Función middleware
 */
export const logMedicalAccess = (action) => {
    return async (req, res, next) => {
        const originalJson = res.json.bind(res);

        res.json = function (data) {
            logAuditService({
                user_id: req.user?.id || null,
                action: `medical_record_${action}`,
                resource_type: 'MedicalRecord',
                resource_id: data?.id || data?.medicalRecord?.id || req.params?.id || null,
                ip_address: req.ip || req.connection.remoteAddress,
                user_agent: req.get('user-agent'),
                details: {
                    method: req.method,
                    path: req.path,
                    statusCode: res.statusCode,
                    patientId: data?.patient_id || req.params?.patientId || null,
                    doctorProfileId: data?.doctor_profile_id || null,
                    timestamp: new Date().toISOString(),
                    accessType: action,
                    userRole: req.user?.roles || [],
                },
            }).catch(err => {
                logger.error('Error in HIPAA audit middleware:', err);
            });

            return originalJson(data);
        };

        next();
    };
};

/**
 * Valida que el usuario tenga permiso para acceder a un registro médico específico
 * Reglas:
 * - Los pacientes solo pueden acceder a sus propios registros
 * - Los doctores pueden acceder a los registros que crearon
 * - Los administradores pueden acceder a todos los registros
 * @returns {Function} Función middleware
 */
export const checkMedicalRecordAccess = async (req, res, next) => {
    try {
        const recordId = req.params.id;
        const userId = req.user.id;
        const userRoles = req.user.roles || [];

        if (userRoles.includes('admin')) {
            return next();
        }

        const medicalRecordDAO = new MedicalRecordDAO();
        const record = await medicalRecordDAO.findById(recordId);

        if (!record) {
            const error = new Error('Medical record not found');
            error.statusCode = 404;
            return next(error);
        }

        if (record.patient_id === userId) {
            return next();
        }

        if (userRoles.includes('doctor')) {
            const doctorProfileDAO = new DoctorProfileDAO();
            const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

            if (doctorProfile && doctorProfile.id === record.doctor_profile_id) {
                return next();
            }
        }

        const error = new Error('You do not have permission to access this medical record');
        error.statusCode = 403;
        return next(error);

    } catch (error) {
        logger.error('Error in checkMedicalRecordAccess middleware:', error);
        error.statusCode = 500;
        return next(error);
    }
};

/**
 * Valida que el usuario tenga permiso para acceder al historial médico de un paciente
 * Reglas:
 * - Los pacientes solo pueden acceder a su propio historial
 * - Los doctores pueden acceder al historial de sus pacientes (futuro: con consentimiento)
 * - Los administradores pueden acceder a todos los historiales
 * @returns {Function} Función middleware
 */
export const checkPatientHistoryAccess = async (req, res, next) => {
    try {
        const patientId = parseInt(req.params.patientId);
        const userId = req.user.id;
        const userRoles = req.user.roles || [];

        if (userRoles.includes('admin')) {
            return next();
        }

        if (patientId === userId) {
            return next();
        }

        // TODO: Implementar verificación de consentimiento del paciente antes de permitir acceso al doctor
        if (userRoles.includes('doctor')) {
            return next();
        }

        const error = new Error('You do not have permission to access this patient\'s medical history');
        error.statusCode = 403;
        return next(error);

    } catch (error) {
        logger.error('Error in checkPatientHistoryAccess middleware:', error);
        error.statusCode = 500;
        return next(error);
    }
};

/**
 * Marcador de posición para futura verificación de consentimiento del paciente
 * Esto verificaría si un paciente ha otorgado acceso a un doctor a sus registros
 * @returns {Function} Función middleware
 */
export const validatePatientConsent = async (req, res, next) => {
    // TODO: Implementar sistema de gestión de consentimiento del paciente
    // Por ahora, esto es un marcador de posición que permite todo acceso
    // En producción, esto debería:
    // 1. Verificar si el paciente ha otorgado consentimiento al doctor solicitante
    // 2. Verificar si el consentimiento aún es válido (no expirado o revocado)
    // 3. Registrar el intento de verificación de consentimiento

    next();
};

export default {
    logMedicalAccess,
    checkMedicalRecordAccess,
    checkPatientHistoryAccess,
    validatePatientConsent,
};
