import apiClient from '../apiClient';

// Get all clinics
export const getAllClinics = async () => {
    try {
        const response = await apiClient.get('/clinics');
        return response.data;
    } catch (error) {
        console.error('Error fetching clinics:', error);
        throw error;
    }
};

// Create a new clinic
export const createClinic = async (clinicData) => {
    try {
        const response = await apiClient.post('/clinics', clinicData);
        return response.data;
    } catch (error) {
        console.error('Error creating clinic:', error);
        throw error;
    }
};

// Update a clinic
export const updateClinic = async (clinicId, clinicData) => {
    try {
        const response = await apiClient.put(`/clinics/${clinicId}`, clinicData);
        return response.data;
    } catch (error) {
        console.error('Error updating clinic:', error);
        throw error;
    }
};

// Delete a clinic
export const deleteClinic = async (clinicId) => {
    try {
        const response = await apiClient.delete(`/clinics/${clinicId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting clinic:', error);
        throw error;
    }
};

// Assign doctor to clinic
export const assignDoctorToClinic = async (doctorId, clinicId) => {
    try {
        const response = await apiClient.post(`/doctor/${doctorId}/clinics`, { clinic_id: clinicId });
        return response.data;
    } catch (error) {
        console.error('Error assigning doctor to clinic:', error);
        throw error;
    }
};

// Remove doctor from clinic
export const removeDoctorFromClinic = async (doctorId, clinicId) => {
    try {
        const response = await apiClient.delete(`/doctor/${doctorId}/clinics/${clinicId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing doctor from clinic:', error);
        throw error;
    }
};

// Get doctor's clinics
export const getDoctorClinics = async (doctorId) => {
    try {
        const response = await apiClient.get(`/doctor/${doctorId}/clinics`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor clinics:', error);
        throw error;
    }
};
