import * as utils from '../../Infraestructura/utils/index.js'

import UserDAO from '../../Datos/DAOs/UserDAO.js';

const singUpService = async (singUpDTO) => {

    const {name, last_name, email, password} = singUpDTO;

    // Prevent null inputs
    if(!name || !last_name || !email || !password) {
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

    // password validarion
    if(password.length < 6) {
        const error = new Error('La contraseña debe tener al menos 6 caracteres');
        error.statusCode = 400;
        throw error;
    }

    try {
        const userDAO = new UserDAO();
        
        const usuario = await userDAO.create({
            name,
            last_name,
            email,
            password,
            type_user: "doctor"
        });

        return usuario;
    } catch (error) {
        console.log( error);
        return error;
    }
    


    
};

export default singUpService;