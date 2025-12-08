import { removeRolesUserService } from "../../../Negocio/UserRoleServices/userRoleServices.js";

/**
 * Controlador para remover un rol de un usuario
 */
export const removeUserRoleCtrlr = async (req, res, next) => {
    try {
        const { userId, roleId } = req.body;
        const removeRoleDTO = { userId, roleId };

        const result = await removeRolesUserService(removeRoleDTO);

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la asignación de rol'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Rol removido exitosamente'
        });
    } catch (error) {
        next(error);
    }
};