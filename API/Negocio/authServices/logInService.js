
import * as utils from '../../Infraestructura/utils/index.js'
import UserDAO from '../../Datos/DAOs/UserDAO.js';

const logInService = async (logInDTO) => {
    // data from controller
    const { email, password } = logInDTO;

    // instance of DAO
    const userDAO = new UserDAO();


        // Prevent null inputs
    if( !email || !password ) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // Validate email
    if( utils.isValidEmail(email)) {
        const error = new Error('El email no es valido');
        error.statusCode = 400;
        throw error;
    }

    // exist user?
    const user =  await userDAO.findOne({email});
    if( !userExist ) {
        const error = new Error('Este usuario no existe');
        error.statusCode = 400;
        throw error;
    }

    // is Confirmed?
    if( !user.verified ) {
        const error = new Error('Tu cuenta aun no ha sido verificada');
        error.statusCode = 400;
        throw error;
    }

    // compare password





    try {
        const userDAO = new UserDAO();

        const profile = await userDAO.logIn({
            email,
            password
        });

        return profile
    } catch (error) {
        
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