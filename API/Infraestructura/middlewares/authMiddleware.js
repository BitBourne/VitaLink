import jwt from 'jsonwebtoken';
import UserDAO from '../../Datos/DAOs/UserDAO.js';

const checkAuth = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const userDAO = new UserDAO();
            const user = await userDAO.findById(decoded.id);

            const roles = await userDAO.getUserRoles(decoded.id);
            // Eliminar espacios en blanco para asegurar coincidencia consistente de roles
            const roleNames = roles.map(r => r.name.trim());

            const { id, name, last_name, email } = user;
            req.user = { id, name, last_name, email, roles: roleNames };

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

const checkRole = (allowedRoles) => {
    return async (req, res, next) => {
        const userDAO = new UserDAO();
        const roles = await userDAO.getUserRoles(req.user.id);

        // Eliminar espacios en blanco para asegurar coincidencia consistente de roles
        const roleNames = roles.map(r => r.name.trim());
        const hasRole = allowedRoles.some(role => roleNames.includes(role));

        if (!hasRole) {
            const error = new Error('No tienes los permisos necesarios para acceder a este recurso.');
            error.statusCode = 403;
            return next(error);
        }

        next();
    };
};

const checkPermission = (allowedPermissions) => {
    return async (req, res, next) => {
        const userDAO = new UserDAO();
        const permissions = await userDAO.getPermissionsByUser(req.user.id);

        if (!permissions.length) {
            const error = new Error(`No tienes permiso.`);
            error.statusCode = 403;
            return next(error);
        }

        // Eliminar espacios en blanco para asegurar coincidencia consistente de permisos
        const permissionNames = permissions.map(p => p.name.trim());
        const hasPermission = allowedPermissions.some(perm => permissionNames.includes(perm));

        if (!hasPermission) {
            const error = new Error(`No tienes permiso.`);
            error.statusCode = 403;
            return next(error);
        }

        next();
    };
};

export { checkAuth, checkRole, checkPermission };