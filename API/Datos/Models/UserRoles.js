import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

import Role from "./Role.js"
import User from "./User.js";

const UserRoles = db.define('user_roles', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Role,
      key: "id",
    },
  },
});

export default UserRoles;
