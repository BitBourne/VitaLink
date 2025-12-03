import apiClient from '../apiClient';

/**
 * Servicio para gestionar especialidades
 */

/**
 * Obtiene todas las especialidades
 * @returns {Promise} Lista de especialidades
 */
export const getAllSpecialties = async () => {
    const response = await apiClient.get('/specialties');
    return response.data.data || [];
};

/**
 * Crea una nueva especialidad
 * @param {Object} data - Datos de la especialidad
 * @param {string} data.name - Nombre de la especialidad
 * @param {string} data.description - Descripción
 * @returns {Promise} Especialidad creada
 */
export const createSpecialty = async (data) => {
    const response = await apiClient.post('/specialties', data);
    return response.data.data;
};

/**
 * Actualiza una especialidad existente
 * @param {number} id - ID de la especialidad
 * @param {Object} data - Datos a actualizar
 * @returns {Promise} Especialidad actualizada
 */
export const updateSpecialty = async (id, data) => {
    const response = await apiClient.put(`/specialties/${id}`, data);
    return response.data.data;
};

/**
 * Elimina una especialidad
 * @param {number} id - ID de la especialidad
 * @returns {Promise} Confirmación
 */
export const deleteSpecialty = async (id) => {
    const response = await apiClient.delete(`/specialties/${id}`);
    return response.data;
};

/**
 * Asigna un doctor a una especialidad
 * @param {number} doctorId - ID del doctor
 * @param {number} specialtyId - ID de la especialidad
 * @returns {Promise} Confirmación
 */
export const assignDoctorToSpecialty = async (doctorId, specialtyId) => {
    const response = await apiClient.post(`/doctor/${doctorId}/specialties`, { specialtyId });
    return response.data;
};

/**
 * Remueve un doctor de una especialidad
 * @param {number} doctorId - ID del doctor
 * @param {number} specialtyId - ID de la especialidad
 * @returns {Promise} Confirmación
 */
export const removeDoctorFromSpecialty = async (doctorId, specialtyId) => {
    const response = await apiClient.delete(`/doctor/${doctorId}/specialties/${specialtyId}`);
    return response.data;
};
