import BaseDAO from './BaseDAO.js';
import Appointment from '../Models/Appointment.js';
import User from '../Models/User.js';
import DoctorProfile from '../Models/DoctorProfile.js';
import Specialty from '../Models/Specialty.js';
import { Op } from 'sequelize';

class AppointmentDAO extends BaseDAO {
    constructor() {
        super(Appointment);
    }

    async create(data) {
        return await super.create(data);
    }

    async findById(id) {
        return await Appointment.findByPk(id, {
            include: [
                {
                    model: User,
                    as: 'A_patient',
                    attributes: ['id', 'name', 'last_name', 'email']
                },
                {
                    model: DoctorProfile,
                    as: 'A_doctor',
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
    }

    async findAll(filters = {}) {
        const where = {};

        if (filters.patient_id) where.patient_id = filters.patient_id;
        if (filters.doctor_profile_id) where.doctor_profile_id = filters.doctor_profile_id;
        if (filters.status) where.status = filters.status;
        if (filters.date) where.appointment_date = filters.date;

        return await Appointment.findAll({
            where,
            include: [
                {
                    model: User,
                    as: 'A_patient',
                    attributes: ['id', 'name', 'last_name', 'email']
                },
                {
                    model: DoctorProfile,
                    as: 'A_doctor',
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
                        }
                    ]
                }
            ],
            order: [['appointment_date', 'ASC'], ['appointment_time', 'ASC']]
        });
    }

    async checkSlotAvailability(doctorProfileId, date, time) {
        const appointment = await Appointment.findOne({
            where: {
                doctor_profile_id: doctorProfileId,
                appointment_date: date,
                appointment_time: time,
                status: {
                    [Op.notIn]: ['cancelled']
                }
            }
        });
        return !appointment;
    }
}

export default AppointmentDAO;
