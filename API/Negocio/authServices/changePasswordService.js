import UserDAO from '../../Datos/DAOs/UserDAO.js';
import comparePassword from './helpers/comparePassword.js';
import hashPassword from './helpers/hashPassword.js';

const changePasswordService = async (userId, currentPassword, newPassword) => {
    const userDAO = new UserDAO();

    if (!currentPassword || !newPassword) {
        const error = new Error('La contraseña actual y la nueva son requeridas');
        error.statusCode = 400;
        throw error;
    }

    if (newPassword.length < 6) {
        const error = new Error('La nueva contraseña debe tener al menos 6 caracteres');
        error.statusCode = 400;
        throw error;
    }

    const user = await userDAO.model.findByPk(userId);
    if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }

    // Verificar contraseña actual
    const isPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isPasswordValid) {
        const error = new Error('La contraseña actual es incorrecta');
        error.statusCode = 401;
        throw error;
    }

    // Hashear nueva contraseña
    const hashedPassword = await hashPassword(newPassword);

    // Actualizar contraseña
    await user.update({ password: hashedPassword });

    return { message: 'Contraseña actualizada exitosamente' };
};

export default changePasswordService;
