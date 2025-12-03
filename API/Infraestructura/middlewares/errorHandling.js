import logger from '../utils/logger.js';

/**
 * Middleware de manejo de errores mejorado con seguridad
 * 
 * Características de seguridad:
 * - No expone stack traces en producción
 * - Mensajes genéricos para errores internos
 * - Logging detallado solo en servidor
 * - Manejo específico de errores de validación
 */
const ErrorHandling = (err, req, res, next) => {
    // Log completo del error en el servidor (con stack trace)
    logger.error('Error capturado:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        ip: req.ip,
        userId: req.user?.id || 'No autenticado'
    });

    // Determina el código de estado
    const statusCode = err.statusCode || 500;

    // Prepara la respuesta base
    const response = {
        success: false,
        error: null,
        details: null
    };

    // Maneja específicamente según el tipo de error
    if (statusCode === 400 || err.name === 'ValidationError') {
        // Errores de validación - mostrar detalles
        response.error = err.message || 'Datos de entrada inválidos';
        if (err.details) {
            response.details = err.details;
        }
    } else if (statusCode === 401) {
        // Errores de autenticación
        response.error = err.message || 'No autorizado';
    } else if (statusCode === 403) {
        // Errores de permisos
        response.error = err.message || 'Acceso denegado';
    } else if (statusCode === 404) {
        // Recursos no encontrados
        response.error = err.message || 'Recurso no encontrado';
    } else if (statusCode === 429) {
        // Rate limiting
        response.error = err.message || 'Demasiadas solicitudes';
    } else {
        // Errores 500 - NO exponer detalles en producción
        if (process.env.NODE_ENV === 'production') {
            response.error = 'Error interno del servidor. Por favor intenta de nuevo más tarde.';
        } else {
            // En desarrollo, muestra más información
            response.error = err.message || 'Error interno del servidor';
            response.details = {
                stack: err.stack,
                name: err.name
            };
        }
    }

    // Envía la respuesta
    res.status(statusCode).json(response);
};

export default ErrorHandling;


