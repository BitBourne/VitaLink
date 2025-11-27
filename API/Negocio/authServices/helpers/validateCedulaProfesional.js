/**
 * Valida el formato de la cédula profesional (ID profesional mexicano)
 * @param {string} cedula - Cédula profesional a validar
 * @returns {boolean} - True si es válida, false en caso contrario
 */
const validateCedulaProfesional = (cedula) => {
    if (!cedula) {
        return false;
    }

    // Eliminar espacios y convertir a string
    const cleaned = String(cedula).trim().replace(/\s+/g, '');

    // La cédula profesional mexicana típicamente tiene 7-8 dígitos
    const cedulaPattern = /^\d{7,8}$/;

    return cedulaPattern.test(cleaned);
};

export default validateCedulaProfesional;
