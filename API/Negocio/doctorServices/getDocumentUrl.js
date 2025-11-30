import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Servicio para obtener la ruta del archivo de documento con control de acceso
 * @param {string} filename - Nombre del archivo a recuperar
 * @param {number} userId - ID del usuario solicitante
 * @param {string} userRole - Rol del usuario solicitante
 * @returns {object} Ruta del archivo y metadatos
 */
const getDocumentUrl = async (filename, userId, userRole) => {
    try {
        const sanitizedFilename = path.basename(filename);
        const filePath = path.join(__dirname, '../../uploads/credentials', sanitizedFilename);

        if (!fs.existsSync(filePath)) {
            const error = new Error('Documento no encontrado.');
            error.statusCode = 404;
            throw error;
        }

        return {
            success: true,
            filePath: filePath,
            filename: sanitizedFilename
        };

    } catch (error) {
        console.error('Error in getDocumentUrl:', error);
        if (error.statusCode) {
            throw error;
        }
        const serviceError = new Error('Error al obtener el documento.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default getDocumentUrl;
