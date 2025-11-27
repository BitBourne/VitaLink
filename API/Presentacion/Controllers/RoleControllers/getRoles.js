import { getRolesService } from "../../../Negocio/RoleServices/roleServices.js";

const getRole = async (req, res, next) => {
    try {
        const roleDTO = {}

        const result = await getRolesService(roleDTO);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export default getRole;