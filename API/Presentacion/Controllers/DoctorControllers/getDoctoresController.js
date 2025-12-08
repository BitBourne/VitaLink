import { getAllDoctorsService } from '../../../Negocio/DoctorServices/getDoctoresService.js';

const getDoctors = async (req, res, next) => {
    try {
        const verifiedOnly = req.query.verifiedOnly === 'true';
        const doctores = await getAllDoctorsService(verifiedOnly);
        res.status(200).json(doctores);
    } catch (error) {
        next(error);
    }
};

export default getDoctors;
