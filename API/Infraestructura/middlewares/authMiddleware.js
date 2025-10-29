import jwt from 'jsonwebtoken';
import UserDAO from '../../Datos/DAOs/UserDAO.js';

// Middleware to authenticate users
const checkAuth = async (req, res, next) => {
    let token;

    // check if the JWT exists in the request headers
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // take the JWT from request headers
            token = req.headers.authorization.split(" ")[1];
    
            // verify JWT
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            req.user = { id: decoded.id, role: decoded.role };
    
            return next();
        } catch (error) {
            const err = new Error('Sesión no válida o expirada');
            err.statusCode = 401;
            return next(err);
        }
    }

    if (!token) {
        const error = new Error('No se proporcionó un token, permiso no válido');
        error.statusCode = 401;
        return next(error);
    }

    // finally the middleware
    next();
}

// Recibe un array de roles permitidos (ej: [1] para doctor, [2] para paciente)
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        // Asumimos que verifyToken ya se ejecutó, por lo que tenemos req.user
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            const error = new Error('No tienes los permisos necesarios para acceder a este recurso.');
            error.statusCode = 403; // 403 Forbidden
            return next(error);
        }
        next(); // El rol es correcto, continuar
    };
};

export default { checkAuth, checkRole };