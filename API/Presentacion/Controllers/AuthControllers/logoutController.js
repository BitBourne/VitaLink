import { logoutServices } from "../../../Negocio/authServices/logoutService.js";

const logout = async (req, res, next) => {
    try {
        const { email } = req.user;
        const logoutDTO = { email }

        const result = await logoutServices(logoutDTO);

        res.removeHeader('autorization');
        res.json(result);

    } catch (error) {
        next(error);
    }
}

export default logout;
