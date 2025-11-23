// DoctorAvailabilityDAO.js
import BaseDAO from "./BaseDAO.js";
import DoctorAvailability from "../Models/DoctorAvailability.js";

class DoctorAvailabilityDAO extends BaseDAO {
    constructor() {
        super(DoctorAvailability);
    }

    // Crear disponibilidad
    async createAvailability(availabilityData) {
        return await this.create(availabilityData);
    }

    // Obtener disponibilidad de un doctor
    async findByDoctorId(doctorProfileId) {
        return await this.model.findAll({
            where: {
                doctor_profile_id: doctorProfileId,
                is_available: true
            },
            order: [['day_of_week', 'ASC'], ['start_time', 'ASC']],
        });
    }

    // Obtener disponibilidad por día específico
    async findByDoctorAndDay(doctorProfileId, dayOfWeek) {
        return await this.model.findAll({
            where: {
                doctor_profile_id: doctorProfileId,
                day_of_week: dayOfWeek,
                is_available: true,
            },
            order: [['start_time', 'ASC']],
        });
    }

    // Actualizar disponibilidad
    async updateAvailability(id, data) {
        return await this.model.update(data, {
            where: { id },
        });
    }

    // Eliminar disponibilidad
    async deleteAvailability(id) {
        return await this.model.destroy({
            where: { id },
        });
    }

    // Verificar si un doctor tiene disponibilidad configurada
    async hasAvailability(doctorProfileId) {
        const count = await this.model.count({
            where: {
                doctor_profile_id: doctorProfileId,
                is_available: true,
            },
        });
        return count > 0;
    }
}

export default DoctorAvailabilityDAO;
