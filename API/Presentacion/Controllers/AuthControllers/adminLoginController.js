import { adminLoginService } from "../../../Negocio/authServices/adminLoginService.js";

const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.ip || req.connection.remoteAddress || null;

        const loginDTO = {
            email,
            password,
            deviceInfo,
            ipAddress
        };

        const result = await adminLoginService(loginDTO);

        // Configurar cookie httpOnly con el token
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export default adminLogin;
