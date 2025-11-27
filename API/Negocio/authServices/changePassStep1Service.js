import UserDAO from "../../Datos/DAOs/UserDAO.js";
import * as utils from '../../Infraestructura/utils/index.js';
import emailResetPassword from "./helpers/emailResetPassword.js";
import generateStringToken from "./helpers/generateStringToken.js";

const changePassStep1Service = async (ODT) => {
    const { email, medical_license } = ODT;
    const userDAO = new UserDAO();

    if (!email) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (!utils.isValidEmail(email)) {
        const error = new Error('El email no es valido.');
        error.statusCode = 400;
        throw error;
    }

    const user = await userDAO.findOne({ email });
    if (!user) {
        const error = new Error('El email no es valido o no existe.');
        error.statusCode = 400;
        throw error;
    }

    // Verificar si el usuario es un doctor
    const UserRolesDAO = (await import('../../Datos/DAOs/UserRoleDAO.js')).default;
    const userRolesDAO = new UserRolesDAO();
    const roles = await userRolesDAO.findAllRolesByID(user.id);
    const isDoctor = roles.some(r => r.UR_role.name === 'doctor');

    if (isDoctor) {
        if (!medical_license) {
            const error = new Error('Para doctores, se requiere el número de licencia médica para restablecer la contraseña.');
            error.statusCode = 400;
            throw error;
        }

        const DoctorProfileDAO = (await import('../../Datos/DAOs/DoctorProfileDAO.js')).default;
        const doctorProfileDAO = new DoctorProfileDAO();
        const doctorProfile = await doctorProfileDAO.findOne({ user_id: user.id });

        if (!doctorProfile || doctorProfile.medical_license_number !== medical_license) {
            const error = new Error('El número de licencia médica no coincide con nuestros registros.');
            error.statusCode = 400;
            throw error;
        }
    }

    const token = generateStringToken();
    const userUpdated = userDAO.setToken(user.id, { token: token });

    emailResetPassword({
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        token: token
    });

    return {
        succes: true,
        msg: "Te hemos enviado un correo con las instrucciones"
    };
}

export default changePassStep1Service;