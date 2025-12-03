import UserRoleDAO from "../../Datos/DAOs/UserRoleDAO.js";

export const assignRolesUserService = async (assignRoleUserDTO) => {
  const { userId, roleId } = assignRoleUserDTO;
  const userRoleDAO = new UserRoleDAO();

  const result = await userRoleDAO.assignRole(userId, roleId);

  return result;
};

export const getRolesUserService = async () => {
  const userRoleDAO = new UserRoleDAO();
  const userRoles = await userRoleDAO.findAll();
  return userRoles;
};

export const removeRolesUserService = async () => {
  const userRoleDAO = new UserRoleDAO();
  const deleteUserRole = await userRoleDAO.delete({ where: { user_id: userId, rol_id: roleId } });
  return deleteUserRole;
};
