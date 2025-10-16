import singUpService from '../../../Negocio/authServices/singUpService.js';


const singUp = async (req, res, next) => {
    const { name, last_name, email, password } = req.body;
    let singUpDTO = { name, last_name, email, password };

    const result = await singUpService(singUpDTO);
    res.json({ message: result });
}

export default singUp;