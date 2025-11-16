import RoleDAO from '../../Datos/DAOs/RoleDAO.js';
import PermissionDAO from "../../Datos/DAOs/PermissionDAO.js";


export const getRolesService = async () => {
  const roleDAO = new RoleDAO();

  // Obtener todos los roles
  const roles = await roleDAO.findAll();

  return roles;
};


export const updateRoleService = async () => {
  const roleDAO = new RoleDAO();

  // Obtener todos los roles
  const roles = await roleDAO.findAll();

  return roles;
};


 


export const createRoleService = async (roleDTO) => {

    // recibe informacion del controller
    const { userPermissions, newRoleData } = roleDTO;

    const roleDAO = new RoleDAO();
    const permissionDAO = new PermissionDAO();



    // Verificar permiso
    if (!userPermissions.includes("CREATE_ROLE")) {
        throw new Error("No tienes permiso para esta accion");
    }

    // Crear el nuevo rol
    const newRole = await roleDAO.create({
        role_name: newRoleData.role_name,
    });

    // Devolver el rol creado
    const createdRole = await Roles.findByPk(newRole.id);

    return createdRole;
};

