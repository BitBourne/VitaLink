import logger from '../utils/logger.js';

const ErrorHandling = (err, req, res, next) => {
    logger.error('Error:', err.message);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    const response = {
        error: message
    };

    if (err.details) {
        response.details = err.details;
    }

    res.status(statusCode).json(response);
};

export default ErrorHandling;