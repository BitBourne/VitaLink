import UserDAO from "../../Datos/DAOs/UserDAO.js";

/**
 * Servicio para actualizar el perfil del usuario autenticado
 * @param {number} userId - ID del usuario
 * @param {Object} updateData - Datos a actualizar (name, last_name, phone)
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateProfileService = async (userId, updateData) => {
    const userDAO = new UserDAO();

    const user = await userDAO.findById(userId);
    if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }

    // Solo permitir actualizar ciertos campos
    const allowedFields = ['name', 'last_name', 'phone'];
    const filteredData = {};

    allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
            filteredData[field] = updateData[field];
        }
    });

    await user.update(filteredData);

    // Retornar usuario sin el password
    const { password, token, ...userWithoutSensitiveData } = user.toJSON();
    return userWithoutSensitiveData;
};
