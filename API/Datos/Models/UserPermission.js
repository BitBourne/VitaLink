// RolePermission.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

import Permission from "./Permission.js";
import User from "./User.js";

const UserPermission = db.define('user_permissions', {
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
  permission_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Permission,
      key: "id",
    },
  },
});

export default UserPermission;
