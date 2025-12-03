import UserPermissionDAO from "../../Datos/DAOs/UserPermissionDAO.js";

/**
 * Servicio para remover un permiso de un usuario
 * @param {Object} removePermissionDTO - DTO con user_id y permission_id
 * @returns {Promise<number>} Número de registros eliminados
 */
export const removeUserPermissionService = async (removePermissionDTO) => {
    const { user_id, permission_id } = removePermissionDTO;
    const userPermissionDAO = new UserPermissionDAO();

    const result = await userPermissionDAO.removePermission(user_id, permission_id);

    return result;
};

export default removeUserPermissionService;
