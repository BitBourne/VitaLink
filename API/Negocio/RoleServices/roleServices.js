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

    // Asociar permisos si vienen en el body
    if (newRoleData.permissions && newRoleData.permissions.length > 0) {
        const permisos = await permissionDAO.findAll({
            where: { id: newRoleData.permissions },
        });
        await newRole.setPermissions(permisos);
    }

    // Devolver el rol creado con sus permisos
    const createdRole = await Roles.findByPk(newRole.id, {
        include: {
        model: permissionDAO,
        through: { attributes: [] },
        },
    });

    return createdRole;
};

