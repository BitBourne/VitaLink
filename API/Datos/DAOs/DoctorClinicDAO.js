import BaseDAO from "./BaseDAO.js";
import DoctorClinic from "../Models/DoctorClinic.js";
import Clinic from "../Models/Clinic.js";
import DoctorProfile from "../Models/DoctorProfile.js";

class DoctorClinicDAO extends BaseDAO {
    constructor() {
        super(DoctorClinic);
    }

    async assignDoctorToClinic(doctorProfileId, clinicId) {
        const existing = await this.model.findOne({
            where: { doctor_profile_id: doctorProfileId, clinic_id: clinicId }
        });

        if (existing) {
            const error = new Error('El doctor ya está asignado a esta clínica');
            error.statusCode = 400;
            throw error;
        }

        return await this.create({
            doctor_profile_id: doctorProfileId,
            clinic_id: clinicId
        });
    }

    async removeDoctorFromClinic(doctorProfileId, clinicId) {
        const result = await this.model.destroy({
            where: { doctor_profile_id: doctorProfileId, clinic_id: clinicId }
        });

        if (result === 0) {
            const error = new Error('Relación no encontrada');
            error.statusCode = 404;
            throw error;
        }

        return result;
    }

    async getClinicsByDoctor(doctorProfileId) {
        return await this.model.findAll({
            where: { doctor_profile_id: doctorProfileId },
            include: [{
                model: Clinic,
                as: 'DC_clinic'
            }]
        });
    }

    async getDoctorsByClinic(clinicId) {
        return await this.model.findAll({
            where: { clinic_id: clinicId },
            include: [{
                model: DoctorProfile,
                as: 'DC_doctor'
            }]
        });
    }

    async doctorWorksAtClinic(doctorProfileId, clinicId) {
        const relation = await this.model.findOne({
            where: { doctor_profile_id: doctorProfileId, clinic_id: clinicId }
        });
        return !!relation;
    }
}

export default DoctorClinicDAO;
