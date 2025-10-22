import singUpService from '../../../Negocio/authServices/singUpService.js';


const singUp = async (req, res, next) => {
    const { name, last_name, email, password, role } = req.body;
    const singUpDTO = { name, last_name, email, password, role };

    const result = await singUpService(singUpDTO);
    res.json({ message: result });
}

export default singUp;