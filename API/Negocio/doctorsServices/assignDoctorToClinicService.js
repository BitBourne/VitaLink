import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import ClinicDAO from '../../Datos/DAOs/ClinicDAO.js';

const assignDoctorToClinicService = async (doctorProfileId, clinicId, salary) => {
    try {
        const doctorProfileDAO = new DoctorProfileDAO();
        const clinicDAO = new ClinicDAO();

        // Verificar que el doctor existe
        const doctor = await doctorProfileDAO.findById(doctorProfileId);
        if (!doctor) {
            const error = new Error('Doctor no encontrado');
            error.statusCode = 404;
            throw error;
        }

        // Verificar que la clínica existe
        const clinic = await clinicDAO.findById(clinicId);
        if (!clinic) {
            const error = new Error('Clínica no encontrada');
            error.statusCode = 404;
            throw error;
        }

        // Actualizar doctor con clínica y sueldo
        const updateData = { clinic_id: clinicId };
        if (salary !== undefined) {
            updateData.salary = salary;
        }

        await doctorProfileDAO.update(doctorProfileId, updateData);

        // Obtener doctor actualizado
        const updatedDoctor = await doctorProfileDAO.findById(doctorProfileId);

        return updatedDoctor;
    } catch (error) {
        throw error;
    }
};

export default assignDoctorToClinicService;
