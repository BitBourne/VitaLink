import apiClient from '../apiClient';

/**
 * Servicio para gestionar clínicas
 */

/**
 * Obtiene todas las clínicas
 * @returns {Promise} Lista de clínicas
 */
export const getAllClinics = async () => {
    const response = await apiClient.get('/clinics');
    return response.data.clinics || [];
};

/**
 * Obtiene una clínica por ID
 * @param {number} id - ID de la clínica
 * @returns {Promise} Datos de la clínica
 */
export const getClinicById = async (id) => {
    const response = await apiClient.get(`/clinics/${id}`);
    return response.data;
};

/**
 * Crea una nueva clínica
 * @param {Object} clinicData - Datos de la clínica
 * @param {string} clinicData.name - Nombre de la clínica
 * @param {string} clinicData.address - Dirección
 * @param {string} clinicData.city - Ciudad
 * @param {string} clinicData.state - Estado
 * @param {string} clinicData.phone - Teléfono (opcional)
 * @returns {Promise} Clínica creada
 */
export const createClinic = async (clinicData) => {
    const response = await apiClient.post('/clinics', clinicData);
    return response.data;
};

/**
 * Actualiza una clínica existente
 * @param {number} id - ID de la clínica
 * @param {Object} clinicData - Datos a actualizar
 * @returns {Promise} Clínica actualizada
 */
export const updateClinic = async (id, clinicData) => {
    const response = await apiClient.put(`/clinics/${id}`, clinicData);
    return response.data;
};

/**
 * Elimina (desactiva) una clínica
 * @param {number} id - ID de la clínica
 * @returns {Promise} Confirmación
 */
export const deleteClinic = async (id) => {
    const response = await apiClient.delete(`/clinics/${id}`);
    return response.data;
};

/**
 * Obtiene las clínicas donde trabaja un doctor
 * @param {number} doctorId - ID del doctor
 * @returns {Promise} Lista de clínicas del doctor
 */
export const getDoctorClinics = async (doctorId) => {
    const response = await apiClient.get(`/doctor/${doctorId}/clinics`);
    return response.data;
};

/**
 * Asigna un doctor a una clínica
 * @param {number} doctorId - ID del doctor
 * @param {number} clinicId - ID de la clínica
 * @returns {Promise} Confirmación de asignación
 */
export const assignDoctorToClinic = async (doctorId, clinicId) => {
    const response = await apiClient.post(`/doctor/${doctorId}/clinics`, { clinicId });
    return response.data;
};

/**
 * Remueve un doctor de una clínica
 * @param {number} doctorId - ID del doctor
 * @param {number} clinicId - ID de la clínica
 * @returns {Promise} Confirmación
 */
export const removeDoctorFromClinic = async (doctorId, clinicId) => {
    const response = await apiClient.delete(`/doctor/${doctorId}/clinics/${clinicId}`);
    return response.data;
};
