import { body, param } from 'express-validator';
import { sanitizeName, sanitizePhone } from '../../Infraestructura/utils/sanitization.js';

/**
 * Validadores para operaciones de usuario
 */

/**
 * Validación para actualización de perfil de usuario
 */
export const validateUpdateProfile = [
    body('firstName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .customSanitizer(sanitizeName),

    body('lastName')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .customSanitizer(sanitizeName),

    body('phone')
        .optional()
        .trim()
        .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
        .withMessage('Formato de teléfono inválido')
        .customSanitizer(sanitizePhone),

    body('dateOfBirth')
        .optional()
        .isISO8601().withMessage('Formato de fecha inválido (use YYYY-MM-DD)')
        .custom((value) => {
            const date = new Date(value);
            const now = new Date();
            const age = now.getFullYear() - date.getFullYear();
            if (age < 0 || age > 120) {
                throw new Error('Fecha de nacimiento inválida');
            }
            return true;
        }),

    body('gender')
        .optional()
        .isIn(['male', 'female', 'other']).withMessage('Género inválido')
];

/**
 * Validación para ID de usuario en parámetros
 */
export const validateUserId = [
    param('userId')
        .trim()
        .notEmpty().withMessage('El ID de usuario es requerido')
        .isInt({ min: 1 }).withMessage('ID de usuario inválido')
];

export default {
    validateUpdateProfile,
    validateUserId
};
