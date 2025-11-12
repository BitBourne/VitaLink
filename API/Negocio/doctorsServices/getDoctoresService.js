import UserDAO from '../../Datos/DAOs/UserDAO.js';



export const getAllDoctorsService = async () => {
  const userDAO = new UserDAO();

  // Obtener todos los usuarios con rol de doctor
  const doctors = await userDAO.findAll({
    where: { role: 'doctor' }
  });

  return doctors;
};
