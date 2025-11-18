import UserDAO from "../../Datos/DAOs/UserDAO.js";
import hashPassword from "./helpers/hashPassword.js";

const changepassStep3Service = async (DTO) => {
    const { token, password } = DTO;
    const userDAO = new UserDAO();

    // Search the user with the token in the DB
    const user = await userDAO.findOne({token});
    if( !user ) {
        const error = new Error('El enlace no es valido o ha expirado');
        error.statusCode = 400;
        throw error;
    }

    const hashedPassword = await hashPassword(password);

    // Remove the token from the DB
    await userDAO.update(user.id, {token: null, password: hashedPassword});

    return { msg: 'Tu contraseña se modifico correctamente.' }; 
}

export default changepassStep3Service;