import UserDAO from '../../Datos/DAOs/UserDAO.js';

const updateProfileService = async (userId, updateData) => {
    const userDAO = new UserDAO();

    const user = await userDAO.model.findByPk(userId);
    if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }

    // Campos permitidos para actualización de perfil propio
    const allowedFields = ['name', 'last_name', 'phone'];
    const filteredData = {};

    allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
            filteredData[field] = updateData[field];
        }
    });

    // Nota: El email no se actualiza aquí por seguridad/verificación, 
    // pero si se requiere, se podría agregar con lógica de re-verificación.

    await user.update(filteredData);

    return {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone
    };
};

export default updateProfileService;
