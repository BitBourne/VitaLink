import PermissionDAO from "../../../Datos/DAOs/PermissionDAO.js";

/**
 * Controlador para obtener todos los permisos disponibles
 */
export const getAllPermissionsCtrlr = async (req, res, next) => {
    try {
        const permissionDAO = new PermissionDAO();
        const permissions = await permissionDAO.findAll();

        res.status(200).json({
            success: true,
            data: permissions
        });
    } catch (error) {
        next(error);
    }
};