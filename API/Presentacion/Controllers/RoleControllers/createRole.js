import { createRoleService } from "../../../Negocio/RoleServices/roleServices.js";


const createRole = async (req, res, next) => {
    try {
        const { role_name, permissions } = req.body; // datos del nuevo rol
        const user = req.user; // viene del middleware

        const roleDTO = {
            userId: user.id,
            userRole: user.role_id,
            userPermissions: user.permissions,
            newRoleData: { role_name, permissions },
        };

        // envia la informacion al serivicio
        const result = await createRoleService(roleDTO);
        res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default createRole;