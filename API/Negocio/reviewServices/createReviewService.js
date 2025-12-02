import ReviewDAO from "../../Datos/DAOs/ReviewDAO.js";
import DoctorProfileDAO from "../../Datos/DAOs/DoctorProfileDAO.js";

const createReviewService = async (reviewDTO) => {
    const { doctor_profile_id, patient_id, rating, comment } = reviewDTO;

    const reviewDAO = new ReviewDAO();
    const doctorProfileDAO = new DoctorProfileDAO();

    if (!doctor_profile_id || !patient_id || !rating) {
        const error = new Error('Faltan campos obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (rating < 1 || rating > 5) {
        const error = new Error('La calificación debe estar entre 1 y 5');
        error.statusCode = 400;
        throw error;
    }

    try {
        const doctorProfile = await doctorProfileDAO.findById(doctor_profile_id);
        if (!doctorProfile) {
            const error = new Error('El perfil del doctor no existe');
            error.statusCode = 404;
            throw error;
        }

        const hasReviewed = await reviewDAO.hasReviewed(patient_id, doctor_profile_id);
        if (hasReviewed) {
            const error = new Error('Ya has dejado una calificación para este doctor');
            error.statusCode = 400;
            throw error;
        }

        const review = await reviewDAO.createReview({
            doctor_profile_id,
            patient_id,
            rating,
            comment: comment || null,
            is_verified: false,
        });

        const { average, total } = await reviewDAO.calculateAverageRating(doctor_profile_id);

        await doctorProfileDAO.update(doctor_profile_id, {
            average_rating: average,
            total_reviews: total,
        });

        return {
            message: 'Calificación creada exitosamente',
            review,
        };
    } catch (error) {
        if (error.statusCode) throw error;

        console.error('Error in createReviewService:', error);
        const serviceError = new Error('Error al crear la calificación');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default createReviewService;
