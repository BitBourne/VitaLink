import apiClient from '../apiClient';

// Get all specialties
export const getAllSpecialties = async () => {
    try {
        const response = await apiClient.get('/specialties');
        return response.data;
    } catch (error) {
        console.error('Error fetching specialties:', error);
        throw error;
    }
};

// Create a new specialty
export const createSpecialty = async (specialtyData) => {
    try {
        const response = await apiClient.post('/specialties', specialtyData);
        return response.data;
    } catch (error) {
        console.error('Error creating specialty:', error);
        throw error;
    }
};

// Update a specialty
export const updateSpecialty = async (specialtyId, specialtyData) => {
    try {
        const response = await apiClient.put(`/specialties/${specialtyId}`, specialtyData);
        return response.data;
    } catch (error) {
        console.error('Error updating specialty:', error);
        throw error;
    }
};

// Delete a specialty
export const deleteSpecialty = async (specialtyId) => {
    try {
        const response = await apiClient.delete(`/specialties/${specialtyId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting specialty:', error);
        throw error;
    }
};

// Assign doctor to specialty
export const assignDoctorToSpecialty = async (doctorId, specialtyId) => {
    try {
        const response = await apiClient.post(`/specialties/${specialtyId}/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error('Error assigning doctor to specialty:', error);
        throw error;
    }
};

// Remove doctor from specialty
export const removeDoctorFromSpecialty = async (doctorId, specialtyId) => {
    try {
        const response = await apiClient.delete(`/specialties/${specialtyId}/doctors/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing doctor from specialty:', error);
        throw error;
    }
};
