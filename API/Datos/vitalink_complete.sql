-- ============================================
-- SCRIPT COMPLETO DE BASE DE DATOS VITALINK
-- Incluye: Semanas 1-4 (con nuevas tablas)
-- ============================================

CREATE DATABASE IF NOT EXISTS vitalink;
USE vitalink;

-- ============================================
-- TABLAS BASE (Semanas 1-2)
-- ============================================

-- TABLA PRINCIPAL DE USUARIOS
-- Corresponde al modelo User.js
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    token VARCHAR(255) DEFAULT NULL, -- Token para verificación de cuenta
    resetToken VARCHAR(255) DEFAULT NULL,
    resetTokenExpiration DATETIME DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- TABLA DE ROLES (RBAC)
-- Corresponde al modelo Role.js
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Insertar roles por defecto
INSERT INTO roles (id, name, description, createdAt, updatedAt) VALUES
(1, 'admin', 'Administrador del sistema. Acceso total.', NOW(), NOW()),
(2, 'paciente', 'Usuario registrado que reserva citas médicas.', NOW(), NOW()),
(3, 'doctor', 'Profesional de la salud que gestiona su agenda.', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

-- TABLA DE PERMISOS (RBAC)
-- Corresponde al modelo Permission.js
CREATE TABLE IF NOT EXISTS permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Insertar permisos por defecto
INSERT INTO permissions (id, name, description, createdAt, updatedAt) VALUES
-- PERMISOS BASE/ADMINISTRACIÓN
(1, 'todo', 'Acceso total al sistema', NOW(), NOW()),
(2, 'view_audit_logs', 'Ver logs de auditoría del sistema', NOW(), NOW()),
(3, 'manage_doctors_profiles', 'Gestión completa de perfiles de doctores', NOW(), NOW()),
(4, 'manage_all_appointments', 'Gestión de todas las citas del sistema', NOW(), NOW()),
(5, 'manage_specialties_catalog', 'Gestión del catálogo de especialidades', NOW(), NOW()),

-- PERMISOS TRANSVERSALES
(6, 'search_doctors', 'Buscar doctores por especialidad y ubicación', NOW(), NOW()),
(7, 'access_telemedicine', 'Acceso a videollamadas médicas', NOW(), NOW()),
(8, 'view_patient_history', 'Ver historial médico de pacientes', NOW(), NOW()),

-- PERMISOS DE PACIENTE
(9, 'manage_own_appointments', 'Gestionar sus propias citas médicas', NOW(), NOW()),
(10, 'interact_with_post_consult', 'Calificar y pagar consultas', NOW(), NOW()),

-- PERMISOS DE DOCTOR
(11, 'manage_own_schedule', 'Gestionar disponibilidad y horarios propios', NOW(), NOW()),
(12, 'asignar_permisos', 'Asignar permisos a usuarios', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

-- TABLA PIVOTE USUARIO-ROLES (M:N)
-- Corresponde al modelo UserRoles.js
CREATE TABLE IF NOT EXISTS user_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    role_id INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY idx_user_role (user_id, role_id)
);

-- TABLA PIVOTE USUARIO-PERMISOS (M:N)
-- Corresponde al modelo UserPermission.js
CREATE TABLE IF NOT EXISTS user_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    permission_id INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
    UNIQUE KEY idx_user_permission (user_id, permission_id)
);

-- TABLA DE ESPECIALIDADES
-- Corresponde al modelo Specialty.js
CREATE TABLE IF NOT EXISTS specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL
);

