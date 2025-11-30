import rateLimit from 'express-rate-limit';

/**
 * Rate limiter global para todas las rutas de la API
 * Limita a 100 solicitudes por IP cada 15 minutos
 */
export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 solicitudes por ventana
    message: {
        error: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
        retryAfter: '15 minutos'
    },
    standardHeaders: true, // Retorna info de rate limit en headers `RateLimit-*`
    legacyHeaders: false, // Deshabilita headers `X-RateLimit-*`



    // Handler personalizado cuando se excede el límite
    handler: (req, res) => {
        res.status(429).json({
            error: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.',
            retryAfter: '15 minutos'
        });
    }
});

/**
 * Rate limiter específico para rutas de autenticación
 * Más restrictivo para prevenir ataques de fuerza bruta
 * Limita a 5 intentos de login por IP cada 15 minutos
 */
export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Límite de 5 intentos por ventana
    message: {
        error: 'Demasiados intentos de inicio de sesión. Por favor intenta de nuevo más tarde.',
        retryAfter: '15 minutos'
    },
    standardHeaders: true,
    legacyHeaders: false,



    handler: (req, res) => {
        res.status(429).json({
            error: 'Demasiados intentos de inicio de sesión desde esta IP. Por seguridad, tu acceso ha sido temporalmente bloqueado.',
            retryAfter: '15 minutos'
        });
    },

    // Omitir rate limit para solicitudes exitosas (opcional)
    skipSuccessfulRequests: false,

    // Omitir rate limit para solicitudes fallidas (opcional)
    skipFailedRequests: false
});

/**
 * Rate limiter para endpoints sensibles (cambio de contraseña, etc.)
 * Limita a 3 intentos por IP cada hora
 */
export const sensitiveRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 3, // Límite de 3 intentos por ventana
    message: {
        error: 'Demasiados intentos para esta operación sensible. Por favor intenta de nuevo más tarde.',
        retryAfter: '1 hora'
    },
    standardHeaders: true,
    legacyHeaders: false,



    handler: (req, res) => {
        res.status(429).json({
            error: 'Demasiados intentos para esta operación. Por favor intenta de nuevo en 1 hora.',
            retryAfter: '1 hora'
        });
    }
});
