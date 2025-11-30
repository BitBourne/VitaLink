/**
 * Valida el formato del número de licencia médica
 * @param {string} licenseNumber - Número de licencia médica a validar
 * @returns {boolean} - True si es válido, false en caso contrario
 */
const validateMedicalLicense = (licenseNumber) => {
    if (!licenseNumber) {
        return false;
    }

    // Eliminar espacios y convertir a string
    const cleaned = String(licenseNumber).trim().replace(/\s+/g, '');

    // Validación básica: debe ser alfanumérico y tener entre 6-12 caracteres
    // Ajustar este patrón según los requisitos específicos
    const licensePattern = /^[A-Z0-9]{6,12}$/i;

    return licensePattern.test(cleaned);
};

export default validateMedicalLicense;
