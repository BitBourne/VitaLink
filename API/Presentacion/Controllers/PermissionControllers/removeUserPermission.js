import { removeUserPermissionService } from "../../../Negocio/PermissionsServices/removeUserPermissionService.js";

/**
 * Controlador para remover un permiso de un usuario
 */
export const removeUserPermissionCtrlr = async (req, res, next) => {
    try {
        const { user_id, permission_id } = req.body;
        const removeDTO = { user_id, permission_id };

        const result = await removeUserPermissionService(removeDTO);

        if (result === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontró la asignación de permiso'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Permiso removido exitosamente'
        });
    } catch (error) {
        next(error);
    }
};
