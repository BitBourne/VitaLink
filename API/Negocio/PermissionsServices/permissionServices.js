import RolePermissionDAO from "../../Datos/DAOs/RolePermissionsDAO.js";



export const assignPermissionService = async ( assignPermissionDTO ) => {

        const { roleId, permissionId } = assignPermissionDTO;

        const rolePermissionDAO = new RolePermissionDAO();

        const result = await rolePermissionDAO.assignPermission(roleId, permissionId);

    return result;
};
