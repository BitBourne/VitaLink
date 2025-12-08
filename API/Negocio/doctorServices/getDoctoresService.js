import DoctorProfile from '../../Datos/Models/DoctorProfile.js';
import User from '../../Datos/Models/User.js';
import Specialty from '../../Datos/Models/Specialty.js';
import Clinic from '../../Datos/Models/Clinic.js';

const getAllDoctorsService = async (verifiedOnly = false) => {
    try {
        const whereClause = {};

        // Si se solicita solo doctores verificados, agregar filtro
        if (verifiedOnly) {
            whereClause.verification_status = 'verified';
        }

        const doctors = await DoctorProfile.findAll({
            where: whereClause,
            include: [
                {
                    model: User,
                    as: 'DP_user',
                    attributes: ['id', 'name', 'last_name', 'email']
                },
                {
                    model: Specialty,
                    as: 'DP_specialties',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                },
                {
                    model: Clinic,
                    as: 'clinics',
                    attributes: ['id', 'name', 'address', 'city', 'state'],
                    through: { attributes: [] }
                }
            ]
        });
        return doctors;
    } catch (error) {
        throw error;
    }
};

export { getAllDoctorsService };
