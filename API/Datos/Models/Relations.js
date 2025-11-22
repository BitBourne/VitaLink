// Relations.js
import User from "./User.js";
import Role from "./Role.js";
import Permission from "./Permission.js";
import UserRoles from "./UserRoles.js";
import UserPermission from "./UserPermission.js";
import DoctorProfile from "./DoctorProfile.js";
import Specialty from "./Specialty.js";
import DoctorSpecialty from "./DoctorSpecialty.js";


// USER ↔ ROLE (M:N)
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

// USER ↔ PERMISSION (M:N)
User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: 'user_id',
  otherKey: 'permission_id',
  as: 'U_permissions',
});

Permission.belongsToMany(User, {
  through: UserPermission,
  foreignKey: 'permission_id',
  otherKey: 'user_id',
  as: 'P_users',
});

// RELACIONES DE TABLA PIVOTE
UserRoles.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'UR_role'
});
UserRoles.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'UR_user'
});


UserPermission.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'UP_user'
});

UserPermission.belongsTo(Permission, {
  foreignKey: 'permission_id',
  as: 'UP_permission'
});


// USER ↔ DOCTOR_PROFILE (1:1)
User.hasOne(DoctorProfile, {
  foreignKey: 'user_id',
  as: 'U_doctorProfile',
});

DoctorProfile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'DP_user',
});

// DOCTOR_PROFILE ↔ SPECIALTY (M:N)
DoctorProfile.belongsToMany(Specialty, {
  through: DoctorSpecialty,
  foreignKey: 'doctor_profile_id',
  otherKey: 'specialty_id',
  as: 'DP_specialties',
});

Specialty.belongsToMany(DoctorProfile, {
  through: DoctorSpecialty,
  foreignKey: 'specialty_id',
  otherKey: 'doctor_profile_id',
  as: 'S_doctors',
});





export { User, Role, Permission, UserRoles, UserPermission, DoctorProfile, Specialty, DoctorSpecialty };
