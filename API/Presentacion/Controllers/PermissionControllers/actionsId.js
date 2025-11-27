import { assignPermissionService } from "../../../Negocio/PermissionsServices/permissionServices.js";

export const assignPermissionCtrlr = async (req, res, next) => {
    try {
        const { roleId, permissionId } = req.body;
        const assignPermissionDTO = { roleId, permissionId }

        const result = await assignPermissionService(assignPermissionDTO);
        res.status(201).json({ message: result });
    } catch (error) {
        next(error);
    }
};
