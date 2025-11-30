import signUpService from '../../../Negocio/authServices/signUpService.js';

const signUp = async (req, res, next) => {
    try {
        const { name, last_name, email, password, roleId, medical_license_number, cedula_profesional } = req.body;

        // Extraer archivos subidos (si existen)
        const files = req.files || null;

        const signUpDTO = {
            name,
            last_name,
            email,
            password,
            roleId: roleId ? parseInt(roleId) : undefined,
            medical_license_number,
            cedula_profesional,
            files
        };

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