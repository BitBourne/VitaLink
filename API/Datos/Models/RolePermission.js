// RolePermission.js
import { Sequelize } from "sequelize";
import db from "../../Infraestructura/config/db.js";

import Permission from "./Permission.js";
import Role from "./Role.js"

const RolePermission = db.define('roles_permissions', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Role,
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

export default RolePermission;
