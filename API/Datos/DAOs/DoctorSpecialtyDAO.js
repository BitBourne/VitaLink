import BaseDAO from './BaseDAO.js';
import DoctorSpecialty from '../Models/DoctorSpecialty.js';

class DoctorSpecialtyDAO extends BaseDAO {
    constructor() {
        super(DoctorSpecialty);
    }

    /**
     * Asigna un doctor a una especialidad
     * @param {number} doctorProfileId - ID del perfil del doctor
     * @param {number} specialtyId - ID de la especialidad
     * @returns {Promise<Object>} - Registro creado
     */
    async assignDoctorToSpecialty(doctorProfileId, specialtyId) {
        // Verificar si ya existe la asignación
        const existing = await DoctorSpecialty.findOne({
            where: {
                doctor_profile_id: doctorProfileId,
                specialty_id: specialtyId
            }
        });

        if (existing) {
            const error = new Error('El doctor ya tiene asignada esta especialidad');
            error.statusCode = 409;
            throw error;
        }

        return await DoctorSpecialty.create({
            doctor_profile_id: doctorProfileId,
            specialty_id: specialtyId
        });
    }

    /**
     * Remueve una especialidad de un doctor
     * @param {number} doctorProfileId - ID del perfil del doctor
     * @param {number} specialtyId - ID de la especialidad
     * @returns {Promise<number>} - Número de registros eliminados
     */
    async removeDoctorFromSpecialty(doctorProfileId, specialtyId) {
        return await DoctorSpecialty.destroy({
            where: {
                doctor_profile_id: doctorProfileId,
                specialty_id: specialtyId
            }
        });
    }

    /**
     * Obtiene todas las especialidades de un doctor
     * @param {number} doctorProfileId - ID del perfil del doctor
     * @returns {Promise<Array>} - Lista de especialidades
     */
    async getSpecialtiesByDoctor(doctorProfileId) {
        return await DoctorSpecialty.findAll({
            where: { doctor_profile_id: doctorProfileId }
        });
    }

    /**
     * Obtiene todos los doctores de una especialidad
     * @param {number} specialtyId - ID de la especialidad
     * @returns {Promise<Array>} - Lista de doctores
     */
    async getDoctorsBySpecialty(specialtyId) {
        return await DoctorSpecialty.findAll({
            where: { specialty_id: specialtyId }
        });
    }
}

export default DoctorSpecialtyDAO;
