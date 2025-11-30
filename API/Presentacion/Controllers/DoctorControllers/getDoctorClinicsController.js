import getDoctorClinicsService from '../../../Negocio/doctorServices/getDoctorClinicsService.js';

const getDoctorClinics = async (req, res, next) => {
    try {
        const { doctorId } = req.params;

        const clinics = await getDoctorClinicsService(parseInt(doctorId));

        res.json({
            success: true,
            clinics
        });
    } catch (error) {
        next(error);
    }
};

export default getDoctorClinics;
