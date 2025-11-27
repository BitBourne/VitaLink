import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const ALGORITHM = 'aes-256-cbc';

// En producción, usar un servicio de gestión de claves (KMS)
const getEncryptionKey = () => {
    const key = process.env.MEDICAL_DATA_ENCRYPTION_KEY;

    if (!key) {
        throw new Error('MEDICAL_DATA_ENCRYPTION_KEY is not defined in environment variables');
    }

    if (key.length < 32) {
        throw new Error('MEDICAL_DATA_ENCRYPTION_KEY must be at least 32 characters long');
    }

    return Buffer.from(key.slice(0, 32), 'utf-8');
};

/**
 * Encripta datos médicos sensibles usando AES-256-CBC
 * @param {string} text - Texto plano a encriptar
 * @returns {string} Texto encriptado en formato: iv:datosEncriptados
 */
export const encrypt = (text) => {
    if (!text) return null;

    try {
        const key = getEncryptionKey();
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // El IV es requerido para la desencriptación
        return `${iv.toString('hex')}:${encrypted}`;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

/**
 * Desencripta datos médicos sensibles
 * @param {string} encryptedText - Texto encriptado en formato: iv:datosEncriptados
 * @returns {string} Texto plano desencriptado
 */
export const decrypt = (encryptedText) => {
    if (!encryptedText) return null;

    try {
        const key = getEncryptionKey();
        const parts = encryptedText.split(':');

        if (parts.length !== 2) {
            throw new Error('Invalid encrypted data format');
        }

        const iv = Buffer.from(parts[0], 'hex');
        const encryptedData = parts[1];
        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
};

/**
 * Encripta los campos especificados de un objeto
 * @param {Object} data - Objeto que contiene datos a encriptar
 * @param {Array<string>} fields - Array de nombres de campos a encriptar
 * @returns {Object} Objeto con campos encriptados
 */
export const encryptFields = (data, fields) => {
    const encryptedData = { ...data };

    fields.forEach(field => {
        if (encryptedData[field]) {
            encryptedData[field] = encrypt(encryptedData[field]);
        }
    });

    return encryptedData;
};

/**
 * Desencripta los campos especificados de un objeto
 * @param {Object} data - Objeto que contiene datos encriptados
 * @param {Array<string>} fields - Array de nombres de campos a desencriptar
 * @returns {Object} Objeto con campos desencriptados
 */
export const decryptFields = (data, fields) => {
    const decryptedData = { ...data };

    fields.forEach(field => {
        if (decryptedData[field]) {
            try {
                decryptedData[field] = decrypt(decryptedData[field]);
            } catch (error) {
                console.error(`Failed to decrypt field ${field}:`, error);
            }
        }
    });

    return decryptedData;
};

export default { encrypt, decrypt, encryptFields, decryptFields };
