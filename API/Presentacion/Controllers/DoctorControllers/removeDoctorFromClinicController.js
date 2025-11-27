import removeDoctorFromClinicService from '../../../Negocio/doctorServices/removeDoctorFromClinicService.js';

const removeDoctorFromClinic = async (req, res, next) => {
    try {
        const { doctorId, clinicId } = req.params;

        const result = await removeDoctorFromClinicService(parseInt(doctorId), parseInt(clinicId));

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export default removeDoctorFromClinic;
