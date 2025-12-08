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
import Appointment from "./Appointment.js";
import MedicalRecord from "./MedicalRecord.js";
import DoctorClinic from "./DoctorClinic.js";
import Conversation from "./Chats/Conversations.js";
import Message from "./Chats/Messages.js";


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

// Add hasMany associations to access junction tables directly
User.hasMany(UserRoles, {
  foreignKey: 'user_id',
  as: 'user_roles'
});

User.hasMany(UserPermission, {
  foreignKey: 'user_id',
  as: 'user_permissions'
});

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

User.hasOne(DoctorProfile, {
  foreignKey: 'user_id',
  as: 'U_doctorProfile',
});

DoctorProfile.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'DP_user',
});

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

User.hasMany(AuditLog, {
  foreignKey: 'user_id',
  as: 'U_auditLogs',
});

AuditLog.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'AL_user',
});

User.hasMany(UserSession, {
  foreignKey: 'user_id',
  as: 'U_sessions',
});

UserSession.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'US_user',
});

DoctorProfile.hasMany(Review, {
  foreignKey: 'doctor_profile_id',
  as: 'DP_reviews',
});

Review.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'R_doctorProfile',
});

User.hasMany(Review, {
  foreignKey: 'patient_id',
  as: 'U_reviews',
});

Review.belongsTo(User, {
  foreignKey: 'patient_id',
  as: 'R_patient',
});

DoctorProfile.hasMany(DoctorAvailability, {
  foreignKey: 'doctor_profile_id',
  as: 'DP_availabilities',
});

DoctorAvailability.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'DA_doctorProfile',
});

Clinic.belongsToMany(DoctorProfile, {
  through: DoctorClinic,
  foreignKey: 'clinic_id',
  otherKey: 'doctor_profile_id',
  as: 'doctors',
});

DoctorProfile.belongsToMany(Clinic, {
  through: DoctorClinic,
  foreignKey: 'doctor_profile_id',
  otherKey: 'clinic_id',
  as: 'clinics',
});

DoctorClinic.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'DC_doctor',
});

DoctorClinic.belongsTo(Clinic, {
  foreignKey: 'clinic_id',
  as: 'DC_clinic',
});

User.hasMany(Appointment, {
  foreignKey: 'patient_id',
  as: 'U_appointments',
});

Appointment.belongsTo(User, {
  foreignKey: 'patient_id',
  as: 'A_patient',
});

DoctorProfile.hasMany(Appointment, {
  foreignKey: 'doctor_profile_id',
  as: 'DP_appointments',
});

Appointment.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'A_doctor',
});

Clinic.hasMany(Appointment, {
  foreignKey: 'clinic_id',
  as: 'C_appointments',
});

Appointment.belongsTo(Clinic, {
  foreignKey: 'clinic_id',
  as: 'A_clinic',
});

User.hasMany(MedicalRecord, {
  foreignKey: 'patient_id',
  as: 'U_medicalRecords',
});

MedicalRecord.belongsTo(User, {
  foreignKey: 'patient_id',
  as: 'MR_patient',
});

DoctorProfile.hasMany(MedicalRecord, {
  foreignKey: 'doctor_profile_id',
  as: 'DP_medicalRecords',
});

MedicalRecord.belongsTo(DoctorProfile, {
  foreignKey: 'doctor_profile_id',
  as: 'MR_doctor',
});

Appointment.hasOne(MedicalRecord, {
  foreignKey: 'appointment_id',
  as: 'A_medicalRecord',
});

MedicalRecord.belongsTo(Appointment, {
  foreignKey: 'appointment_id',
  as: 'MR_appointment',
});



Conversation.hasMany(Message, { foreignKey: "conversation_id" });
Message.belongsTo(Conversation, { foreignKey: "conversation_id" });






export {
  User,
  Role,
  UserRoles,
  Permission,
  UserPermission,
  AuditLog,
  UserSession,
  Specialty,
  DoctorProfile,
  DoctorSpecialty,
  Clinic,
  DoctorClinic,
  Review,
  DoctorAvailability,
  Appointment,
  MedicalRecord,
  Conversation,
  Message
};