-- Insertar especialidades por defecto
INSERT INTO specialties (name, description, createdAt, updatedAt) VALUES
('Cardiología', 'Diagnóstico y tratamiento de enfermedades del corazón y vasos sanguíneos.', NOW(), NOW()),
('Dermatología', 'Tratamiento de afecciones de la piel, cabello y uñas.', NOW(), NOW()),
('Gastroenterología', 'Especialidad en el sistema digestivo y sus trastornos.', NOW(), NOW()),
('Pediatría', 'Atención médica integral para bebés, niños y adolescentes.', NOW(), NOW()),
('Neurología', 'Diagnóstico y tratamiento de trastornos del sistema nervioso.', NOW(), NOW()),
('Ortopedia', 'Tratamiento de lesiones y enfermedades del sistema musculoesquelético.', NOW(), NOW()),
('Oftalmología', 'Especialidad en la salud y enfermedades de los ojos.', NOW(), NOW()),
('Ginecología', 'Atención a la salud del sistema reproductor femenino.', NOW(), NOW()),
('Urología', 'Tratamiento del sistema urinario masculino y femenino, y genitales masculinos.', NOW(), NOW()),
('Psiquiatría', 'Diagnóstico, tratamiento y prevención de trastornos mentales, emocionales y del comportamiento.', NOW(), NOW()),
('Endocrinología', 'Tratamiento de trastornos del sistema hormonal, incluyendo diabetes y tiroides.', NOW(), NOW()),
('Medicina General', 'Atención primaria y gestión de enfermedades comunes.', NOW(), NOW()),
('Odontología', 'Diagnóstico, prevención y tratamiento de enfermedades dentales.', NOW(), NOW()),
('Nutrición', 'Asesoramiento dietético y manejo de la alimentación.', NOW(), NOW()),
('Fisioterapia', 'Rehabilitación y tratamiento físico de lesiones y dolencias.', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=name;

-- TABLA DE PERFILES DE DOCTORES
-- Corresponde al modelo DoctorProfile.js (ACTUALIZADO CON CAMPOS NUEVOS)
CREATE TABLE IF NOT EXISTS doctor_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE, -- Relación 1:1 con users
    bio TEXT DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    city VARCHAR(255) DEFAULT NULL,
    state VARCHAR(255) DEFAULT NULL,
    country VARCHAR(255) DEFAULT NULL,
    price_min DECIMAL(10, 2) DEFAULT NULL,
    price_max DECIMAL(10, 2) DEFAULT NULL,
    experience_years INT DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    -- NUEVOS CAMPOS (Semana 4)
    average_rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- TABLA PIVOTE DOCTOR-ESPECIALIDAD (M:N)
-- Corresponde al modelo DoctorSpecialty.js
CREATE TABLE IF NOT EXISTS doctor_specialties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_profile_id INT NOT NULL,
    specialty_id INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (doctor_profile_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties(id) ON DELETE CASCADE,
    UNIQUE KEY idx_doctor_specialty (doctor_profile_id, specialty_id)
);

-- ============================================
-- NUEVAS TABLAS (Semanas 3-4)
-- ============================================

-- TABLA DE LOGS DE AUDITORÍA (Semana 3)
-- Corresponde al modelo AuditLog.js
CREATE TABLE IF NOT EXISTS audit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL, -- Puede ser NULL para acciones sin autenticación
    action VARCHAR(255) NOT NULL, -- Ej: 'login', 'create_review', 'set_availability'
    resource_type VARCHAR(255) DEFAULT NULL, -- Ej: 'User', 'Review', 'DoctorAvailability'
    resource_id INT DEFAULT NULL,
    ip_address VARCHAR(255) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    details TEXT DEFAULT NULL, -- JSON con información adicional
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_resource_type (resource_type),
    INDEX idx_created_at (createdAt)
);

-- TABLA DE SESIONES DE USUARIO (Semana 3)
-- Corresponde al modelo UserSession.js
CREATE TABLE IF NOT EXISTS user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token TEXT NOT NULL, -- JWT token
    device_info VARCHAR(255) DEFAULT NULL,
    ip_address VARCHAR(255) DEFAULT NULL,
    last_activity DATETIME NOT NULL,
    expires_at DATETIME NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_active (is_active),
    INDEX idx_expires_at (expires_at)
);

