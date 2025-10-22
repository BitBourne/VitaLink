import { logInService } from "../../../Negocio/authServices/logInService.js";

const logIn = async (req, res) => {
    const { email, password } = req.body;
    const logInDTO = { email, password }
    
    const result = await logInService(logInDTO);
    res.json({ message: result });
}

export default logIn;