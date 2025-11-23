

const logoutServices = async (logoutDTO) => {
    
    
    const { email } = logoutDTO;

    if(!email){
        const error = new Error('No hay sesión activa');
        error.statusCode = 400;
        throw error;
    }

    
    return { success: true, message: 'Sesión cerrada lógicamente' };
}

export {
    logoutServices,
}
