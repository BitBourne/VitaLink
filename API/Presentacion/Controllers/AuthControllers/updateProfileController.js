import updateProfileService from '../../../Negocio/authServices/updateProfileService.js';

const updateProfileController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        const updatedUser = await updateProfileService(userId, updateData);

        res.status(200).json({
            success: true,
            msg: 'Perfil actualizado exitosamente',
            data: updatedUser
        });
    } catch (error) {
        next(error);
    }
};

export default updateProfileController;
