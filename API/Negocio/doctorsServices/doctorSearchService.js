import { Op } from "sequelize";
import DoctorProfileDAO from "../../Datos/DAOs/DoctorProfileDAO.js";
import DoctorAvailabilityDAO from "../../Datos/DAOs/DoctorAvailabilityDAO.js";
import User from "../../Datos/Models/User.js";
import Specialty from "../../Datos/Models/Specialty.js";
import Clinic from "../../Datos/Models/Clinic.js";

const searchDoctors = async (filtersDTO) => {
  const {
    specialtyName,   // string opcional
    city,            // string opcional
    country,         // string opcional
    location,        // string libre opcional
    minPrice,        // number opcional
    maxPrice,        // number opcional
    minRating,       // number opcional
    hasAvailability, // boolean opcional
    clinicId,        // number opcional (nuevo)
    clinicName       // string opcional (nuevo)
  } = filtersDTO;

  const doctorProfileDAO = new DoctorProfileDAO();
  const availabilityDAO = new DoctorAvailabilityDAO();

  // Debug: ver qué filtros llegan
  console.log('Filtros recibidos:', filtersDTO);

  // Filtro base sobre el perfil del doctor
  const where = {
    is_active: true,
  };

  if (location) where.location = { [Op.like]: `%${location}%` };
  if (minRating) where.average_rating = { [Op.gte]: minRating };

  // Filtro por ID de clínica
  if (clinicId) {
    where.clinic_id = clinicId;
    console.log('Filtrando por clinic_id:', clinicId);
  }

  // include base: relación 1:1 con User
  const include = [
    {
      model: User,
      as: "DP_user",
      attributes: ["id", "name", "last_name", "email"],
    },
    {
      model: Clinic,
      as: "clinic",
      attributes: ["id", "name", "city", "address"],
    }
  ];

  // Filtro por ciudad: buscar en doctor O en clínica
  if (city) {
    include[1].where = {
      city: city
    };
    include[1].required = true; // INNER JOIN: solo doctores con clínica en esa ciudad
    console.log('Filtrando por ciudad de clínica:', city);
  }

  // Filtro por nombre de clínica (case-insensitive)
  if (clinicName) {
    include[1].where = {
      name: { [Op.like]: `%${clinicName}%` }
    };
    include[1].required = true; // INNER JOIN: solo doctores con clínica que coincida
  }

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
  console.log('WHERE clause:', JSON.stringify(where, null, 2));
  console.log('INCLUDE clause:', JSON.stringify(include.map(i => ({ model: i.model.name, as: i.as, where: i.where, required: i.required })), null, 2));

  let doctors = await doctorProfileDAO.findAll({
    where,
    include,
  });

  console.log(`Doctores encontrados: ${doctors.length}`);

  // Nuevo filtro: solo doctores con disponibilidad configurada
  if (hasAvailability === true || hasAvailability === 'true') {
    const doctorsWithAvailability = [];

    for (const doctor of doctors) {
      const hasAvail = await availabilityDAO.hasAvailability(doctor.id);
      if (hasAvail) {
        doctorsWithAvailability.push(doctor);
      }
    }

    doctors = doctorsWithAvailability;
  }

  console.log('RETORNANDO doctores:', doctors.length, doctors.map(d => ({ id: d.id, clinic_id: d.clinic_id })));
  return doctors;
};

export {
  searchDoctors,
};
