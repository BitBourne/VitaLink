import BaseDAO from "./BaseDAO.js";
import DoctorProfile from "../Models/DoctorProfile.js";

class DoctorProfileDAO extends BaseDAO {
  constructor() {
    super(DoctorProfile);
  }

  // Métodos personalizados para búsqueda avanzada se pueden agregar aquí
}

export default DoctorProfileDAO;
