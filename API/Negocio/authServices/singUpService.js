import * as utils from '../../Infraestructura/utils/index.js'

import UserDAO from '../../Datos/DAOs/UserDAO.js';
import generateToken from './helpers/generate6DigitToken.js';
import emailSingUp from './helpers/emailSingUp.js';
import hashPassword from './helpers/hashPassword.js';

const singUpService = async (singUpDTO) => {
    // data from controller
    const { name, last_name, email, password, role } = singUpDTO;
    
    // instance of DAO
    const userDAO = new UserDAO();

    // Prevent null inputs
    if(!name || !last_name || !email || !password || !role) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Rol validation
    const PUBLIC_ROLES = [1, 2]; // role_id in DB
    if (!PUBLIC_ROLES.includes(parseInt(role, 10))) {
        const error = new Error('Rol no válido.');
        error.statusCode = 400;
        throw error;
    }

    // Email validation
    if(!utils.isValidEmail(email)) { 
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
            role_id: role,
            token: generateToken()
        });

        // send verification email
       await emailSingUp({name, last_name, email, token: usuario.token})

        return 'Hemos enviado un email de verificacion a tu correo.';

    } catch (error) {
        console.log( 'Error in singUpService.js: ', error);
        const serviceError = new Error('Ocurrió un error al crear la cuenta.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default singUpService;