
import UserDAO from '../../Datos/DAOs/UserDAO.js';
import * as utils from '../../Infraestructura/utils/index.js'
import comparePassword from './helpers/comparePassword.js';
import generateJWT from './helpers/generateJWT.js';
import UserRolesDAO from '../../Datos/DAOs/UserRoleDAO.js'

const logInService = async (logInDTO) => {
    // data from controller
    const { email, password } = logInDTO;

    // instance of DAO
    const userDAO = new UserDAO();
    const userRolesDAO = new UserRolesDAO;

    // Prevent null inputs
    if (!email || !password) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validate email
    if (!utils.isValidEmail(email)) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // exist user?
    const user = await userDAO.findOne({ email });
    if (!user) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // Obtener roles del usuario
    const roles = await userRolesDAO.findAllRolesByID(user.id);
    const roleNames = roles.map(r => r.UR_role.name);


    // compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // is Confirmed? (verificar explícitamente por si MySQL devuelve 0/1 en lugar de boolean)
    if (user.verified !== true && user.verified !== 1) {
        const error = new Error('Tu cuenta aun no ha sido verificada');
        error.statusCode = 400;
        throw error;
    }

    // Autenticar
    return {
        _id: user.id,
        nombre: user.name,
        email: user.email,
        token: generateJWT(user.id, roleNames)
    }

}

export {
    logInService,
}