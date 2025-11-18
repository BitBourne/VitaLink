import { getDoctoresService } from '../../../Negocio/services/doctoresService.js';

const getDoctors = async (req, res, next) => {
    try {
        const doctores = await getDoctoresService();
        res.status(200).json(doctores);
    } catch (error) {
        next(error);
    }
};

export default getDoctors;