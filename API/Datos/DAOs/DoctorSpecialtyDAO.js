import BaseDAO from "./BaseDAO.js";
import DoctorSpecialty from "../Models/DoctorSpecialty.js";
import Specialty from "../Models/Specialty.js";
import DoctorProfile from "../Models/DoctorProfile.js";

class DoctorSpecialtyDAO extends BaseDAO {
    constructor() {
        super(DoctorSpecialty);
    }

    async assignDoctorToSpecialty(doctorProfileId, specialtyId) {
        const existing = await this.model.findOne({
            where: { doctor_profile_id: doctorProfileId, specialty_id: specialtyId }
        });

        if (existing) {
            const error = new Error('El doctor ya tiene asignada esta especialidad');
            error.statusCode = 400;
            throw error;
        }

        return await this.create({
            doctor_profile_id: doctorProfileId,
            specialty_id: specialtyId
        });
    }

    async removeDoctorFromSpecialty(doctorProfileId, specialtyId) {
        const result = await this.model.destroy({
            where: { doctor_profile_id: doctorProfileId, specialty_id: specialtyId }
        });

        if (result === 0) {
            const error = new Error('Relación no encontrada');
            error.statusCode = 404;
            throw error;
        }

        return result;
    }
}

export default DoctorSpecialtyDAO;
