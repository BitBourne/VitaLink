const ErrorHandling = (err, req, res, next) => {
    // Default state code
    const stateCode = err.statusCode || 500;

    // Error response 
    res.status(stateCode).json({
        success: false,
        msg: err.message || 'Error interno del servidor'
    });
}

export default ErrorHandling;