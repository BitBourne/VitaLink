import React, { useState, useEffect } from 'react';
import appointmentService from '../core/api/services/appointmentService';

/**
 * EJEMPLO 1: Obtener todas las citas del doctor
 */
const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const response = await appointmentService.getAppointments();
            setAppointments(response.appointments);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div>
            <h2>Mis Citas</h2>
            {appointments.map(apt => (
                <div key={apt.id}>
                    <p>Paciente: {apt.A_patient.name} {apt.A_patient.last_name}</p>
                    <p>Fecha: {apt.appointment_date} - {apt.appointment_time}</p>
                    <p>Estado: {apt.status}</p>
                </div>
            ))}
        </div>
    );
};

/**
 * EJEMPLO 2: Filtrar citas por estado
 */
const PendingAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        loadPendingAppointments();
    }, []);

    const loadPendingAppointments = async () => {
        try {
            // Solo citas pendientes
            const response = await appointmentService.getAppointments({
                status: 'pending'
            });
            setAppointments(response.appointments);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Citas Pendientes</h2>
            {/* ... renderizar citas ... */}
        </div>
    );
};

/**
 * EJEMPLO 3: Filtrar por fecha y estado
 */
const TodayConfirmedAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        loadTodayAppointments();
    }, []);

    const loadTodayAppointments = async () => {
        try {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

            const response = await appointmentService.getAppointments({
                date: today,
                status: 'confirmed'
            });

            setAppointments(response.appointments);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Citas Confirmadas de Hoy</h2>
            {/* ... renderizar citas ... */}
        </div>
    );
};

/**
 * EJEMPLO 4: Confirmar una cita
 */
const AppointmentCard = ({ appointment, onUpdate }) => {
    const handleConfirm = async () => {
        try {
            await appointmentService.confirmAppointment(appointment.id);
            alert('Cita confirmada');
            onUpdate(); // Recargar lista
        } catch (error) {
            alert('Error al confirmar cita');
        }
    };

    const handleCancel = async () => {
        try {
            await appointmentService.cancelAppointment(appointment.id);
            alert('Cita cancelada');
            onUpdate();
        } catch (error) {
            alert('Error al cancelar cita');
        }
    };

    const handleComplete = async () => {
        try {
            await appointmentService.completeAppointment(appointment.id);
            alert('Cita completada');
            onUpdate();
        } catch (error) {
            alert('Error al completar cita');
        }
    };

    return (
        <div className="appointment-card">
            <p>Paciente: {appointment.A_patient.name}</p>
            <p>Fecha: {appointment.appointment_date}</p>
            <p>Estado: {appointment.status}</p>

            {appointment.status === 'pending' && (
                <>
                    <button onClick={handleConfirm}>Confirmar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </>
            )}

            {appointment.status === 'confirmed' && (
                <>
                    <button onClick={handleComplete}>Completar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </>
            )}
        </div>
    );
};

/**
 * EJEMPLO 5: Crear una nueva cita (para pacientes)
 */
const CreateAppointmentForm = () => {
    const [formData, setFormData] = useState({
        doctor_profile_id: '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        clinic_id: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await appointmentService.createAppointment(formData);
            alert('Cita creada exitosamente');
            console.log('Cita creada:', response);
        } catch (error) {
            alert('Error al crear cita');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                placeholder="ID del Doctor"
                value={formData.doctor_profile_id}
                onChange={(e) => setFormData({ ...formData, doctor_profile_id: e.target.value })}
            />
            <input
                type="date"
                value={formData.appointment_date}
                onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
            />
            <input
                type="time"
                value={formData.appointment_time}
                onChange={(e) => setFormData({ ...formData, appointment_time: e.target.value })}
            />
            <textarea
                placeholder="Motivo de la cita"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
            <button type="submit">Crear Cita</button>
        </form>
    );
};

export {
    DoctorAppointments,
    PendingAppointments,
    TodayConfirmedAppointments,
    AppointmentCard,
    CreateAppointmentForm
};
