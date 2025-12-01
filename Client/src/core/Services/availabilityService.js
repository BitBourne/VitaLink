import { useAxiosPrivate } from '../api/useAxiosPrivate';

export const createAvailabilityService = () => {
  const axiosPrivate = useAxiosPrivate();
  
  return {
    //  DISPONIBILIDAD
    setAvailability: (availabilityData) => 
      axiosPrivate.post("/availability", availabilityData),
    
    getAvailability: (doctorId, params = {}) => 
      axiosPrivate.get(`/availability/${doctorId}`, { params }),
    
    deleteAvailability: (id) => 
      axiosPrivate.delete(`/availability/${id}`)
  };
};

export const useAvailabilityService = () => createAvailabilityService();