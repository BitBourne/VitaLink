import RoleDAO from '../../Datos/DAOs/RoleDAO.js';
import PermissionDAO from "../../Datos/DAOs/PermissionDAO.js";

export const getRolesService = async () => {
  const roleDAO = new RoleDAO();
  const roles = await roleDAO.findAll();
  return roles;
};

export const updateRoleService = async () => {
  const roleDAO = new RoleDAO();
  const roles = await roleDAO.findAll();
  return roles;
};

export const createRoleService = async (roleDTO) => {
  const { userPermissions, newRoleData } = roleDTO;

  const roleDAO = new RoleDAO();
  const permissionDAO = new PermissionDAO();

  if (!userPermissions.includes("CREATE_ROLE")) {
    throw new Error("No tienes permiso para esta accion");
  }

  const newRole = await roleDAO.create({
    role_name: newRoleData.role_name,
  });

  const createdRole = await Roles.findByPk(newRole.id);

  return createdRole;
};
