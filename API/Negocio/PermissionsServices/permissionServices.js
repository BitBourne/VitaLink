import UserPermissionDAO from "../../Datos/DAOs/UserPermissionDAO.js";



export const assignPermissionService = async ( assignPermissionDTO ) => {

        const { roleId, permissionId } = assignPermissionDTO;

        const userPermissionDAO = new UserPermissionDAO();

        const result = await userPermissionDAO.assignPermission(roleId, permissionId);

    return result;
};
