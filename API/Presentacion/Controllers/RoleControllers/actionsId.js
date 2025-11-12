import { assignRolesUserService, removeRolesUserService } from "../../../Negocio/UserRoleServices/userRoleServices.js";

export const assignRoleUserCtrlr = async (req, res, next) => {
    try {
        const { userId, roleId } = req.body;
        const assignRoleUserDTO = { userId, roleId }
        
        const result = await assignRolesUserService(assignRoleUserDTO);
        res.status(201).json({ message: result });
    } catch (error) {
        next(error);
    }
};
    






// controlador

    
const removeRoleUserCtrlr = async (req, res, next) => {
    try {
        const { userId, roleId } = req.body;
        const removeRoleUserDTO = {}
        
        const result = await removeRolesUserService(removeRoleUserDTO);
        res.json(result);
    } catch (error) {
        next(error);
    }
};


export default { removeRoleUserCtrlr}; 