import assignUserPermissionService from "../../../Negocio/PermissionsServices/assignUserPermissionService.js";

export const assignUserPermissionCtrlr = async (req, res, next) => {
    try {
        const { user_id, permission_id } = req.body;
        const assignDTO = { user_id, permission_id };

        const result = await assignUserPermissionService(assignDTO);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};
