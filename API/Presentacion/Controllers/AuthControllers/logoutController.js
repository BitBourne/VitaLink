import { logoutServices } from "../../../Negocio/authServices/logoutService.js";

const logout = async (req, res, next) => {
    try {
        const { email } = req.user;
        const logoutDTO = { email }

        const result = await logoutServices(logoutDTO);

        // Limpiar cookie del token
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.removeHeader('autorization');
        res.json(result);

    } catch (error) {
        next(error);
    }
}

export default logout;
