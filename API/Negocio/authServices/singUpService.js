import * as utils from '../../Infraestructura/utils/index.js'

import UserDAO from '../../Datos/DAOs/UserDAO.js';
import generateToken from './helpers/generateToken.js';
import emailSingUp from './helpers/emailSingUp.js';
import hashPassword from './helpers/hashPassword.js';

const singUpService = async (singUpDTO) => {
    // data from controller
    const {name, last_name, email, password, role} = singUpDTO;
    
    // instance of DAO
    const userDAO = new UserDAO();

    // Prevent null inputs
    if(!name || !last_name || !email || !password || !role) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Email validation
    if(utils.isValidEmail(email)) { 
        const error = new Error('El email no es valido');
        error.statusCode = 400;
        throw error;
    }

    // password validation
    if(password.length < 6) {
        const error = new Error('La contraseña debe tener al menos 6 caracteres');
        error.statusCode = 400;
        throw error;
    }

    // prevent duplicated users
    const userExist =  await userDAO.findOne({email});
    if( userExist ) {
        const error = new Error('Este usuario ya existe');
        error.statusCode = 400;
        throw error;
    }

    try {

        const hashedPassword = await hashPassword(password);

        const usuario = await userDAO.create({
            name,
            last_name,
            email,
            password: hashedPassword,
            role,
            token: generateToken()
        });

        // send verification email
        emailSingUp({name, last_name, email, token: usuario.token})

        return 'Hemos enviado un email de verificacion a tu correo.';

    } catch (error) {
        console.log( error);
        return error;
    }
};

export default singUpService;