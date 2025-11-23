// Relations.js
import User from "./User.js";
import Role from "./Role.js";
import Permission from "./Permission.js";
import UserRoles from "./UserRoles.js";
import UserPermission from "./UserPermission.js";
import DoctorProfile from "./DoctorProfile.js";
import Specialty from "./Specialty.js";
import DoctorSpecialty from "./DoctorSpecialty.js";
import AuditLog from "./AuditLog.js";
import UserSession from "./UserSession.js";
import Review from "./Review.js";
import DoctorAvailability from "./DoctorAvailability.js";
import Clinic from "./Clinic.js";

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

// USER ↔ AUDIT_LOG (1:N)
User.hasMany(AuditLog, {
  foreignKey: 'user_id',
  as: 'U_auditLogs',
});

AuditLog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'AL_user',
});

// USER ↔ USER_SESSION (1:N)
User.hasMany(UserSession, {
  foreignKey: 'user_id',
  as: 'U_sessions',
});

UserSession.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'US_user',
});

// DOCTOR_PROFILE ↔ REVIEW (1:N)
DoctorProfile.hasMany(Review, {
  foreignKey: 'doctor_profile_id',
  as: 'DP_reviews',
});

Review.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'R_doctorProfile',
});

// USER (patient) ↔ REVIEW (1:N)
User.hasMany(Review, {
  foreignKey: 'patient_id',
  as: 'U_reviews',
});

Review.belongsTo(User, {
  foreignKey: 'patient_id',
  as: 'R_patient',
});

// DOCTOR_PROFILE ↔ DOCTOR_AVAILABILITY (1:N)
DoctorProfile.hasMany(DoctorAvailability, {
  foreignKey: 'doctor_profile_id',
  as: 'DP_availabilities',
});

DoctorAvailability.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'DA_doctorProfile',
});

// CLINIC ↔ DOCTOR_PROFILE (1:N)
Clinic.hasMany(DoctorProfile, {
  foreignKey: 'clinic_id',
  as: 'doctors',
});

DoctorProfile.belongsTo(Clinic, {
  foreignKey: 'clinic_id',
  as: 'clinic',
});

export {
  User,
  Role,
  Permission,
  UserRoles,
  UserPermission,
  DoctorProfile,
  Specialty,
  DoctorSpecialty,
  AuditLog,
  UserSession,
  Review,
  DoctorAvailability,
  Clinic
};
