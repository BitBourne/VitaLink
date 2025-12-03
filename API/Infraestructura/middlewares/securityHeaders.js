import helmet from 'helmet';

/**
 * Middleware de headers de seguridad HTTP usando helmet.js
 * 
 * Configura múltiples headers de seguridad para proteger la aplicación:
 * - Content Security Policy (CSP): Previene ataques XSS
 * - X-Frame-Options: Protege contra clickjacking
 * - X-Content-Type-Options: Previene MIME sniffing
 * - Strict-Transport-Security (HSTS): Fuerza HTTPS
 * - X-XSS-Protection: Protección adicional contra XSS
 */
const securityHeaders = helmet({
    // Content Security Policy - Define fuentes permitidas para recursos
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },

    // Strict Transport Security - Fuerza HTTPS por 1 año
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },

    // Previene que el navegador adivine el tipo MIME
    noSniff: true,

    // Previene que la página se cargue en un iframe (clickjacking)
    frameguard: {
        action: 'deny'
    },

    // Habilita protección XSS del navegador
    xssFilter: true,

    // Oculta información del servidor
    hidePoweredBy: true,
});

export default securityHeaders;
