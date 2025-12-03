import {
    getAllUsersWithRolesService,
    getUserRolesAndPermissionsService,
    updateUserService,
    suspendUserService,
    activateUserService,
    deleteUserService
} from "../../../Negocio/UserServices/userServices.js";

/**
 * Controlador para obtener todos los usuarios con sus roles y permisos
 */
export const getAllUsersCtrlr = async (req, res, next) => {
    try {
        const users = await getAllUsersWithRolesService();

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controlador para obtener roles y permisos de un usuario específico
 */
export const getUserRolesPermissionsCtrlr = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await getUserRolesAndPermissionsService(parseInt(userId));

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controlador para actualizar información de un usuario
 */
export const updateUserCtrlr = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;

        const user = await updateUserService(parseInt(userId), updateData);

        res.status(200).json({
            success: true,
            msg: 'Usuario actualizado exitosamente',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controlador para suspender un usuario
 */
export const suspendUserCtrlr = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await suspendUserService(parseInt(userId));

        res.status(200).json({
            success: true,
            msg: 'Usuario suspendido exitosamente',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controlador para activar un usuario
 */
export const activateUserCtrlr = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await activateUserService(parseInt(userId));

        res.status(200).json({
            success: true,
            msg: 'Usuario activado exitosamente',
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controlador para eliminar un usuario
 */
export const deleteUserCtrlr = async (req, res, next) => {
    try {
        const { userId } = req.params;
        await deleteUserService(parseInt(userId));

        res.status(200).json({
            success: true,
            msg: 'Usuario eliminado exitosamente'
        });
    } catch (error) {
        next(error);
    }
};

