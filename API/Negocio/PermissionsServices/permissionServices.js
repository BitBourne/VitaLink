import UserPermissionDAO from "../../Datos/DAOs/UserPermissionDAO.js";

export const assignPermissionService = async (assignPermissionDTO) => {
    const { userId, permissionId } = assignPermissionDTO;
    const userPermissionDAO = new UserPermissionDAO();

    const result = await userPermissionDAO.assignPermission(userId, permissionId);

    return result;
};
