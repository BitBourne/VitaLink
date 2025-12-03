import changePasswordService from '../../../Negocio/authServices/changePasswordService.js';

const changePasswordController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const result = await changePasswordService(userId, currentPassword, newPassword);

        res.status(200).json({
            success: true,
            msg: result.message
        });
    } catch (error) {
        next(error);
    }
};

export default changePasswordController;
