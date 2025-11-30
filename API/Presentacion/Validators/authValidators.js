import { body, param } from 'express-validator';
import { sanitizeEmail, sanitizeName } from '../../Infraestructura/utils/sanitization.js';

/**
 * Validadores para rutas de autenticación
 */

/**
 * Validación para registro de usuario (signUp)
 */
export const validateSignUp = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe proporcionar un email válido')
        .normalizeEmail()
        .customSanitizer(sanitizeEmail),

    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número'),

    body('firstName')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .customSanitizer(sanitizeName),

    body('lastName')
        .trim()
        .notEmpty().withMessage('El apellido es requerido')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .customSanitizer(sanitizeName),
];

/**
 * Validación para inicio de sesión (logIn)
 */
export const validateLogIn = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe proporcionar un email válido')
        .normalizeEmail()
        .customSanitizer(sanitizeEmail),

    body('password')
        .notEmpty().withMessage('La contraseña es requerida')
];

/**
 * Validación para confirmación de cuenta
 */
export const validateConfirmAccount = [
    body('token')
        .trim()
        .notEmpty().withMessage('El token de confirmación es requerido')
        .isLength({ min: 20 }).withMessage('Token de confirmación inválido')
];

/**
 * Validación para solicitud de reset de contraseña (paso 1)
 */
export const validateResetPasswordRequest = [
    body('email')
        .trim()
        .notEmpty().withMessage('El email es requerido')
        .isEmail().withMessage('Debe proporcionar un email válido')
        .normalizeEmail()
        .customSanitizer(sanitizeEmail)
];

/**
 * Validación para verificación de token de reset (paso 2)
 */
export const validateResetPasswordToken = [
    param('token')
        .trim()
        .notEmpty().withMessage('El token es requerido')
        .isLength({ min: 20 }).withMessage('Token inválido')
];

/**
 * Validación para confirmación de nueva contraseña (paso 3)
 */
export const validateResetPasswordConfirm = [
    param('token')
        .trim()
        .notEmpty().withMessage('El token es requerido')
        .isLength({ min: 20 }).withMessage('Token inválido'),

    body('password')
        .notEmpty().withMessage('La nueva contraseña es requerida')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
        .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
];

/**
 * Validación para eliminar sesión por ID
 */
export const validateDeleteSession = [
    param('sessionId')
        .trim()
        .notEmpty().withMessage('El ID de sesión es requerido')
        .isInt({ min: 1 }).withMessage('ID de sesión inválido')
];

export default {
    validateSignUp,
    validateLogIn,
    validateConfirmAccount,
    validateResetPasswordRequest,
    validateResetPasswordToken,
    validateResetPasswordConfirm,
    validateDeleteSession
};
