import BaseDAO from "./BaseDAO.js";
import DoctorAvailability from "../Models/DoctorAvailability.js";

class DoctorAvailabilityDAO extends BaseDAO {
    constructor() {
        super(DoctorAvailability);
    }

    async createAvailability(availabilityData) {
        return await this.create(availabilityData);
    }

    async findByDoctorId(doctorProfileId) {
        return await this.model.findAll({
            where: {
                doctor_profile_id: doctorProfileId,
                is_available: true
            },
            order: [['day_of_week', 'ASC'], ['start_time', 'ASC']],
        });
    }

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

    async updateAvailability(id, data) {
        return await this.model.update(data, {
            where: { id },
        });
    }

    async deleteAvailability(id) {
        return await this.model.destroy({
            where: { id },
        });
    }

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
