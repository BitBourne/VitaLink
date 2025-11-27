import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import logger from '../utils/logger.js';

/**
 * Middleware para verificar si las credenciales de un doctor están verificadas
 * Esto protege endpoints que requieren credenciales médicas verificadas
 * Los doctores no verificados aún pueden acceder a endpoints de perfil y carga de documentos
 * @param {Array<string>} applyToRoles - Array opcional de roles a los que aplicar la verificación. Si no se proporciona, aplica a todos los usuarios con perfiles de doctor.
 */
const checkDoctorVerified = (applyToRoles = null) => async (req, res, next) => {
    try {
        // Si se especifica applyToRoles, solo verificar si el usuario tiene uno de esos roles
        if (applyToRoles && req.user.roles) {
            const hasApplicableRole = applyToRoles.some(role => req.user.roles.includes(role));
            if (!hasApplicableRole) {
                return next(); // Omitir verificación para usuarios sin roles aplicables
            }
        }

        // Omitir verificación para pacientes (no tienen perfiles de doctor)
        if (req.user.role === 'paciente' || req.user.role === 'patient') {
            return next();
        }


        const userId = req.user.id;

        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: userId });

        if (!doctorProfile) {
            const error = new Error('Perfil de doctor no encontrado.');
            error.statusCode = 404;
            return next(error);
        }

        // Verificar si ambas credenciales están verificadas (compatibilidad hacia atrás)
        const isFullyVerified = doctorProfile.license_verified && doctorProfile.cedula_verified;

        // También verificar el nuevo campo verification_status
        const isVerifiedByStatus = doctorProfile.verification_status === 'verified';

        if (!isFullyVerified && !isVerifiedByStatus) {
            const error = new Error('Sus credenciales médicas aún no han sido verificadas. Por favor, espere la aprobación de un administrador.');
            error.statusCode = 403;
            error.details = {
                verification_status: doctorProfile.verification_status,
                license_verified: doctorProfile.license_verified,
                cedula_verified: doctorProfile.cedula_verified,
                verification_notes: doctorProfile.verification_notes,
                next_steps: [
                    'Suba sus documentos en PUT /doctor/credentials/upload',
                    'Espere la verificación del administrador',
                    'Recibirá una notificación cuando sea aprobado'
                ],
                allowed_endpoints: [
                    'GET /auth/profile',
                    'PUT /doctor/credentials',
                    'PUT /doctor/credentials/upload',
                    'GET /doctor/credentials/status',
                    'POST /auth/logout'
                ]
            };
            return next(error);
        }

        // Adjuntar perfil de doctor a la petición para uso en controladores
        req.doctorProfile = doctorProfile;

        next();
    } catch (error) {
        logger.error('Error in checkDoctorVerified middleware:', error);
        const err = new Error('Error al verificar las credenciales del doctor.');
        err.statusCode = 500;
        return next(err);
    }
};

export default checkDoctorVerified;
