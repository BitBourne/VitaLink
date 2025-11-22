import { searchDoctors } from '../../../Negocio/doctorsServices/doctorSearchService.js';

const searchDoctorsController = async (req, res, next) => {
  try {
    const { specialty, city, country, location, minPrice, maxPrice } = req.query;

    const filtersDTO = {
      specialtyName: specialty,
      city,
      country,
      location,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };

    const doctors = await searchDoctors(filtersDTO);

    res.status(200).json(doctors);
  } catch (error) {
    next(error);
  }
};

export default searchDoctorsController;
