// Relations.js
import User from "./User.js";
import Role from "./Role.js";
import Permission from "./Permission.js";
import UserRoles from "./UserRoles.js";
import RolePermission from "./RolePermission.js";


// Relación USER ↔ ROLE (muchos a muchos)
User.belongsToMany(Role, {
  through: UserRoles,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'U_roles',
});

Role.belongsToMany(User, {
  through: UserRoles,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'R_users',
});

// Relación ROLE ↔ PERMISSION (muchos a muchos)
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: 'role_id',
  otherKey: 'permission_id',
  as: 'R_permissions',
});

Permission.belongsToMany(Role, {
  through: RolePermission,
  foreignKey: 'permission_id',
  otherKey: 'role_id',
  as: 'P_roles',
});

UserRoles.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'UR_role'
});

UserRoles.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'UR_user'
});




export { User, Role, Permission, UserRoles, RolePermission };
