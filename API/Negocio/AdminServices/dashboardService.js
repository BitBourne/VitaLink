import User from "../../Datos/Models/User.js";
import UserRoles from "../../Datos/Models/UserRoles.js";
import Role from "../../Datos/Models/Role.js";
import DoctorProfile from "../../Datos/Models/DoctorProfile.js";
import Appointment from "../../Datos/Models/Appointment.js";
import "../../Datos/Models/Relations.js"; // Importar relaciones
import { Op } from "sequelize";

/**
 * Obtiene estadísticas consolidadas del sistema para el dashboard de administrador
 * @returns {Promise<Object>} Objeto con todas las estadísticas del sistema
 */
export const getDashboardStatsService = async () => {
    try {
        // Obtener fecha de hoy (inicio y fin del día)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        // 1. Contar total de doctores
        const totalDoctors = await DoctorProfile.count();

        // 2. Contar total de pacientes (usuarios con rol 'patient')
        const patientRole = await Role.findOne({ where: { name: 'patient' } });
        const totalPatients = patientRole
            ? await UserRoles.count({ where: { role_id: patientRole.id } })
            : 0;

        // 3. Contar verificaciones pendientes
        const pendingVerifications = await DoctorProfile.count({
            where: {
                verification_status: {
                    [Op.in]: ['pending', 'under_review']
                }
            }
        });

        // 4. Contar total de citas
        const totalAppointments = await Appointment.count();

        // 5. Contar citas completadas hoy
        const completedToday = await Appointment.count({
            where: {
                status: 'completed',
                appointment_date: {
                    [Op.gte]: today,
                    [Op.lt]: tomorrow
                }
            }
        });

        // 6. Contar citas pendientes hoy
        const pendingToday = await Appointment.count({
            where: {
                status: {
                    [Op.in]: ['scheduled', 'pending', 'confirmed']
                },
                appointment_date: {
                    [Op.gte]: today,
                    [Op.lt]: tomorrow
                }
            }
        });

        return {
            totalDoctors,
            totalPatients,
            pendingVerifications,
            totalAppointments,
            completedToday,
            pendingToday
        };
    } catch (error) {
        console.error('Error en getDashboardStatsService:', error);
        throw new Error('Error al obtener estadísticas del dashboard');
    }
};

/**
 * Obtiene actividad reciente del sistema
 * @param {number} limit - Número máximo de actividades a retornar
 * @returns {Promise<Array>} Array de actividades recientes
 */
export const getRecentActivityService = async (limit = 10) => {
    try {
        const activities = [];

        // Obtener doctores verificados recientemente (últimos 5)
        const recentVerifications = await DoctorProfile.findAll({
            where: {
                verification_status: 'verified',
                verified_at: { [Op.not]: null }
            },
            include: [{
                model: User,
                as: 'DP_user',
                attributes: ['name', 'last_name']
            }],
            order: [['verified_at', 'DESC']],
            limit: 5
        });

        recentVerifications.forEach(doctor => {
            activities.push({
                type: 'verification',
                action: 'approved',
                message: 'Doctor verificado',
                actorName: `Dr. ${doctor.DP_user?.name} ${doctor.DP_user?.last_name}`,
                timestamp: doctor.verified_at
            });
        });

        // Obtener nuevos registros de doctores (últimos 5)
        const recentRegistrations = await DoctorProfile.findAll({
            include: [{
                model: User,
                as: 'DP_user',
                attributes: ['name', 'last_name']
            }],
            order: [['id', 'DESC']],
            limit: 5
        });

        recentRegistrations.forEach(doctor => {
            activities.push({
                type: 'registration',
                action: 'created',
                message: 'Nuevo doctor registrado',
                actorName: `Dr. ${doctor.DP_user?.name} ${doctor.DP_user?.last_name}`,
                timestamp: new Date()
            });
        });

        // Obtener citas recientes (últimas 5)
        const recentAppointments = await Appointment.findAll({
            include: [
                {
                    model: User,
                    as: 'A_patient',
                    attributes: ['name', 'last_name']
                },
                {
                    model: DoctorProfile,
                    as: 'A_doctor',
                    include: [{
                        model: User,
                        as: 'DP_user',
                        attributes: ['name', 'last_name']
                    }]
                }
            ],
            order: [['id', 'DESC']],
            limit: 5
        });

        recentAppointments.forEach(appointment => {
            const patientName = appointment.A_patient
                ? `${appointment.A_patient.name} ${appointment.A_patient.last_name}`
                : 'Paciente';

            activities.push({
                type: 'appointment',
                action: appointment.status === 'completed' ? 'completed' : 'created',
                message: appointment.status === 'completed'
                    ? 'Cita completada'
                    : 'Nueva cita programada',
                actorName: patientName,
                timestamp: new Date()
            });
        });

        // Ordenar todas las actividades por fecha descendente
        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Retornar solo el límite solicitado
        return activities.slice(0, limit);
    } catch (error) {
        console.error('Error en getRecentActivityService:', error);
        throw new Error('Error al obtener actividad reciente');
    }
};