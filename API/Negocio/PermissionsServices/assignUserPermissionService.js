import UserPermissionDAO from '../../Datos/DAOs/UserPermissionDAO.js';
import UserDAO from '../../Datos/DAOs/UserDAO.js';

const assignUserPermissionService = async (assignDTO) => {
    const { user_id, permission_id } = assignDTO;

    const userPermissionDAO = new UserPermissionDAO();
    const userDAO = new UserDAO();

    if (!user_id || !permission_id) {
        const error = new Error('user_id y permission_id son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    const user = await userDAO.findById(user_id);
    if (!user) {
        const error = new Error('Usuario no encontrado');
        error.statusCode = 404;
        throw error;
    }

    const existingPermission = await userPermissionDAO.findOne({
        user_id,
        permission_id
    });

    if (existingPermission) {
        const error = new Error('El usuario ya tiene este permiso asignado');
        error.statusCode = 400;
        throw error;
    }

    await userPermissionDAO.assignPermission(user_id, permission_id);

    return {
        success: true,
        message: 'Permiso asignado exitosamente al usuario'
    };
};

export default assignUserPermissionService;
