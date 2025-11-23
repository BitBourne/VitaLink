import signUpService from '../../../Negocio/authServices/signUpService.js';


const signUp = async (req, res, next) => {
    try {
        const { name, last_name, email, password, roleId } = req.body;
        const signUpDTO = { name, last_name, email, password, roleId };

        const result = await signUpService(signUpDTO);
        res.status(201).json({ message: result });
    } catch (error) {
        next(error);
    }
}

export default signUp;