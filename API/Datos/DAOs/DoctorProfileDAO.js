import BaseDAO from "./BaseDAO.js";
import DoctorProfile from "../Models/DoctorProfile.js";

class DoctorProfileDAO extends BaseDAO {
  constructor() {
    super(DoctorProfile);
  }
}

export default DoctorProfileDAO;
