import BaseDAO from "./BaseDAO.js";
import Specialty from "../Models/Specialty.js";

class SpecialtyDAO extends BaseDAO {
  constructor() {
    super(Specialty);
  }

  // Custom methods
  async findOne(data) {
    return await this.model.findOne({ where: data });
  }
}

export default SpecialtyDAO;
