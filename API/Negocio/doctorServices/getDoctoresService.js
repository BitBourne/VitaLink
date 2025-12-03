import DoctorProfile from '../../Datos/Models/DoctorProfile.js';
import User from '../../Datos/Models/User.js';
import Specialty from '../../Datos/Models/Specialty.js';
import Clinic from '../../Datos/Models/Clinic.js';

const getAllDoctorsService = async () => {
    try {
        const doctors = await DoctorProfile.findAll({
            attributes: [
                'id',
                'user_id',
                'location',
                'city',
                'state',
                'experience_years',
                'salary',
                'clinic_id',
                'is_active',
                'average_rating',
                'total_reviews',
                'medical_license_number',
                'cedula_profesional',
                'license_verified',
                'cedula_verified',
                'verification_notes',
                'medical_license_document_url',
                'cedula_document_url',
                'additional_documents_urls',
                'verification_status',
                'verified_at',
                'verified_by_admin_id'
            ],
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
