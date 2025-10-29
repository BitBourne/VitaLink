import singUpService from '../../../Negocio/authServices/singUpService.js';


const singUp = async (req, res, next) => {
    try {
        const { name, last_name, email, password, role } = req.body;
        const singUpDTO = { name, last_name, email, password, role };
    
        const result = await singUpService(singUpDTO);
        res.status(201).json({ message: result });
    } catch (error) {
        next(error);
    }
}

export default singUp;