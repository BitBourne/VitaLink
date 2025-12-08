import { updateProfileService } from '../../../Negocio/authServices/updateProfileService.js';
import { changePasswordService } from '../../../Negocio/authServices/changePasswordService.js';

const profile = async (req, res, next) => {
    try {
        const { user } = req;

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

/**
 * Controlador para actualizar el perfil del usuario autenticado
 */
export const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { name, last_name, phone } = req.body;

        const updatedUser = await updateProfileService(userId, {
            name,
            last_name,
            phone
        });

        res.status(200).json({
            success: true,
            message: 'Perfil actualizado correctamente',
            user: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Controlador para cambiar la contraseña del usuario autenticado
 */
export const changePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            const error = new Error('Se requiere la contraseña actual y la nueva contraseña');
            error.statusCode = 400;
            throw error;
        }

        if (newPassword.length < 6) {
            const error = new Error('La nueva contraseña debe tener al menos 6 caracteres');
            error.statusCode = 400;
            throw error;
        }

        const result = await changePasswordService(userId, currentPassword, newPassword);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export default profile;