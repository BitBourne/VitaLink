import UserDAO from '../../Datos/DAOs/UserDAO.js';
import UserSessionDAO from '../../Datos/DAOs/UserSessionDAO.js';
import UserRolesDAO from '../../Datos/DAOs/UserRoleDAO.js';
import * as utils from '../../Infraestructura/utils/index.js';
import comparePassword from './helpers/comparePassword.js';
import generateJWT from './helpers/generateJWT.js';

const adminLoginService = async (loginDTO) => {
    const { email, password, deviceInfo, ipAddress } = loginDTO;

    const userDAO = new UserDAO();
    const userRolesDAO = new UserRolesDAO();
    const userSessionDAO = new UserSessionDAO();

    // Validar campos obligatorios
    if (!email || !password) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validar formato de email
    if (!utils.isValidEmail(email)) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // Buscar usuario por email
    const user = await userDAO.findOne({ email });
    console.log('🔍 [Admin Login] User found:', user ? `ID: ${user.id}, Email: ${user.email}` : 'NOT FOUND');

    if (!user) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // Obtener roles del usuario
    const roles = await userRolesDAO.findAllRolesByID(user.id);
    const roleNames = roles.map(r => r.UR_role.name);
    console.log('👤 [Admin Login] User roles:', roleNames);

    // VALIDACIÓN CRÍTICA: Verificar que el usuario sea admin ANTES de continuar
    const isAdmin = roleNames.some(role => role.trim().toLowerCase() === 'admin');
    console.log('🔐 [Admin Login] Is admin?', isAdmin);

    if (!isAdmin) {
        const error = new Error('Acceso denegado. Solo administradores pueden acceder a esta área.');
        error.statusCode = 403;
        throw error;
    }

    // Validar contraseña
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // Verificar que la cuenta esté verificada
    if (user.verified !== true && user.verified !== 1) {
        const error = new Error('Tu cuenta de administrador aún no ha sido verificada. Contacta al super administrador.');
        error.statusCode = 403;
        throw error;
    }

    // Generar JWT con roles
    const token = generateJWT(user.id, roleNames);

    // Crear sesión
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); // 24 horas

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
        token: token,
        roles: roleNames
    };
};

export {
    adminLoginService,
};
