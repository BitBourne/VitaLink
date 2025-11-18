import UserDAO from "../../Datos/DAOs/UserDAO.js";
import * as utils from '../../Infraestructura/utils/index.js';
import emailResetPassword from "./helpers/emailResetPassword.js";
import generateStringToken from "./helpers/generateStringToken.js";

const changePassStep1Service = async (ODT) => {

    // data from controller
    const { email } = ODT;

    // instance of DAO
    const userDAO = new UserDAO();

    // Prevent null inputs
    if( !email ) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validate email
    if( !utils.isValidEmail(email)) {
        const error = new Error('El email no es valido.');
        error.statusCode = 400;
        throw error;
    }

    // user exist?
    const user =  await userDAO.findOne({email});
    if( !user ) {
        const error = new Error('El email no es valido o no existe.');
        error.statusCode = 400;
        throw error;
    }

    // Create token and set in database
    const token = generateStringToken();
    const userUpdated = userDAO.setToken(user.id, {token: token});

    // send email
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