-- TABLA DE CALIFICACIONES/REVIEWS (Semana 4)
-- Corresponde al modelo Review.js
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_profile_id INT NOT NULL,
    patient_id INT NOT NULL, -- ID del usuario (paciente)
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT DEFAULT NULL,
    is_verified BOOLEAN DEFAULT FALSE, -- True si el paciente tuvo cita confirmada
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (doctor_profile_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_doctor_profile_id (doctor_profile_id),
    INDEX idx_patient_id (patient_id),
    INDEX idx_rating (rating)
);

-- TABLA DE DISPONIBILIDAD DE DOCTORES (Semana 4)
-- Corresponde al modelo DoctorAvailability.js
CREATE TABLE IF NOT EXISTS doctor_availabilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_profile_id INT NOT NULL,
    day_of_week INT NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Domingo, 6=Sábado
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    FOREIGN KEY (doctor_profile_id) REFERENCES doctor_profiles(id) ON DELETE CASCADE,
    INDEX idx_doctor_profile_id (doctor_profile_id),
    INDEX idx_day_of_week (day_of_week),
    INDEX idx_is_available (is_available)
);

-- ============================================
-- CONSULTAS DE VERIFICACIÓN
-- ============================================

-- Ver todas las tablas
SHOW TABLES;

-- Ver estructura de tablas nuevas
DESCRIBE audit_logs;
DESCRIBE user_sessions;
DESCRIBE reviews;
DESCRIBE doctor_availabilities;
DESCRIBE doctor_profiles; -- Verificar campos nuevos

-- Ver datos de catálogos
SELECT * FROM roles;
SELECT * FROM permissions;
SELECT * FROM specialties;

-- Ver datos de usuarios (si existen)
SELECT u.id, u.name, u.last_name, u.email, u.verified,
       GROUP_CONCAT(r.name) as roles
FROM users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
LEFT JOIN roles r ON ur.role_id = r.id
GROUP BY u.id;

-- Ver perfiles de doctores con calificaciones
SELECT dp.id, u.name, u.last_name, dp.city, 
       dp.average_rating, dp.total_reviews, dp.is_active
FROM doctor_profiles dp
JOIN users u ON dp.user_id = u.id;

-- Ver disponibilidad de doctores
SELECT da.id, u.name, u.last_name, 
       da.day_of_week, da.start_time, da.end_time
FROM doctor_availabilities da
JOIN doctor_profiles dp ON da.doctor_profile_id = dp.id
JOIN users u ON dp.user_id = u.id
ORDER BY u.name, da.day_of_week, da.start_time;

-- Ver reviews
SELECT r.id, 
       p.name as patient_name,
       d.name as doctor_name,
       r.rating, r.comment, r.createdAt
FROM reviews r
JOIN users p ON r.patient_id = p.id
JOIN doctor_profiles dp ON r.doctor_profile_id = dp.id
JOIN users d ON dp.user_id = d.id
ORDER BY r.createdAt DESC;

-- Ver logs de auditoría recientes
SELECT al.id, u.name, al.action, al.resource_type, 
       al.resource_id, al.ip_address, al.createdAt
FROM audit_logs al
LEFT JOIN users u ON al.user_id = u.id
ORDER BY al.createdAt DESC
LIMIT 20;

-- ============================================
-- COMANDOS ÚTILES DE LIMPIEZA (USAR CON CUIDADO)
-- ============================================

-- Desactivar safe updates para poder hacer DELETE sin WHERE
-- SET SQL_SAFE_UPDATES = 0;

-- Limpiar datos de prueba (CUIDADO: Esto borra TODO)
-- DELETE FROM user_sessions;
-- DELETE FROM audit_logs;
-- DELETE FROM reviews;
-- DELETE FROM doctor_availabilities;
-- DELETE FROM doctor_specialties;
-- DELETE FROM doctor_profiles;
-- DELETE FROM user_permissions;
-- DELETE FROM user_roles;
-- DELETE FROM users;

-- Reactivar safe updates
-- SET SQL_SAFE_UPDATES = 1;
