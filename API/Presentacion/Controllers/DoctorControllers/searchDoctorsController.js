import { searchDoctors } from '../../../Negocio/doctorServices/doctorSearchService.js';

const searchDoctorsController = async (req, res, next) => {
    try {
        const {
            specialty,
            city,
            country,
            location,
            minRating,
            hasAvailability,
            clinicId,
            clinicName
        } = req.query;

        const filtersDTO = {
            specialtyName: specialty,
            city,
            country,
            location,
            minRating: minRating ? Number(minRating) : undefined,
            hasAvailability: hasAvailability,
            clinicId: clinicId ? Number(clinicId) : undefined,
            clinicName: clinicName
        };

        const doctors = await searchDoctors(filtersDTO);

        res.status(200).json(doctors);
    } catch (error) {
        next(error);
    }
};

export default searchDoctorsController;
