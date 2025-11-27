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
        res.json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default logIn;