import * as utils from '../../Infraestructura/utils/index.js'

import UserDAO from '../../Datos/DAOs/UserDAO.js';
import UserPermissionDAO from '../../Datos/DAOs/UserPermissionDAO.js';
import UserRolesDAO from '../../Datos/DAOs/UserRoleDAO.js'
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

import generate6DigitToken from './helpers/generate6DigitToken.js';
import emailSingUp from './helpers/emailSingUp.js';
import hashPassword from './helpers/hashPassword.js';

const signUpService = async (signUpDTO) => {
    // data from controller
    const { name, last_name, email, password, roleId, permId } = signUpDTO;

    // instance of DAO
    const userDAO = new UserDAO();
    const userPermissionDAO = new UserPermissionDAO();
    const userRolesDAO = new UserRolesDAO();

    // Prevent null inputs
    if (!name || !last_name || !email || !password) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Email validation
    if (!utils.isValidEmail(email)) {
        const error = new Error('El email no es valido');
        error.statusCode = 400;
        throw error;
    }

    // password validation
    if (password.length < 6) {
        const error = new Error('La contraseña debe tener al menos 6 caracteres');
        error.statusCode = 400;
        throw error;
    }

    // prevent duplicated users
    const userExist = await userDAO.findOne({ email });
    if (userExist) {
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
            token: generate6DigitToken()
        });

        // Crear relación user-role
        const roleDefualt = roleId || 2;
        await userRolesDAO.create({
            user_id: usuario.id,
            role_id: roleDefualt
        });

        // Asignar permisos según el rol
        let permissionDefault = permId;
        if (!permId) {
            if (roleDefualt === 3) { // Rol de doctor
                permissionDefault = 5; // Permiso 'manage_own_schedule'
            } else if (roleDefualt === 2) { // Rol de paciente
                permissionDefault = 8; // Permiso 'manage_own_appointments'
            } else if (roleDefualt === 1) { // Rol de admin
                permissionDefault = 1; // Permiso 'todo'
            }
        }

        // Solo crear permiso si se definió uno
        if (permissionDefault) {
            await userPermissionDAO.create({
                user_id: usuario.id,
                permission_id: permissionDefault
            });
        }

        // Crear perfil de doctor si el rol asignado es de doctor
        if (roleDefualt === 3) {
            const doctorProfileDAO = new DoctorProfileDAO();
            await doctorProfileDAO.create({
                user_id: usuario.id,
                is_active: true,
            });
        }

        // send verification email (no fallar si el email no se puede enviar)
        try {
            await emailSingUp({ name, last_name, email, token: usuario.token });
        } catch (emailError) {
            console.log('Error enviando email (no crítico):', emailError.message);
            // No lanzar error, el usuario ya fue creado exitosamente
        }

        return 'Hemos enviado un email de verificacion a tu correo.';

    } catch (error) {
        console.log('Error in signUpService.js: ', error);
        const serviceError = new Error('Ocurrió un error al crear la cuenta.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default signUpService;