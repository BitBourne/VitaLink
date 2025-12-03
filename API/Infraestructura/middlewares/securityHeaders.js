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
            imgSrc: ["'self'", 'data:', 'https:', 'http://localhost:4000'],
            connectSrc: ["'self'", 'http://localhost:4000'],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'", 'http://localhost:4000'],
            frameSrc: ["'self'", 'http://localhost:4000'],
        },
    },

    // Cross-Origin Resource Policy - Permite acceso cross-origin a recursos
    crossOriginResourcePolicy: {
        policy: 'cross-origin'
    },

    // Cross-Origin Embedder Policy - Permite embeber recursos cross-origin
    crossOriginEmbedderPolicy: false,

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
