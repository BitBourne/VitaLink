import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import User from '../../Datos/Models/User.js';
import Specialty from '../../Datos/Models/Specialty.js';

export const getAllDoctorsService = async () => {
  const doctorProfileDAO = new DoctorProfileDAO();

  // Obtener todos los usuarios con perfil de doctor activo
  const doctors = await doctorProfileDAO.findAll({
    where: { is_active: true }, // Corregido el filtro para usar el campo correcto
    include: [
      {
        model: User,
        as: 'DP_user',
        attributes: ['id', 'name', 'last_name', 'email'],
      },
      {
        model: Specialty,
        as: 'DP_specialties',
        through: { attributes: [] },
      },
    ],
  });

  return doctors;
};
