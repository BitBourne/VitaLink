import signUpService from '../../../Negocio/authServices/signUpService.js';

const signUp = async (req, res, next) => {
    try {
        const { name, last_name, email, password, roleId, medical_license_number, cedula_profesional } = req.body;
        const signUpDTO = { name, last_name, email, password, roleId, medical_license_number, cedula_profesional };

        const result = await signUpService(signUpDTO);
        res.status(201).json({
            success: true,
            message: result
        });
    } catch (error) {
        next(error);
    }
}

export default signUp;