import { getAllDoctorsService } from '../../../Negocio/doctorsservices/getDoctoresService.js';

const getDoctores = async (req, res, next) => {
    try {
        const doctores = await getAllDoctorsService();
        res.status(200).json(doctores);
    } catch (error) {
        next(error);
    }
};

export default getDoctores;