// getReviewsByDoctorService.js
import ReviewDAO from "../../Datos/DAOs/ReviewDAO.js";

const getReviewsByDoctorService = async (doctorProfileId, limit = 20) => {
    const reviewDAO = new ReviewDAO();

    try {
        if (!doctorProfileId) {
            const error = new Error('ID del doctor es requerido');
            error.statusCode = 400;
            throw error;
        }

        const reviews = await reviewDAO.findByDoctorId(doctorProfileId, limit);

        return reviews;
    } catch (error) {
        if (error.statusCode) throw error;

        console.error('Error in getReviewsByDoctorService:', error);
        const serviceError = new Error('Error al obtener las calificaciones');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default getReviewsByDoctorService;
