import * as utils from '../../Infraestructura/utils/index.js'

import UserDAO from '../../Datos/DAOs/UserDAO.js';
import UserPermissionDAO from '../../Datos/DAOs/UserPermissionDAO.js';
import UserRolesDAO from '../../Datos/DAOs/UserRoleDAO.js'
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

import generateToken from './helpers/generateToken.js';
import emailSingUp from './helpers/emailSingUp.js';
import hashPassword from './helpers/hashPassword.js';

// REVISAR QUE NO SE CREE UN USER SI HAY UN ERROR EN LA DB O BACK
const singUpService = async (singUpDTO) => {
    // data from controller
    const { name, last_name, email, password, roleId, permId} = singUpDTO;
    
    // instance of DAO
    const userDAO = new UserDAO();
    const userPermissionDAO = new UserPermissionDAO();
    const userRolesDAO = new UserRolesDAO();

    // Prevent null inputs
    if(!name || !last_name || !email || !password) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400; 
        throw error;
    }

    // // Validación de rol (solo si viene desde el frontend)
    // const PUBLIC_ROLES = [1, 2];
    // const roleId = role ? parseInt(role, 10) : DEFAULT_ROLE_ID;

    // if (!PUBLIC_ROLES.includes(roleId)) {
    //     const error = new Error('Rol no válido.');
    //     error.statusCode = 400;
    //     throw error;
    // }

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
            token: generateToken()
        });

        // Crear relación user-role (aquí se asigna el rol por defecto o el que venga)
        const roleDefualt = roleId || 2;
        await userRolesDAO.create({
            user_id: usuario.id,
            role_id: roleDefualt
        });

        // Asignar permisos según el rol
        let permissionDefault = permId;
        if (!permId) {
            if (roleDefualt === 3) { // Rol de doctor
                permissionDefault = 5; // Ejemplo: ID del permiso 'manage_own_schedule'
            } else if (roleDefualt === 2) { // Rol de paciente
                permissionDefault = 8; // Ejemplo: ID del permiso 'manage_own_appointments'
            }
        }

        await userPermissionDAO.create({
            user_id: usuario.id,
            permission_id: permissionDefault
        });

        // Crear perfil de doctor si el rol asignado es de doctor (por ejemplo, role_id = 3)
        if (roleDefualt === 3) {
            const doctorProfileDAO = new DoctorProfileDAO();
            await doctorProfileDAO.create({
                user_id: usuario.id,
                is_active: true, // Por defecto, el perfil está activo
            });
        }

        // // validar que el rol existe
        // const roleExists = await roleDAO.findById(roleId);
        // if (!roleExists) {
        //     const error = new Error('El rol especificado no existe');
        //     error.statusCode = 400;
        //     throw error;
        // }

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