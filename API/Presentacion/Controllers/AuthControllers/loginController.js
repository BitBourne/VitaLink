import { logInService } from "../../../Negocio/authServices/logInService.js";

const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
        const ipAddress = req.ip || req.connection.remoteAddress || null;

        const logInDTO = {
            email,
            password,
            deviceInfo,
            ipAddress
        };

        const result = await logInService(logInDTO);

        // Configurar cookie httpOnly con el token
        res.cookie('token', result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
            sameSite: 'lax', // Lax es mejor para navegación normal
            path: '/', // Asegura que la cookie esté disponible en todas las rutas
            maxAge: 24 * 60 * 60 * 1000 // 24 horas
        });

        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default logIn;