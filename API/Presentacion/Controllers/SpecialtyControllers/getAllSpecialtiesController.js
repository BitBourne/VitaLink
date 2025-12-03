import getAllSpecialtiesService from '../../../Negocio/specialtyServices/getAllSpecialtiesService.js';

const getAllSpecialtiesController = async (req, res) => {
    try {
        const specialties = await getAllSpecialtiesService();
        res.status(200).json({
            success: true,
            data: specialties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export default getAllSpecialtiesController;
