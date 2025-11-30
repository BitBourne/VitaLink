import BaseDAO from './BaseDAO.js';
import Clinic from '../Models/Clinic.js';

class ClinicDAO extends BaseDAO {
    constructor() {
        super(Clinic);
    }

    async findByName(name) {
        try {
            return await this.model.findOne({ where: { name } });
        } catch (error) {
            throw error;
        }
    }

    async findByCity(city) {
        try {
            return await this.model.findAll({ where: { city } });
        } catch (error) {
            throw error;
        }
    }
}

export default ClinicDAO;
