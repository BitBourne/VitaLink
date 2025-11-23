// getReviewsByDoctorController.js
import getReviewsByDoctorService from "../../../Negocio/reviewServices/getReviewsByDoctorService.js";

const getReviewsByDoctorController = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const { limit } = req.query;

        const reviews = await getReviewsByDoctorService(
            parseInt(doctorId),
            limit ? parseInt(limit) : 20
        );

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });
    } catch (error) {
        next(error);
    }
};

export default getReviewsByDoctorController;
