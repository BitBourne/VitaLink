import createReviewService from "../../../Negocio/reviewServices/createReviewService.js";

const createReviewController = async (req, res, next) => {
    try {
        const { doctor_profile_id, rating, comment } = req.body;
        const patient_id = req.user.id;

        const result = await createReviewService({
            doctor_profile_id,
            patient_id,
            rating,
            comment,
        });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export default createReviewController;
