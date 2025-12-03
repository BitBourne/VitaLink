import UserDAO from "../../Datos/DAOs/UserDAO.js";
import Role from "../../Datos/Models/Role.js";
import Permission from "../../Datos/Models/Permission.js";
import UserRoles from "../../Datos/Models/UserRoles.js";
import UserPermission from "../../Datos/Models/UserPermission.js";

/**
 * Obtiene todos los usuarios con sus roles y permisos
 * @returns {Promise<Array>} Lista de usuarios con roles y permisos
 */
export const getAllUsersWithRolesService = async () => {
    const userDAO = new UserDAO();

    // Obtener todos los usuarios con sus relaciones
    const users = await userDAO.model.findAll({
        attributes: ['id', 'name', 'last_name', 'email', 'verified'],
        include: [
            {
                model: UserRoles,
                as: 'user_roles',
                include: [{
                    model: Role,
                    as: 'UR_role',
                    attributes: ['id', 'name', 'description']
                }]
            },
            {
                model: UserPermission,
                as: 'user_permissions',
                include: [{
                    model: Permission,
                    as: 'UP_permission',
                    attributes: ['id', 'name', 'description']
                }]
            }
        ]
    });

    return users;
};

/**
 * Obtiene roles y permisos de un usuario específico
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Objeto con roles y permisos del usuario
 */
export const getUserRolesAndPermissionsService = async (userId) => {
    const userDAO = new UserDAO();

    const user = await userDAO.model.findByPk(userId, {
        attributes: ['id', 'name', 'last_name', 'email'],
        include: [
            {
                model: UserRoles,
                as: 'user_roles',
                include: [{
                    model: Role,
                    as: 'UR_role',
                    attributes: ['id', 'name', 'description']
                }]
            },
            {
                model: UserPermission,
                as: 'user_permissions',
                include: [{
                    model: Permission,
                    as: 'UP_permission',
                    attributes: ['id', 'name', 'description']
                }]
            }
        ]
    });

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user;
};

/**
 * Actualiza información de un usuario
 * @param {number} userId - ID del usuario
 * @param {Object} updateData - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateUserService = async (userId, updateData) => {
    const userDAO = new UserDAO();

    const user = await userDAO.model.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Solo permitir actualizar ciertos campos
    const allowedFields = ['name', 'last_name', 'email', 'phone'];
    const filteredData = {};

    allowedFields.forEach(field => {
        if (updateData[field] !== undefined) {
            filteredData[field] = updateData[field];
        }
    });

    await user.update(filteredData);
    return user;
};

/**
 * Suspende un usuario (desactiva su cuenta)
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Usuario suspendido
 */
export const suspendUserService = async (userId) => {
    const userDAO = new UserDAO();

    const user = await userDAO.model.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Marcamos el usuario como no verificado para suspenderlo
    await user.update({ verified: false });
    return user;
};

/**
 * Activa un usuario (reactiva su cuenta)
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} Usuario activado
 */
export const activateUserService = async (userId) => {
    const userDAO = new UserDAO();

    const user = await userDAO.model.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    await user.update({ verified: true });
    return user;
};

/**
 * Elimina un usuario del sistema
 * @param {number} userId - ID del usuario
 * @returns {Promise<void>}
 */
export const deleteUserService = async (userId) => {
    const userDAO = new UserDAO();

    const user = await userDAO.model.findByPk(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Verificar que no sea un admin el que se está eliminando
    const userWithRoles = await userDAO.model.findByPk(userId, {
        include: [{
            model: UserRoles,
            as: 'user_roles',
            include: [{
                model: Role,
                as: 'UR_role'
            }]
        }]
    });

    const isAdmin = userWithRoles.user_roles?.some(ur => ur.UR_role?.name === 'admin');
    if (isAdmin) {
        throw new Error('No se puede eliminar un usuario administrador');
    }

    await user.destroy();
};
