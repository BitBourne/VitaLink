import { body, validationResult } from 'express-validator';

/**
 * Middleware para procesar resultados de validación
 * Retorna errores 400 con detalles si la validación falla
 */
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => ({
            field: error.path || error.param,
            message: error.msg,
            value: error.value
        }));

        const error = new Error('Errores de validación en los datos proporcionados');
        error.statusCode = 400;
        error.details = formattedErrors;

        return next(error);
    }

    next();
};

export default handleValidationErrors;
