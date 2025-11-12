import jwt from 'jsonwebtoken';


import UserDAO from '../../Datos/DAOs/UserDAO.js';
import RoleDAO from '../../Datos/DAOs/RoleDAO.js';
import PermissionDAO from '../../Datos/DAOs/PermissionDAO.js';

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


            const userDAO = new UserDAO();
            const user = await userDAO.findById(decoded.id);

            const { id, name, last_name, email } = user;
            req.user = { id, name, last_name, email }

    
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
};


// checkRole
const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        const userDAO = new UserDAO();
        const roles = await userDAO.getUserRoles(req.user.id);
        console.log("ROLES DEL USUARIO:", roles);

        const roleNames = roles.map(r => r.name);
        const hasRole = allowedRoles.some(role => roleNames.includes(role));

        if (!hasRole) {
            const error = new Error('No tienes los permisos necesarios para acceder a este recurso.');
            error.statusCode = 403;
            return next(error);
        }

        next();
    };
};

// checkPermission
const checkPermission = (allowedPermissions) => {
    return async (req, res, next) => {
        const userDAO = new UserDAO();
        const roleDAO = new RoleDAO();

        // Obtener roles del usuario
        const roles = await userDAO.getUserRoles(req.user.id);
        if (!roles.length) {
            return res.status(403).json({ success: false, msg: "No tienes roles asignados" });
        }

        // Obtener IDs de roles
        const roleIds = roles.map(r => r.id);

        // Obtener permisos de esos roles
        const permissions = await roleDAO.getPermissionsByRoles(roleIds);
        const permissionNames = permissions.map(p => p.name);

        // Validar si el usuario tiene al menos uno de los permisos requeridos
        const hasPermission = allowedPermissions.some(perm => permissionNames.includes(perm));


        if (!hasPermission) {
            const error = new Error(`No tienes permiso para: ${allowedPermissions.join(', ')}`);
            error.statusCode = 403;
            return next(error);
        }

        next();
    };
};



export { checkAuth, checkRole, checkPermission };