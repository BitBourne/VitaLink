import signUpService from '../../../Negocio/authServices/signUpService.js';


const profile = async (req, res, next) => {
    try {
        const { user } = req;

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

export default profile;