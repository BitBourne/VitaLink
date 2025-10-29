import { logInService } from "../../../Negocio/authServices/logInService.js";

const logIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const logInDTO = { email, password }
        
        const result = await logInService(logInDTO);
        res.json({ message: result });
    } catch (error) {
        next(error);
    }
}

export default logIn; 