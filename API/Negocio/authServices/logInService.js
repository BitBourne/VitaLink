
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
    if( !email || !password ) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validate email
    if( !utils.isValidEmail(email)) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // exist user?
    const user =  await userDAO.findOne({email});
    if( !user ) {
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }

    // Obtener roles del usuario
    const roles = await userRolesDAO.findAllRolesByID(user.id); 
    const roleNames = roles.map(r => r.UR_role.name); // aquí accedes al alias 'role'


    // compare password
    const isPasswordValid = await comparePassword(password, user.password);
    if( !isPasswordValid ){
        const error = new Error('El email o la contraseña son incorrectos.');
        error.statusCode = 400;
        throw error;
    }
    
    // is Confirmed?
    if( !user.verified ) {
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




















// const controlador = () => {
//     // Llamadas a servicios, etc.
//     const result = servicio();

//     // Respuesta a usuario
//     return result.json(result);

// }


// const servicio = () => {
//     // Validaciones, lógica de negocio, etc.

//     // Preparación de datos para DAO
//     const dto = {email: "", password: ""};

//     // Llamada a DAO
//     const result = pacienteDAO.findUserByID(dto);

//     // Respuesta al controlador
//     return result;


// }


// const dao = (dto) => {

//     const {email, password} = dto;

//     // Funciones simuladas
//     const executeQuery = (query) => {
//         return "Resultado de la consulta";
//     }

//     // Simulación de consulta a base de datos
//     const query = `SELECT * FROM users WHERE ${email} = ? AND ${password} = ?`;
//     const result = executeQuery(query);

//     const resultORM = findUserByID(1);

//     // Retornar resultado
//     return resultORM;

// }


// const pacienteDAO = (dto) => {

//     const {email, password} = dto;

//     const findUserByID = (id) => {
//         const user = PatientModel.findUserByID(1);

//         return user;
//     }

//     const findAll = () => {
//         const user = findAll();

//         return user;
//     }
//     const UpdateUser = () => {
//         const user = findAll();

//         return user;
//     }
//     const DeleteUser = () => {
//         const user = findAll();

//         return user;
//     }
// }


// class PatientDAO extends BaseDAO {

//     findUserByID = (id) => {
//         return `Usuario con ID: ${id}`;
//     }

// }


// class BaseDAO {

//     findAll = () => {
//         return "Todos los usuarios";
//     }   

//     findByID = (id) => {
//         return `Usuario con ID: ${id}`;
//     }

//     create = (user) => {
//         return `Usuario creado: ${user}`;
//     }   

//     update = (id, user) => {
//         return `Usuario con ID: ${id} actualizado a ${user}`;
//     }

//     deleteByID = (id) => {
//         return `Usuario con ID: ${id} eliminado`;
//     }
// }