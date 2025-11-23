import { getRolesService } from "../../../Negocio/RoleServices/roleServices.js";

const getRoleById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const roles = await getRolesService();
        const role = roles.find(r => r.id === parseInt(id));

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Rol no encontrado"
            });
        }

        res.json(role);
    } catch (error) {
        next(error);
    }
}

export default getRoleById;
