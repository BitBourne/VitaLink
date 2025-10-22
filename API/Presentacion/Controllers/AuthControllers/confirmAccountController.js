import confirmAccountService from '../../../Negocio/authServices/confirmAccountService.js'


const confirmAccount = async (req, res, next) => {
    const { token } = req.body;
    const singUpDTO = { token };

    const result = await confirmAccountService(singUpDTO);
    res.json({ message: result });
}

export default confirmAccount;