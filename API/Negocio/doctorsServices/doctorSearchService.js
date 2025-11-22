import { Op } from "sequelize";
import DoctorProfileDAO from "../../Datos/DAOs/DoctorProfileDAO.js";
import User from "../../Datos/Models/User.js";
import Specialty from "../../Datos/Models/Specialty.js";

const searchDoctors = async (filtersDTO) => {
  const {
    specialtyName,   // string opcional
    city,            // string opcional
    country,         // string opcional
    location,        // string libre opcional
    minPrice,        // number opcional
    maxPrice,        // number opcional
  } = filtersDTO;

  const doctorProfileDAO = new DoctorProfileDAO();

  // Filtro base sobre el perfil del doctor
  const where = {
    is_active: true,
  };

  if (city) {
    where.city = city;
  }

  if (country) {
    where.country = country;
  }

  if (location) {
    // Ejemplo simple con LIKE; se podría refinar a nivel SQL
    where.location = { [Op.like]: `%${location}%` };
  }

  if (minPrice) {
    where.price_min = { [Op.gte]: minPrice };
  }

  if (maxPrice) {
    where.price_max = { [Op.lte]: maxPrice };
  }

  // include base: relación 1:1 con User
  const include = [
    {
      model: User,
      as: "DP_user",
      attributes: ["id", "name", "last_name", "email"],
    },
  ];

  // include de Specialties con posible filtro por nombre de especialidad
  if (specialtyName) {
    include.push({
      model: Specialty,
      as: "DP_specialties",
      through: { attributes: [] },   // no necesitamos datos de la tabla pivote
      where: {
        name: specialtyName,
      },
      required: true, // INNER JOIN: si no tiene esta especialidad, no se devuelve
    });
  } else {
    include.push({
      model: Specialty,
      as: "DP_specialties",
      through: { attributes: [] },
      required: false, // LEFT JOIN: devuelve aunque no tenga especialidades
    });
  }

  // Llamada al DAO, delegando en Sequelize.findAll(options)
  const doctors = await doctorProfileDAO.findAll({
    where,
    include,
  });

  return doctors;
};

export {
  searchDoctors,
};
