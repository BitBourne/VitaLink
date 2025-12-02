import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';
import DoctorProfile from '../../Datos/Models/DoctorProfile.js';
import User from '../../Datos/Models/User.js';

const getClinicByIdService = async (clinicId) => {
    try {
        const clinicDAO = new ClinicDAO();

        const clinic = await clinicDAO.findById(clinicId, {
            include: [
                {
                    model: DoctorProfile,
                    as: 'doctors',
                    include: [
                        {
                            model: User,
                            as: 'DP_user',
                            attributes: ['id', 'name', 'last_name', 'email']
                        }
                    ]
                }
            ]
        });

        if (!clinic) {
            const error = new Error('Clínica no encontrada');
            error.statusCode = 404;
            throw error;
        }

        return clinic;
    } catch (error) {
        throw error;
    }
};

export default getClinicByIdService;
