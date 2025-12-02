import assignDoctorToClinicService from '../../../Negocio/DoctorServices/assignDoctorToClinicService.js';

const assignDoctorToClinic = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const { clinic_id } = req.body;

        const result = await assignDoctorToClinicService(parseInt(doctorId), clinic_id);

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export default assignDoctorToClinic;
