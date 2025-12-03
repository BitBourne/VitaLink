import { body, param } from 'express-validator';
import { sanitizeText } from '../../Infraestructura/utils/sanitization.js';

/**
 * Validadores para operaciones de citas médicas
 */

/**
 * Validación para creación de cita
 */
export const validateCreateAppointment = [
    body('doctor_profile_id')
        .notEmpty().withMessage('El ID del doctor es requerido')
        .isInt({ min: 1 }).withMessage('ID de doctor inválido'),

    body('appointment_date')
        .notEmpty().withMessage('La fecha de la cita es requerida')
        .isISO8601().withMessage('Formato de fecha inválido (use YYYY-MM-DD)')
        .custom((value) => {
            const appointmentDate = new Date(value);
            const now = new Date();
            now.setHours(0, 0, 0, 0);

            if (appointmentDate < now) {
                throw new Error('La fecha de la cita no puede ser en el pasado');
            }

            // No permitir citas con más de 6 meses de anticipación
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

            if (appointmentDate > sixMonthsFromNow) {
                throw new Error('No se pueden agendar citas con más de 6 meses de anticipación');
            }

            return true;
        }),

    body('appointment_time')
        .notEmpty().withMessage('La hora de la cita es requerida')
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Formato de hora inválido (use HH:MM)'),

    body('reason')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('La razón no puede exceder 500 caracteres')
        .customSanitizer(sanitizeText),

    body('clinic_id')
        .optional()
        .isInt({ min: 1 }).withMessage('ID de clínica inválido')
];

/**
 * Validación para actualización de estado de cita
 */
export const validateUpdateAppointmentStatus = [
    param('appointmentId')
        .trim()
        .notEmpty().withMessage('El ID de la cita es requerido')
        .isInt({ min: 1 }).withMessage('ID de cita inválido'),

    body('status')
        .notEmpty().withMessage('El estado es requerido')
        .isIn(['scheduled', 'confirmed', 'completed', 'cancelled', 'no-show'])
        .withMessage('Estado inválido. Valores permitidos: scheduled, confirmed, completed, cancelled, no-show')
];

/**
 * Validación para cancelación de cita
 */
export const validateCancelAppointment = [
    param('appointmentId')
        .trim()
        .notEmpty().withMessage('El ID de la cita es requerido')
        .isInt({ min: 1 }).withMessage('ID de cita inválido'),

    body('cancellationReason')
        .optional()
        .trim()
        .isLength({ max: 500 }).withMessage('La razón de cancelación no puede exceder 500 caracteres')
        .customSanitizer(sanitizeText)
];

/**
 * Validación para ID de cita en parámetros
 */
export const validateAppointmentId = [
    param('appointmentId')
        .trim()
        .notEmpty().withMessage('El ID de la cita es requerido')
        .isInt({ min: 1 }).withMessage('ID de cita inválido')
];

export default {
    validateCreateAppointment,
    validateUpdateAppointmentStatus,
    validateCancelAppointment,
    validateAppointmentId
};
