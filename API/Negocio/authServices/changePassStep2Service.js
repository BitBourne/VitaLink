import UserDAO from "../../Datos/DAOs/UserDAO.js";

const changePassStep2Service = async (ODT) => { 

    const { token } = ODT;
    const userDAO = new UserDAO();

    // check if some user have the token
    const user = await userDAO.findOne({token});
    if( !user ) {
        const error = new Error('El enlace no es valido o ha expirado.');
        error.statusCode = 400;
        throw error; 
    }

    return { 
        succes: true,
        msg: 'token valido'
    } 
}

export default changePassStep2Service;