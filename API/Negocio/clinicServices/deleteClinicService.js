import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';

const deleteClinicService = async (clinicId) => {
    try {
        const clinicDAO = new ClinicDAO();
        const doctorProfileDAO = new DoctorProfileDAO();

        // Verificar que la clínica existe
        const clinic = await clinicDAO.findById(clinicId);
        if (!clinic) {
            const error = new Error('Clínica no encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Verificar si hay doctores asignados a esta clínica
        const doctors = await doctorProfileDAO.findAll({
            where: { clinic_id: clinicId }
        });

        if (doctors.length > 0) {
            const error = new Error('No se puede eliminar la clínica porque tiene doctores asignados. Primero reasigna o elimina los doctores.');
            error.statusCode = 400;
            throw error;
        }

        // Eliminar la clínica
        await clinicDAO.delete(clinicId);

        return { message: 'Clínica eliminada exitosamente' };
    } catch (error) {
        throw error;
    }
};

export default deleteClinicService;
