import UserDAO from '../../Datos/DAOs/UserDAO.js';
import UserSessionDAO from '../../Datos/DAOs/UserSessionDAO.js';
import * as utils from '../../Infraestructura/utils/index.js'
import comparePassword from './helpers/comparePassword.js';
import generateJWT from './helpers/generateJWT.js';
import UserRolesDAO from '../../Datos/DAOs/UserRoleDAO.js'

const logInService = async (logInDTO) => {
    const { email, password, deviceInfo, ipAddress } = logInDTO;

    const userDAO = new UserDAO();
    const userRolesDAO = new UserRolesDAO();
    const userSessionDAO = new UserSessionDAO();

    if (!email || !password) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (!utils.isValidEmail(email)) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    const user = await userDAO.findOne({ email });
    if (!user) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    const roles = await userRolesDAO.findAllRolesByID(user.id);
    const roleNames = roles.map(r => r.UR_role.name);

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // MySQL puede devolver 0/1 en lugar de booleano
    if (user.verified !== true && user.verified !== 1) {
        const error = new Error('Tu cuenta aun no ha sido verificada');
        error.statusCode = 400;
        throw error;
    }

    const token = generateJWT(user.id, roleNames);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1);

    await userSessionDAO.createSession({
        user_id: user.id,
        token: token,
        device_info: deviceInfo || 'Unknown Device',
        ip_address: ipAddress || null,
        expires_at: expiresAt,
        is_active: true
    });

    return {
        _id: user.id,
        nombre: user.name,
        email: user.email,
        token: token
    }
}

export {
    logInService,
}