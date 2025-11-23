import confirmAccountService from '../../../Negocio/authServices/confirmAccountService.js'


const confirmAccount = async (req, res, next) => {
    const { token } = req.body;
    const signUpDTO = { token };

    const result = await confirmAccountService(signUpDTO);
    res.json({ message: result });
}

export default confirmAccount;