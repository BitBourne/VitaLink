import { createRoleService } from "../../../Negocio/RoleServices/roleServices.js";

const createRole = async (req, res, next) => {
  try {
    const { role_name, permissions } = req.body;
    const user = req.user;

    const roleDTO = {
      userId: user.id,
      userRole: user.role_id,
      userPermissions: user.permissions,
      newRoleData: { role_name, permissions },
    };

    const result = await createRoleService(roleDTO);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export default createRole;