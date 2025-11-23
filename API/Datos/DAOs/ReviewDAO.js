// ReviewDAO.js
import BaseDAO from "./BaseDAO.js";
import Review from "../Models/Review.js";
import User from "../Models/User.js";
import DoctorProfile from "../Models/DoctorProfile.js";

class ReviewDAO extends BaseDAO {
    constructor() {
        super(Review);
    }

    // Crear review
    async createReview(reviewData) {
        return await this.create(reviewData);
    }

    // Obtener reviews de un doctor
    async findByDoctorId(doctorProfileId, limit = 20) {
        return await this.model.findAll({
            where: { doctor_profile_id: doctorProfileId },
            include: [
                {
                    model: User,
                    as: 'R_patient',
                    attributes: ['id', 'name', 'last_name'],
                },
            ],
            order: [['createdAt', 'DESC']],
            limit,
        });
    }

    // Obtener reviews de un paciente
    async findByPatientId(patientId) {
        return await this.model.findAll({
            where: { patient_id: patientId },
            include: [
                {
                    model: DoctorProfile,
                    as: 'R_doctorProfile',
                    include: [
                        {
                            model: User,
                            as: 'DP_user',
                            attributes: ['id', 'name', 'last_name'],
                        },
                    ],
                },
            ],
            order: [['createdAt', 'DESC']],
        });
    }

    // Calcular promedio de calificaciones de un doctor
    async calculateAverageRating(doctorProfileId) {
        const reviews = await this.model.findAll({
            where: { doctor_profile_id: doctorProfileId },
            attributes: ['rating'],
        });

        if (reviews.length === 0) {
            return { average: 0, total: 0 };
        }

        const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
        const average = (sum / reviews.length).toFixed(2);

        return {
            average: parseFloat(average),
            total: reviews.length,
        };
    }

    // Verificar si un paciente ya dejó review para un doctor
    async hasReviewed(patientId, doctorProfileId) {
        const review = await this.model.findOne({
            where: {
                patient_id: patientId,
                doctor_profile_id: doctorProfileId,
            },
        });
        return !!review;
    }
}

export default ReviewDAO;
