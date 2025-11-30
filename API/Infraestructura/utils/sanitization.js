/**
 * Utilidades para sanitización de datos de entrada
 * Previene inyecciones y limpia datos potencialmente peligrosos
 */

/**
 * Elimina caracteres HTML peligrosos para prevenir XSS
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeHTML = (input) => {
    if (typeof input !== 'string') return input;

    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
    };

    return input.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Elimina caracteres potencialmente peligrosos para SQL injection
 * Nota: Sequelize ya previene SQL injection, pero esto es una capa adicional
 * @param {string} input - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeSQL = (input) => {
    if (typeof input !== 'string') return input;

    // Elimina caracteres comunes en SQL injection
    return input.replace(/[;'"\\]/g, '');
};

/**
 * Normaliza espacios en blanco y elimina espacios múltiples
 * @param {string} input - Texto a normalizar
 * @returns {string} Texto normalizado
 */
export const normalizeWhitespace = (input) => {
    if (typeof input !== 'string') return input;

    return input.trim().replace(/\s+/g, ' ');
};

/**
 * Sanitiza un email eliminando caracteres no permitidos
 * @param {string} email - Email a sanitizar
 * @returns {string} Email sanitizado
 */
export const sanitizeEmail = (email) => {
    if (typeof email !== 'string') return email;

    // Convierte a minúsculas y elimina espacios
    return email.toLowerCase().trim();
};

/**
 * Sanitiza nombres (firstName, lastName) eliminando caracteres especiales
 * Permite letras, espacios, guiones y apóstrofes
 * @param {string} name - Nombre a sanitizar
 * @returns {string} Nombre sanitizado
 */
export const sanitizeName = (name) => {
    if (typeof name !== 'string') return name;

    // Elimina todo excepto letras (incluyendo acentos), espacios, guiones y apóstrofes
    return name
        .trim()
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]/g, '')
        .replace(/\s+/g, ' ');
};

/**
 * Sanitiza texto general eliminando scripts y HTML peligroso
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeText = (text) => {
    if (typeof text !== 'string') return text;

    // Elimina tags HTML y scripts
    let sanitized = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/<[^>]+>/g, '');

    return normalizeWhitespace(sanitized);
};

/**
 * Sanitiza un objeto completo aplicando sanitización a todas sus propiedades string
 * @param {Object} obj - Objeto a sanitizar
 * @param {Function} sanitizer - Función de sanitización a aplicar (por defecto sanitizeText)
 * @returns {Object} Objeto sanitizado
 */
export const sanitizeObject = (obj, sanitizer = sanitizeText) => {
    if (typeof obj !== 'object' || obj === null) return obj;

    const sanitized = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizer(value);
        } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value, sanitizer);
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
};

/**
 * Sanitiza un número de teléfono eliminando caracteres no numéricos
 * Permite +, espacios, guiones y paréntesis
 * @param {string} phone - Teléfono a sanitizar
 * @returns {string} Teléfono sanitizado
 */
export const sanitizePhone = (phone) => {
    if (typeof phone !== 'string') return phone;

    // Permite solo números, +, espacios, guiones y paréntesis
    return phone.replace(/[^0-9+\s()-]/g, '').trim();
};

/**
 * Sanitiza una URL eliminando protocolos peligrosos
 * @param {string} url - URL a sanitizar
 * @returns {string|null} URL sanitizada o null si es peligrosa
 */
export const sanitizeURL = (url) => {
    if (typeof url !== 'string') return url;

    const trimmedUrl = url.trim().toLowerCase();

    // Bloquea protocolos peligrosos
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];

    for (const protocol of dangerousProtocols) {
        if (trimmedUrl.startsWith(protocol)) {
            return null;
        }
    }

    return url.trim();
};

export default {
    sanitizeHTML,
    sanitizeSQL,
    normalizeWhitespace,
    sanitizeEmail,
    sanitizeName,
    sanitizeText,
    sanitizeObject,
    sanitizePhone,
    sanitizeURL
};
