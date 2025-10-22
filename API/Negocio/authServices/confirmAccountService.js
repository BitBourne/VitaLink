import UserDAO from '../../Datos/DAOs/UserDAO.js';

const confirmAccountService = async (confirmAccountDTO) => {
    // data from controller
    const { token } = confirmAccountDTO;
    
    // instance of DAO
    const userDAO = new UserDAO();

    // Prevent null inputs
    if( !token ) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    // search for the token
    const userToConfirm =  await userDAO.findOne({token});
    if( !userToConfirm ) {
        const error = new Error('Este codigo no es valido o ha expirado');
        error.statusCode = 400;
        throw error;
    }

    try {
        const userConfirmed = await userDAO.update(userToConfirm.id, { token: null, verified: true });

        return userConfirmed;

    } catch (error) {
        console.log( error);
        return error;
    }
};

export default confirmAccountService;