import { Op } from 'sequelize';
import DoctorProfile from '../../Datos/Models/DoctorProfile.js';
import User from '../../Datos/Models/User.js';
import Specialty from '../../Datos/Models/Specialty.js';
import Clinic from '../../Datos/Models/Clinic.js';

const searchDoctors = async (filters) => {
    try {
        const {
            specialtyName,
            city,
            location,
            minRating,
            clinicId,
            clinicName
        } = filters;

        const whereClause = { is_active: true };
        const includeClause = [
            {
                model: User,
                as: 'DP_user',
                attributes: ['id', 'name', 'last_name', 'email']
            }
        ];

        if (city) {
            whereClause.city = { [Op.like]: `%${city}%` };
        }
        if (location) {
            whereClause[Op.or] = [
                { city: { [Op.like]: `%${location}%` } },
                { state: { [Op.like]: `%${location}%` } },
                { location: { [Op.like]: `%${location}%` } }
            ];
        }

        if (minRating) {
            whereClause.average_rating = { [Op.gte]: minRating };
        }

        if (specialtyName) {
            includeClause.push({
                model: Specialty,
                as: 'DP_specialties',
                where: { name: { [Op.like]: `%${specialtyName}%` } },
                through: { attributes: [] }
            });
        } else {
            includeClause.push({
                model: Specialty,
                as: 'DP_specialties',
                through: { attributes: [] }
            });
        }

        if (clinicId || clinicName) {
            const clinicWhere = {};
            if (clinicId) clinicWhere.id = clinicId;
            if (clinicName) clinicWhere.name = { [Op.like]: `%${clinicName}%` };

            includeClause.push({
                model: Clinic,
                as: 'clinics',
                where: clinicWhere,
                through: { attributes: [] }
            });
        } else {
            includeClause.push({
                model: Clinic,
                as: 'clinics',
                through: { attributes: [] }
            });
        }

        const doctors = await DoctorProfile.findAll({
            where: whereClause,
            include: includeClause
        });

        return doctors;
    } catch (error) {
        throw error;
    }
};

export { searchDoctors };
