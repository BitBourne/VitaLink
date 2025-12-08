import React, { useState, useEffect, useCallback } from 'react';

// Librerías de Calendario
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

// Componentes y API
import AppointmentModal from '../Modals/AppointmentModal';
import CalendarAppointmentModal from "../Modals/CalendarAppointmentModal"
import apiClient from '../../../core/api/apiClient';

const Calendar = () => {
    const [appointments, setAppointments] = useState([]);
    const [doctorProfile, setDoctorProfile] = useState(null); // Guardamos la info del doctor logueado
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. Obtener la información del Doctor Logueado (para sacar sus clínicas)
    const getDoctorProfile = async () => {
        try {
            const { data } = await apiClient.get('/auth/profile');
            // Asumimos que el endpoint profile devuelve la info del usuario y sus relaciones
            // Si tu backend devuelve las clínicas en una propiedad 'clinics' o dentro de 'doctor_profile'
            setDoctorProfile(data); 
        } catch (error) {
            console.error("Error al cargar perfil del doctor:", error);
        }
    };

    // 2. Obtener las citas (El backend filtra por el token del usuario)
    const getAppointments = useCallback(async () => {
        try {
            const { data } = await apiClient.get('/appointments');
            setAppointments(data.appointments || []);
        } catch (error) {
            console.error("Error al obtener citas:", error);
        }
    }, []);

    // Carga inicial
    useEffect(() => {
        getDoctorProfile();
        getAppointments();
    }, [getAppointments]);

    // 3. Formatear eventos para FullCalendar
    const eventosFormateados = appointments.map(cita => {
        let colorEvento = '#3b82f6'; // Azul (Confirmed)
        if (cita.status === 'pending') colorEvento = '#f59e0b'; // Naranja
        if (cita.status === 'cancelled') colorEvento = '#ef4444'; // Rojo
        if (cita.status === 'completed') colorEvento = '#10b981'; // Verde

        console.log(cita)

        return {
            id: cita.id, 
            // Mostramos Hora y Paciente o Motivo
            title: `${cita.appointment_time.slice(0,5)} - ${cita.A_patient?.name || cita.reason}`,
            start: `${cita.appointment_date}T${cita.appointment_time}`,
            backgroundColor: colorEvento,
            borderColor: colorEvento,
            textColor: '#ffffff',
            extendedProps: { ...cita } 
        };
    });

    // Handler: Click en Evento (Editar)
    const handleEventClick = (info) => {
        setSelectedEvent(info.event.extendedProps);
        setIsModalOpen(true);
    };

    // Handler: Click en Fecha Vacía (Crear)
    const handleDateClick = (arg) => {
        setSelectedEvent({
            appointment_date: arg.dateStr,
            appointment_time: "",
            reason: "",
            clinic_id: "",
            patient_id: "" // Importante para creación vacía
        });
        setIsModalOpen(true);
    };

    // Cerrar Modal y Recargar
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
        getAppointments(); // Refrescar calendario
    };

    return (
        <div className='p-5 font-sans bg-white rounded-xl shadow-sm border border-gray-200'>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                locale="es"
                height={"auto"}
                dayMaxEvents={true}
                events={eventosFormateados}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                eventClassNames="cursor-pointer hover:opacity-80 transition-opacity text-xs"
            />

            {/* Renderizamos el modal solo si está abierto */}
            {isModalOpen && (
                <CalendarAppointmentModal
                    show={isModalOpen}
                    onClose={closeModal}
                    appointment={selectedEvent}
                    doctor={doctorProfile} // Pasamos el perfil del doctor cargado
                />
            )}
        </div>
    );
};

export default Calendar;