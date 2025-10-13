import User from "../../../../../Odonto/web3/Odonto_API/Models/User";

const loginService = (email, password) => {



    const dto = new LoginDao({email, password});



    if(password) {
        return "TU contraseña es correcta";
    }
    else {
        return "TU contraseña es incorrecta";
    }

}


export {
    loginService,
}




















const controlador = () => {
    // Llamadas a servicios, etc.
    const result = servicio();

    // Respuesta a usuario
    return result.json(result);

}


const servicio = () => {
    // Validaciones, lógica de negocio, etc.

    // Preparación de datos para DAO
    const dto = {email: "", password: ""};

    // Llamada a DAO
    const result = pacienteDAO.findUserByID(dto);

    // Respuesta al controlador
    return result;


}


const dao = (dto) => {

    const {email, password} = dto;

    // Funciones simuladas
    const executeQuery = (query) => {
        return "Resultado de la consulta";
    }

    // Simulación de consulta a base de datos
    const query = `SELECT * FROM users WHERE ${email} = ? AND ${password} = ?`;
    const result = executeQuery(query);

    const resultORM = findUserByID(1);

    // Retornar resultado
    return resultORM;

}


const pacienteDAO = (dto) => {

    const {email, password} = dto;

    const findUserByID = (id) => {
        const user = PatientModel.findUserByID(1);

        return user;
    }

    const findAll = () => {
        const user = findAll();

        return user;
    }
    const UpdateUser = () => {
        const user = findAll();

        return user;
    }
    const DeleteUser = () => {
        const user = findAll();

        return user;
    }
}


class PatientDAO extends BaseDAO {

    findUserByID = (id) => {
        return `Usuario con ID: ${id}`;
    }

}


class BaseDAO {

    findAll = () => {
        return "Todos los usuarios";
    }   

    findByID = (id) => {
        return `Usuario con ID: ${id}`;
    }

    create = (user) => {
        return `Usuario creado: ${user}`;
    }   

    update = (id, user) => {
        return `Usuario con ID: ${id} actualizado a ${user}`;
    }

    deleteByID = (id) => {
        return `Usuario con ID: ${id} eliminado`;
    }
}