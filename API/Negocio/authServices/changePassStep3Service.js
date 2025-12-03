import UserDAO from "../../Datos/DAOs/UserDAO.js";
import hashPassword from "./helpers/hashPassword.js";

const changepassStep3Service = async (DTO) => {
    const { token, password } = DTO;
    const userDAO = new UserDAO();

    const user = await userDAO.findOne({ token });
    if (!user) {
        const error = new Error('El enlace no es valido o ha expirado');
        error.statusCode = 400;
        throw error;
    }

    if ( !password ) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Minimum 6 characters required for security
    if (password.length < 8) {
        const error = new Error('La contraseña debe tener al menos 8 caracteres');
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await hashPassword(password);
    await userDAO.update(user.id, { token: null, password: hashedPassword });

        return {
        succes: true,
        msg: "Tu contraseña se modificó correctamente. Ya puedes iniciar sesión"
    };
}

export default changepassStep3Service;