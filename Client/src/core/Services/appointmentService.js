import { useAxiosPrivate } from '../api/useAxiosPrivate';

export const createAppointmentService = () => {
  const axiosPrivate = useAxiosPrivate();
  
  return {
    // OBTENER CITAS
    getAppointments: (params = {}) => 
      axiosPrivate.get("/appointments", { params }),
    
    getAppointmentById: (id) => 
      axiosPrivate.get(`/appointments/${id}`),
    
    // CREAR CITA
    createAppointment: (appointmentData) => 
      axiosPrivate.post("/appointments", appointmentData),
    
    // ACCIONES DE CITA
    confirmAppointment: (id, data = {}) => 
      axiosPrivate.put(`/appointments/${id}/confirm`, data),
    
    cancelAppointment: (id, data = {}) => 
      axiosPrivate.put(`/appointments/${id}/cancel`, data),
    
    completeAppointment: (id, data = {}) => 
      axiosPrivate.put(`/appointments/${id}/complete`, data),
    
    // DISPONIBILIDAD
    getAvailability: (doctorId, params = {}) => 
      axiosPrivate.get(`/availability/${doctorId}`, { params })
  };
};

export const useAppointmentService = () => createAppointmentService();