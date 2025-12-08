import UserDAO from "../../Datos/DAOs/UserDAO.js";
import bcrypt from 'bcrypt';

/**
 * Servicio para cambiar la contraseña del usuario autenticado
 * @param {number} userId - ID del usuario
 * @param {string} currentPassword - Contraseña actual
 * @param {string} newPassword - Nueva contraseña
 * @returns {Promise<Object>} Resultado de la operación
 */
export const changePasswordService = async (userId, currentPassword, newPassword) => {
    const userDAO = new UserDAO();

    const user = await userDAO.findById(userId);
    if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }

    // Verificar que la contraseña actual sea correcta
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
        const error = new Error('La contraseña actual es incorrecta');
        error.statusCode = 401;
        throw error;
    }

    // Validar que la nueva contraseña sea diferente
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        const error = new Error('La nueva contraseña debe ser diferente a la actual');
        error.statusCode = 400;
        throw error;
    }

    // Hash de la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña
    await user.update({ password: hashedPassword });

    return {
        success: true,
        message: 'Contraseña actualizada correctamente'
    };
};
