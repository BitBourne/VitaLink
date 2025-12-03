import React from 'react'
import { useState, useEffect } from 'react'

// Calendario
import FullCalendar from '@fullcalendar/react' // El componente
import dayGridPlugin from '@fullcalendar/daygrid' // Vista de mes
import timeGridPlugin from '@fullcalendar/timegrid' // Vista de semana/dia
import interactionPlugin from '@fullcalendar/interaction' // Para clicks

import AppointmentModal from './AppointmentModal'
import apiClient from '../../../core/api/apiClient'

const Calendar = () => {

    const [appointments, setAppointments] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

      // Verifica que el usuario este autenticado
  useEffect(() => {
      const getAppointments = async () => {
          try {
                console.log("hasta aqui ses")
                // realiza peticion a backend y se le asigna la configuracion establecida
                const {data} = await apiClient.get('/appointments');
                setAppointments(data.appointments); 
                
          } catch (error) {
                
              console.log(error)
            //   setUser({});
          }
      }
      getAppointments();
  }, [])
  // Ejemplo de citas (esto vendría de tu backend)

   const eventosFormateados = appointments.map(cita => {
        // LOGICA DE COLORES (Opcional pero recomendado)
        // Puedes cambiar el color según el estado de la cita si tu DB lo tiene
        let colorEvento = '#3788d8'; // Azul default
        if (cita.status === 'cancelada') colorEvento = '#ef4444'; // Rojo
        if (cita.status === 'completada') colorEvento = '#22c55e'; // Verde

        return {
            id: cita.id, // Muy útil para identificar al hacer click
            
            // TÍTULO: ¿Qué quieres que diga la cajita? 
            // Ajusta 'cita.patient_name' o 'cita.reason' según tus columnas reales
            title: `${cita.time || ''} - ${cita.reason || 'Consulta'}`, 
            
            // FECHA INICIO: Debe ser un string ISO (ej: "2025-12-05" o "2025-12-05T10:30:00")
            // Ajusta 'cita.date' al nombre real de tu columna en DB
            start: `${cita.appointment_date}T${cita.appointment_time}`, 
            
            // Color de fondo
            backgroundColor: colorEvento,
            
            // Extended Props: Aquí guardas toda la data original por si la necesitas al hacer click
            extendedProps: { ...cita }
        };
    });

    console.log(appointments)
    console.log(eventosFormateados)



  const citas = [
    { title: 'Cita Dra. Ana - Firulais', date: '2025-12-05' },
    { title: 'Vacunación', date: '2025-12-07' }
  ]

  const handleDateClick = (arg) => {
    alert('Diste click en la fecha: ' + arg.dateStr)
    // Aquí podrías abrir un Modal para crear una nueva cita
  }

    const handleEventClick = (info) => {
        // info.event contiene toda la info que FullCalendar tiene de esa cita
        setSelectedEvent(info.event);
        setIsModalOpen(true);
    }

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    }

  return (
    <div className='p-5 font-sans'>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        
        // Botones del encabezado
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        
        // Idioma español
        locale="es" 
        
        // Permitir click en fechas
        dateClick={handleDateClick}
        
        // Tus eventos
        events={eventosFormateados}

        eventClick={handleEventClick}
        
        // Altura automática
        height={"auto"}
      />

        {isModalOpen && (
            <AppointmentModal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                eventData={selectedEvent} 
            />
        )}
    </div>
  )
}

export default Calendar