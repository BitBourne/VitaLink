import getAllSpecialtiesService from '../../../Negocio/SpecialtyServices/getAllSpecialtiesService.js';
import createSpecialtyService from '../../../Negocio/SpecialtyServices/createSpecialtyService.js';
import updateSpecialtyService from '../../../Negocio/SpecialtyServices/updateSpecialtyService.js';
import deleteSpecialtyService from '../../../Negocio/SpecialtyServices/deleteSpecialtyService.js';
import assignDoctorToSpecialtyService from '../../../Negocio/doctorServices/assignDoctorToSpecialtyService.js';

// Placeholder functions for missing services
const getSpecialtyByIdService = async (id) => {
    throw new Error('getSpecialtyByIdService not implemented yet');
};

const removeDoctorFromSpecialtyService = async (doctorId, specialtyId) => {
    throw new Error('removeDoctorFromSpecialtyService not implemented yet');
};

// Get all specialties
export const getAllSpecialties = async (req, res) => {
    try {
        const specialties = await getAllSpecialtiesService();
        res.status(200).json(specialties);
    } catch (error) {
        console.error('Error in getAllSpecialties controller:', error);
        res.status(500).json({ message: error.message || 'Error al obtener especialidades' });
    }
};

// Get specialty by ID
export const getSpecialtyById = async (req, res) => {
    try {
        const { id } = req.params;
        const specialty = await getSpecialtyByIdService(id);
        res.status(200).json(specialty);
    } catch (error) {
        console.error('Error in getSpecialtyById controller:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Error al obtener especialidad' });
    }
};

// Create specialty
export const createSpecialty = async (req, res) => {
    try {
        const specialty = await createSpecialtyService(req.body);
        res.status(201).json(specialty);
    } catch (error) {
        console.error('Error in createSpecialty controller:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Error al crear especialidad' });
    }
};

// Update specialty
export const updateSpecialty = async (req, res) => {
    try {
        const { id } = req.params;
        const specialty = await updateSpecialtyService(id, req.body);
        res.status(200).json(specialty);
    } catch (error) {
        console.error('Error in updateSpecialty controller:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Error al actualizar especialidad' });
    }
};

// Delete specialty
export const deleteSpecialty = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteSpecialtyService(id);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in deleteSpecialty controller:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Error al eliminar especialidad' });
    }
};

// Assign doctor to specialty
export const assignDoctorToSpecialty = async (req, res) => {
    try {
        const { specialtyId, doctorId } = req.params;
        const result = await assignDoctorToSpecialtyService(doctorId, specialtyId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in assignDoctorToSpecialty controller:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Error al asignar doctor' });
    }
};

// Remove doctor from specialty
export const removeDoctorFromSpecialty = async (req, res) => {
    try {
        const { specialtyId, doctorId } = req.params;
        const result = await removeDoctorFromSpecialtyService(doctorId, specialtyId);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in removeDoctorFromSpecialty controller:', error);
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({ message: error.message || 'Error al remover doctor' });
    }
};
