import { getAllDoctorsService } from '../../../Negocio/DoctorServices/getDoctoresService.js';

const getDoctors = async (req, res, next) => {
    try {
        const doctores = await getAllDoctorsService();
        res.status(200).json(doctores);
    } catch (error) {
        next(error);
    }
};

export default getDoctors;
