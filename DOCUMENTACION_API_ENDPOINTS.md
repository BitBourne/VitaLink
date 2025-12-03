# Documentación de API - VitaLink

## Información General

**Base URL**: `http://localhost:3000/api`

**Autenticación**: La mayoría de los endpoints requieren autenticación mediante cookie httpOnly que contiene un JWT.

**Cabeceras Comunes**:
```json
{
  "Content-Type": "application/json"
}
```

---

## 1. Autenticación (`/api/auth`)

### 1.1 Registro de Usuario

**Método**: `POST`  
**Ruta**: `/api/auth/signUp`  
**Descripción**: Registra un nuevo usuario en el sistema. Si el usuario es doctor, debe adjuntar documentos obligatorios.

**Autenticación**: No requerida

**Datos de Entrada (Request)**:

- **Content-Type**: `multipart/form-data`

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| name | string | Sí | Nombre del usuario |
| last_name | string | Sí | Apellido del usuario |
| email | string | Sí | Correo electrónico (formato válido) |
| password | string | Sí | Contraseña (mínimo 8 caracteres) |
| roleId | integer | No | ID del rol (1=admin, 2=doctor, 3=patient) |
| medical_license_number | string | Condicional | Número de licencia médica (obligatorio si es doctor) |
| cedula_profesional | string | Condicional | Cédula profesional (obligatorio si es doctor) |
| medical_license_document | file | Condicional | Documento de licencia médica (obligatorio si es doctor) |
| cedula_document | file | Condicional | Documento de cédula (obligatorio si es doctor) |
| additional_documents | file[] | No | Documentos adicionales (máximo 3) |

**Ejemplo de Request**:
```javascript
const formData = new FormData();
formData.append('name', 'Juan');
formData.append('last_name', 'Pérez');
formData.append('email', 'juan.perez@example.com');
formData.append('password', 'Password123!');
formData.append('roleId', '2');
formData.append('medical_license_number', 'LIC12345');
formData.append('cedula_profesional', 'CED67890');
formData.append('medical_license_document', fileObject1);
formData.append('cedula_document', fileObject2);
```

**Respuesta Exitosa (201 Created)**:
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente. Por favor confirma tu cuenta mediante el correo enviado."
}
```

**Códigos de Estado**:
- `201`: Usuario creado exitosamente
- `400`: Datos inválidos o email ya registrado
- `500`: Error interno del servidor

**Errores Comunes**:
```json
{
  "success": false,
  "message": "El email ya está registrado"
}
```

---

### 1.2 Confirmar Cuenta

**Método**: `POST`  
**Ruta**: `/api/auth/signUp/confirm-account`  
**Descripción**: Confirma la cuenta de usuario mediante el token enviado por correo.

**Autenticación**: No requerida

**Datos de Entrada (Request)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Cuenta confirmada exitosamente"
}
```

**Códigos de Estado**:
- `200`: Cuenta confirmada
- `400`: Token inválido o expirado
- `404`: Usuario no encontrado

---

### 1.3 Iniciar Sesión

**Método**: `POST`  
**Ruta**: `/api/auth/logIn`  
**Descripción**: Autentica al usuario y establece una cookie httpOnly con el token JWT.

**Autenticación**: No requerida

**Datos de Entrada (Request)**:
```json
{
  "email": "juan.perez@example.com",
  "password": "Password123!"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "name": "Juan",
      "last_name": "Pérez",
      "email": "juan.perez@example.com",
      "role": {
        "id": 2,
        "name": "doctor"
      }
    }
  }
}
```

**Cabeceras de Respuesta**:
- Cookie `token` establecida con las siguientes propiedades:
  - `httpOnly: true`
  - `secure: true` (en producción)
  - `sameSite: 'lax'`
  - `maxAge: 24h`

**Códigos de Estado**:
- `200`: Login exitoso
- `401`: Credenciales inválidas
- `403`: Cuenta no confirmada o doctor no verificado
- `404`: Usuario no encontrado

**Errores Comunes**:
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

### 1.4 Cerrar Sesión

**Método**: `POST`  
**Ruta**: `/api/auth/logout`  
**Descripción**: Cierra la sesión del usuario actual.

**Autenticación**: Requerida (cookie con token)

**Datos de Entrada**: Ninguno

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

**Códigos de Estado**:
- `200`: Logout exitoso
- `401`: No autenticado

---

### 1.5 Obtener Perfil

**Método**: `GET`  
**Ruta**: `/api/auth/profile`  
**Descripción**: Obtiene la información del perfil del usuario autenticado.

**Autenticación**: Requerida

**Respuesta Exitosa (201 OK)**:
```json
{
  "id": 1,
  "name": "Juan",
  "last_name": "Pérez",
  "email": "juan.perez@example.com",
  "role": {
    "id": 2,
    "name": "doctor"
  },
  "permissions": ["view_appointments", "manage_records"]
}
```

**Códigos de Estado**:
- `201`: Perfil obtenido exitosamente
- `401`: No autenticado

---

### 1.6 Recuperar Contraseña (Paso 1)

**Método**: `POST`  
**Ruta**: `/api/auth/reset-password`  
**Descripción**: Solicita el restablecimiento de contraseña. Envía un correo con el token.

**Autenticación**: No requerida

**Datos de Entrada**:
```json
{
  "email": "juan.perez@example.com"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Se ha enviado un correo con las instrucciones para restablecer tu contraseña"
}
```

---

### 1.7 Verificar Token de Recuperación (Paso 2)

**Método**: `GET`  
**Ruta**: `/api/auth/reset-password/:token`  
**Descripción**: Verifica la validez del token de recuperación.

**Parámetros de Ruta**:
- `token`: Token de recuperación

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Token válido"
}
```

---

### 1.8 Restablecer Contraseña (Paso 3)

**Método**: `POST`  
**Ruta**: `/api/auth/reset-password/:token`  
**Descripción**: Establece una nueva contraseña usando el token válido.

**Parámetros de Ruta**:
- `token`: Token de recuperación

**Datos de Entrada**:
```json
{
  "password": "NuevaPassword123!"
}
```

| Campo | Tipo | Validación |
|-------|------|------------|
| password | string | Mínimo 8 caracteres |

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Contraseña actualizada exitosamente"
}
```

---

### 1.9 Obtener Sesiones Activas

**Método**: `GET`  
**Ruta**: `/api/auth/sessions`  
**Descripción**: Obtiene todas las sesiones activas del usuario.

**Autenticación**: Requerida

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "sessions": [
    {
      "id": 1,
      "deviceInfo": "Mozilla/5.0...",
      "ipAddress": "192.168.1.1",
      "createdAt": "2024-12-01T10:00:00Z",
      "lastActivity": "2024-12-01T12:30:00Z"
    }
  ]
}
```

---

### 1.10 Cerrar Sesión Específica

**Método**: `DELETE`  
**Ruta**: `/api/auth/sessions/:sessionId`  
**Descripción**: Cierra una sesión específica por su ID.

**Autenticación**: Requerida

**Parámetros de Ruta**:
- `sessionId`: ID de la sesión a cerrar

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

## 2. Administración (`/api/admin`)

### 2.1 Obtener Estadísticas del Dashboard

**Método**: `GET`  
**Ruta**: `/api/admin/dashboard/stats`  
**Descripción**: Obtiene estadísticas generales para el panel de administración.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalDoctors": 25,
    "totalPatients": 120,
    "totalAppointments": 300,
    "appointmentsToday": 15,
    "pendingVerifications": 3
  }
}
```

**Códigos de Estado**:
- `200`: Estadísticas obtenidas
- `401`: No autenticado
- `403`: Sin permisos de administrador

---

### 2.2 Obtener Actividad Reciente

**Método**: `GET`  
**Ruta**: `/api/admin/dashboard/recent-activity`  
**Descripción**: Obtiene las actividades recientes del sistema.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "activities": [
    {
      "id": 1,
      "type": "user_registration",
      "description": "Nuevo usuario registrado: Juan Pérez",
      "timestamp": "2024-12-01T10:00:00Z"
    },
    {
      "id": 2,
      "type": "appointment_created",
      "description": "Nueva cita agendada",
      "timestamp": "2024-12-01T09:45:00Z"
    }
  ]
}
```

---

### 2.3 Obtener Todos los Usuarios

**Método**: `GET`  
**Ruta**: `/api/admin/users`  
**Descripción**: Obtiene la lista completa de usuarios del sistema.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "name": "Juan",
      "last_name": "Pérez",
      "email": "juan.perez@example.com",
      "role": {
        "id": 2,
        "name": "doctor"
      },
      "confirmed": true,
      "createdAt": "2024-11-01T10:00:00Z"
    }
  ]
}
```

---

### 2.4 Obtener Roles y Permisos de Usuario

**Método**: `GET`  
**Ruta**: `/api/admin/users/:userId/roles-permissions`  
**Descripción**: Obtiene los roles y permisos de un usuario específico.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Parámetros de Ruta**:
- `userId`: ID del usuario

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "data": {
    "userId": 1,
    "roles": [
      {
        "id": 2,
        "name": "doctor"
      }
    ],
    "permissions": [
      {
        "id": 1,
        "name": "view_appointments"
      },
      {
        "id": 2,
        "name": "manage_records"
      }
    ]
  }
}
```

---

### 2.5 Asignar Rol a Usuario

**Método**: `POST`  
**Ruta**: `/api/admin/assign-role`  
**Descripción**: Asigna un rol específico a un usuario.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Datos de Entrada**:
```json
{
  "userId": 5,
  "roleId": 2
}
```

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| userId | integer | Sí | ID del usuario |
| roleId | integer | Sí | ID del rol a asignar |

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Rol asignado exitosamente"
}
```

**Códigos de Estado**:
- `200`: Rol asignado exitosamente
- `400`: Datos inválidos o el usuario ya tiene ese rol
- `401`: No autenticado
- `403`: Sin permisos
- `404`: Usuario o rol no encontrado

---

### 2.6 Remover Rol de Usuario

**Método**: `DELETE`  
**Ruta**: `/api/admin/remove-role`  
**Descripción**: Remueve un rol de un usuario.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Datos de Entrada**:
```json
{
  "userId": 5,
  "roleId": 2
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Rol removido exitosamente"
}
```

---

### 2.7 Obtener Todos los Permisos

**Método**: `GET`  
**Ruta**: `/api/admin/permissions`  
**Descripción**: Obtiene la lista de todos los permisos disponibles en el sistema.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "permissions": [
    {
      "id": 1,
      "name": "view_appointments",
      "description": "Ver citas médicas"
    },
    {
      "id": 2,
      "name": "manage_records",
      "description": "Gestionar expedientes médicos"
    },
    {
      "id": 3,
      "name": "all",
      "description": "Acceso completo al sistema"
    }
  ]
}
```

---

### 2.8 Asignar Permiso a Usuario

**Método**: `POST`  
**Ruta**: `/api/admin/assign-permission`  
**Descripción**: Asigna un permiso específico a un usuario.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Datos de Entrada**:
```json
{
  "userId": 5,
  "permissionId": 1
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Permiso asignado exitosamente"
}
```

---

### 2.9 Remover Permiso de Usuario

**Método**: `DELETE`  
**Ruta**: `/api/admin/remove-permission`  
**Descripción**: Remueve un permiso de un usuario.

**Autenticación**: Requerida (rol: admin)  
**Permisos**: `all`

**Datos de Entrada**:
```json
{
  "userId": 5,
  "permissionId": 1
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Permiso removido exitosamente"
}
```

---

## 3. Doctores (`/api/doctor`)

### 3.1 Obtener Lista de Doctores

**Método**: `GET`  
**Ruta**: `/api/doctor`  
**Descripción**: Obtiene la lista de todos los doctores registrados.

**Autenticación**: Requerida

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "doctors": [
    {
      "id": 1,
      "userId": 2,
      "name": "Dr. Juan Pérez",
      "email": "juan.perez@example.com",
      "specialties": [
        {
          "id": 1,
          "name": "Cardiología"
        }
      ],
      "clinics": [
        {
          "id": 1,
          "name": "Clínica Central"
        }
      ],
      "verified": true
    }
  ]
}
```

---

### 3.2 Buscar Doctores

**Método**: `GET`  
**Ruta**: `/api/doctor/search`  
**Descripción**: Busca doctores por nombre, especialidad o clínica.

**Autenticación**: Requerida

**Query Parameters**:
- `name`: Nombre del doctor (opcional)
- `specialty`: ID de especialidad (opcional)
- `clinic`: ID de clínica (opcional)

**Ejemplo**: `/api/doctor/search?name=Juan&specialty=1`

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "results": [
    {
      "id": 1,
      "name": "Dr. Juan Pérez",
      "specialties": ["Cardiología"],
      "clinics": ["Clínica Central"]
    }
  ]
}
```

---

### 3.3 Obtener Clínicas de un Doctor

**Método**: `GET`  
**Ruta**: `/api/doctor/:doctorId/clinics`  
**Descripción**: Obtiene todas las clínicas asociadas a un doctor específico.

**Autenticación**: Requerida

**Parámetros de Ruta**:
- `doctorId`: ID del doctor

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "clinics": [
    {
      "id": 1,
      "name": "Clínica Central",
      "address": "Av. Principal 123",
      "city": "Ciudad de México"
    }
  ]
}
```

---

### 3.4 Asignar Doctor a Clínica

**Método**: `POST`  
**Ruta**: `/api/doctor/:doctorId/clinics`  
**Descripción**: Asigna un doctor a una clínica específica.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorId`: ID del doctor

**Datos de Entrada**:
```json
{
  "clinicId": 2
}
```

**Respuesta Exitosa (201 OK)**:
```json
{
  "success": true,
  "message": "Doctor asignado a la clínica exitosamente"
}
```

---

### 3.5 Remover Doctor de Clínica

**Método**: `DELETE`  
**Ruta**: `/api/doctor/:doctorId/clinics/:clinicId`  
**Descripción**: Remueve la asociación de un doctor con una clínica.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorId`: ID del doctor
- `clinicId`: ID de la clínica

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Doctor removido de la clínica exitosamente"
}
```

---

### 3.6 Asignar Doctor a Especialidad

**Método**: `POST`  
**Ruta**: `/api/doctor/:doctorId/specialties`  
**Descripción**: Asigna una especialidad a un doctor.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorId`: ID del doctor

**Datos de Entrada**:
```json
{
  "specialtyId": 3
}
```

**Respuesta Exitosa (201 OK)**:
```json
{
  "success": true,
  "message": "Especialidad asignada al doctor exitosamente"
}
```

---

### 3.7 Remover Doctor de Especialidad

**Método**: `DELETE`  
**Ruta**: `/api/doctor/:doctorId/specialties/:specialtyId`  
**Descripción**: Remueve una especialidad de un doctor.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorId`: ID del doctor
- `specialtyId`: ID de la especialidad

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Especialidad removida del doctor exitosamente"
}
```

---

### 3.8 Actualizar Salario de Doctor

**Método**: `PUT`  
**Ruta**: `/api/doctor/:doctorProfileId/salary`  
**Descripción**: Actualiza el salario de un doctor.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorProfileId`: ID del perfil del doctor

**Datos de Entrada**:
```json
{
  "salary": 50000.00
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Salario actualizado exitosamente"
}
```

---

## 4. Credenciales de Doctor (`/api/doctor`)

### 4.1 Actualizar Credenciales

**Método**: `PUT`  
**Ruta**: `/api/doctor/credentials`  
**Descripción**: Permite a un doctor actualizar sus credenciales profesionales.

**Autenticación**: Requerida (rol: doctor)

**Datos de Entrada**:
```json
{
  "medical_license_number": "LIC98765",
  "cedula_profesional": "CED54321"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Credenciales actualizadas exitosamente"
}
```

---

### 4.2 Verificar Credenciales

**Método**: `POST`  
**Ruta**: `/api/doctor/credentials/verify/:doctorProfileId`  
**Descripción**: Permite a un administrador verificar las credenciales de un doctor.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorProfileId`: ID del perfil del doctor

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Credenciales verificadas exitosamente"
}
```

---

### 4.3 Obtener Estado de Credenciales

**Método**: `GET`  
**Ruta**: `/api/doctor/credentials/status`  
**Descripción**: Obtiene el estado de verificación de las credenciales del doctor autenticado.

**Autenticación**: Requerida (rol: doctor)

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "status": {
    "verified": false,
    "pending": true,
    "rejected": false,
    "message": "Tus credenciales están siendo revisadas"
  }
}
```

---

### 4.4 Subir Documentos

**Método**: `PUT`  
**Ruta**: `/api/doctor/credentials/upload`  
**Descripción**: Permite a un doctor subir o actualizar sus documentos profesionales.

**Autenticación**: Requerida (rol: doctor)

**Content-Type**: `multipart/form-data`

**Datos de Entrada**:
- `medical_license`: Archivo de licencia médica (máx. 1)
- `cedula`: Archivo de cédula profesional (máx. 1)
- `additional`: Archivos adicionales (máx. 3)

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Documentos subidos exitosamente"
}
```

---

### 4.5 Solicitar Documentos Adicionales

**Método**: `POST`  
**Ruta**: `/api/doctor/credentials/request-documents/:doctorProfileId`  
**Descripción**: Permite a un administrador solicitar documentos adicionales a un doctor.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorProfileId`: ID del perfil del doctor

**Datos de Entrada**:
```json
{
  "message": "Por favor, sube una copia actualizada de tu cédula profesional"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Solicitud enviada al doctor"
}
```

---

### 4.6 Rechazar Credenciales

**Método**: `POST`  
**Ruta**: `/api/doctor/credentials/reject/:doctorId`  
**Descripción**: Permite a un administrador rechazar las credenciales de un doctor.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `doctorId`: ID del doctor

**Datos de Entrada**:
```json
{
  "reason": "Los documentos presentados no cumplen con los requisitos"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Credenciales rechazadas"
}
```

---

### 4.7 Obtener Documento

**Método**: `GET`  
**Ruta**: `/api/doctor/credentials/document/:filename`  
**Descripción**: Permite descargar un documento específico de credenciales.

**Autenticación**: Requerida  
**Middleware**: Verifica acceso al documento

**Parámetros de Ruta**:
- `filename`: Nombre del archivo

**Respuesta Exitosa (200 OK)**:
- Retorna el archivo solicitado

---

## 5. Especialidades (`/api/specialties`)

### 5.1 Obtener Todas las Especialidades

**Método**: `GET`  
**Ruta**: `/api/specialties`  
**Descripción**: Obtiene la lista completa de especialidades médicas.

**Autenticación**: Requerida

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "specialties": [
    {
      "id": 1,
      "name": "Cardiología",
      "description": "Especialidad médica que se ocupa del corazón"
    },
    {
      "id": 2,
      "name": "Dermatología",
      "description": "Especialidad médica que se ocupa de la piel"
    }
  ]
}
```

---

### 5.2 Crear Especialidad

**Método**: `POST`  
**Ruta**: `/api/specialties`  
**Descripción**: Crea una nueva especialidad médica.

**Autenticación**: Requerida  
**Permisos**: `all` o `manage_specialties`

**Datos de Entrada**:
```json
{
  "name": "Neurología",
  "description": "Especialidad médica que trata enfermedades del sistema nervioso"
}
```

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| name | string | Sí | Nombre de la especialidad |
| description | string | No | Descripción de la especialidad |

**Respuesta Exitosa (201 Created)**:
```json
{
  "success": true,
  "specialty": {
    "id": 3,
    "name": "Neurología",
    "description": "Especialidad médica que trata enfermedades del sistema nervioso"
  }
}
```

---

### 5.3 Actualizar Especialidad

**Método**: `PUT`  
**Ruta**: `/api/specialties/:id`  
**Descripción**: Actualiza una especialidad existente.

**Autenticación**: Requerida  
**Permisos**: `all` o `manage_specialties`

**Parámetros de Ruta**:
- `id`: ID de la especialidad

**Datos de Entrada**:
```json
{
  "name": "Neurología Pediátrica",
  "description": "Especialidad enfocada en el sistema nervioso infantil"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Especialidad actualizada exitosamente"
}
```

---

### 5.4 Eliminar Especialidad

**Método**: `DELETE`  
**Ruta**: `/api/specialties/:id`  
**Descripción**: Elimina una especialidad del sistema.

**Autenticación**: Requerida  
**Permisos**: `all` o `manage_specialties`

**Parámetros de Ruta**:
- `id`: ID de la especialidad

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Especialidad eliminada exitosamente"
}
```

---

## 6. Roles (`/api/roles`)

### 6.1 Obtener Todos los Roles

**Método**: `GET`  
**Ruta**: `/api/roles`  
**Descripción**: Obtiene la lista de todos los roles del sistema.

**Autenticación**: Requerida (rol: admin)

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "roles": [
    {
      "id": 1,
      "name": "admin",
      "description": "Administrador del sistema"
    },
    {
      "id": 2,
      "name": "doctor",
      "description": "Médico profesional"
    },
    {
      "id": 3,
      "name": "patient",
      "description": "Paciente"
    }
  ]
}
```

---

### 6.2 Crear Rol

**Método**: `POST`  
**Ruta**: `/api/roles`  
**Descripción**: Crea un nuevo rol en el sistema.

**Autenticación**: Requerida (rol: admin)

**Datos de Entrada**:
```json
{
  "name": "nurse",
  "description": "Personal de enfermería"
}
```

**Respuesta Exitosa (201 Created)**:
```json
{
  "success": true,
  "role": {
    "id": 4,
    "name": "nurse",
    "description": "Personal de enfermería"
  }
}
```

---

### 6.3 Obtener Rol por ID

**Método**: `GET`  
**Ruta**: `/api/roles/:id`  
**Descripción**: Obtiene información detallada de un rol específico.

**Autenticación**: Requerida (rol: admin)

**Parámetros de Ruta**:
- `id`: ID del rol

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "role": {
    "id": 2,
    "name": "doctor",
    "description": "Médico profesional",
    "permissions": [
      {
        "id": 1,
        "name": "view_appointments"
      }
    ]
  }
}
```

---

## 7. Citas Médicas (`/api/appointments`)

### 7.1 Crear Cita

**Método**: `POST`  
**Ruta**: `/api/appointments`  
**Descripción**: Crea una nueva cita médica.

**Autenticación**: Requerida (rol: patient, doctor)  
**Validación**: Doctor debe estar verificado

**Datos de Entrada**:
```json
{
  "doctorId": 2,
  "appointmentDate": "2024-12-15",
  "appointmentTime": "10:30",
  "reason": "Consulta general",
  "clinicId": 1
}
```

| Campo | Tipo | Obligatorio | Validación |
|-------|------|-------------|------------|
| doctorId | integer | Sí | ID válido de doctor |
| appointmentDate | string | Sí | Formato ISO 8601 (YYYY-MM-DD), no en el pasado, máximo 6 meses adelante |
| appointmentTime | string | Sí | Formato HH:MM |
| reason | string | No | Máximo 500 caracteres |
| clinicId | integer | No | ID válido de clínica |

**Respuesta Exitosa (201 Created)**:
```json
{
  "success": true,
  "appointment": {
    "id": 1,
    "doctorId": 2,
    "patientId": 5,
    "appointmentDate": "2024-12-15",
    "appointmentTime": "10:30",
    "status": "scheduled",
    "reason": "Consulta general",
    "clinicId": 1
  }
}
```

**Códigos de Estado**:
- `201`: Cita creada exitosamente
- `400`: Datos inválidos o fecha no disponible
- `401`: No autenticado
- `403`: Doctor no verificado

---

### 7.2 Obtener Citas

**Método**: `GET`  
**Ruta**: `/api/appointments`  
**Descripción**: Obtiene las citas del usuario autenticado (doctor o paciente).

**Autenticación**: Requerida

**Query Parameters** (opcionales):
- `status`: Filtrar por estado (scheduled, confirmed, completed, cancelled, no-show)
- `date`: Filtrar por fecha específica

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "appointments": [
    {
      "id": 1,
      "doctor": {
        "id": 2,
        "name": "Dr. Juan Pérez"
      },
      "patient": {
        "id": 5,
        "name": "María García"
      },
      "appointmentDate": "2024-12-15",
      "appointmentTime": "10:30",
      "status": "scheduled",
      "reason": "Consulta general",
      "clinic": {
        "id": 1,
        "name": "Clínica Central"
      }
    }
  ]
}
```

---

### 7.3 Confirmar Cita

**Método**: `PUT`  
**Ruta**: `/api/appointments/:id/confirm`  
**Descripción**: Confirma una cita agendada (solo doctores).

**Autenticación**: Requerida (rol: doctor)

**Parámetros de Ruta**:
- `id`: ID de la cita (validado como integer mínimo 1)

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Cita confirmada exitosamente",
  "appointment": {
    "id": 1,
    "status": "confirmed"
  }
}
```

**Códigos de Estado**:
- `200`: Cita confirmada
- `400`: ID inválido o cita no puede ser confirmada
- `401`: No autenticado
- `403`: Sin permisos de doctor
- `404`: Cita no encontrada

---

### 7.4 Cancelar Cita

**Método**: `PUT`  
**Ruta**: `/api/appointments/:id/cancel`  
**Descripción**: Cancela una cita (paciente o doctor).

**Autenticación**: Requerida (rol: patient, doctor)

**Parámetros de Ruta**:
- `id`: ID de la cita

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Cita cancelada exitosamente",
  "appointment": {
    "id": 1,
    "status": "cancelled"
  }
}
```

---

### 7.5 Completar Cita

**Método**: `PUT`  
**Ruta**: `/api/appointments/:id/complete`  
**Descripción**: Marca una cita como completada (solo doctores).

**Autenticación**: Requerida (rol: doctor)

**Parámetros de Ruta**:
- `id`: ID de la cita

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Cita completada exitosamente",
  "appointment": {
    "id": 1,
    "status": "completed"
  }
}
```

---

## 8. Clínicas (`/api/clinics`)

### 8.1 Crear Clínica

**Método**: `POST`  
**Ruta**: `/api/clinics`  
**Descripción**: Crea una nueva clínica en el sistema.

**Autenticación**: Requerida  
**Permisos**: `all` o `manage_clinics`

**Datos de Entrada**:
```json
{
  "name": "Clínica Norte",
  "address": "Av. Norte 456",
  "city": "Ciudad de México",
  "state": "CDMX",
  "phone": "5551234567",
  "email": "contacto@clinicanorte.com"
}
```

**Respuesta Exitosa (201 Created)**:
```json
{
  "success": true,
  "clinic": {
    "id": 2,
    "name": "Clínica Norte",
    "address": "Av. Norte 456",
    "city": "Ciudad de México",
    "state": "CDMX",
    "phone": "5551234567",
    "email": "contacto@clinicanorte.com"
  }
}
```

---

### 8.2 Obtener Todas las Clínicas

**Método**: `GET`  
**Ruta**: `/api/clinics`  
**Descripción**: Obtiene la lista de todas las clínicas registradas.

**Autenticación**: Requerida

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "clinics": [
    {
      "id": 1,
      "name": "Clínica Central",
      "address": "Av. Principal 123",
      "city": "Ciudad de México",
      "phone": "5559876543"
    }
  ]
}
```

---

### 8.3 Obtener Clínica por ID

**Método**: `GET`  
**Ruta**: `/api/clinics/:id`  
**Descripción**: Obtiene información detallada de una clínica específica.

**Autenticación**: Requerida

**Parámetros de Ruta**:
- `id`: ID de la clínica

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "clinic": {
    "id": 1,
    "name": "Clínica Central",
    "address": "Av. Principal 123",
    "city": "Ciudad de México",
    "state": "CDMX",
    "phone": "5559876543",
    "email": "info@clinicacentral.com",
    "doctors": [
      {
        "id": 1,
        "name": "Dr. Juan Pérez"
      }
    ]
  }
}
```

---

### 8.4 Actualizar Clínica

**Método**: `PUT`  
**Ruta**: `/api/clinics/:id`  
**Descripción**: Actualiza la información de una clínica.

**Autenticación**: Requerida  
**Permisos**: `all` o `manage_clinics`

**Parámetros de Ruta**:
- `id`: ID de la clínica

**Datos de Entrada**:
```json
{
  "name": "Clínica Central Actualizada",
  "phone": "5559999999"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Clínica actualizada exitosamente"
}
```

---

### 8.5 Eliminar Clínica

**Método**: `DELETE`  
**Ruta**: `/api/clinics/:id`  
**Descripción**: Elimina una clínica del sistema.

**Autenticación**: Requerida  
**Permisos**: `all` o `manage_clinics`

**Parámetros de Ruta**:
- `id`: ID de la clínica

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Clínica eliminada exitosamente"
}
```

---

## 9. Registros Médicos (`/api/medical-records`)

### 9.1 Crear Registro Médico

**Método**: `POST`  
**Ruta**: `/api/medical-records`  
**Descripción**: Crea un nuevo registro médico para un paciente.

**Autenticación**: Requerida (rol: doctor)  
**Validación**: Doctor debe estar verificado  
**HIPAA**: Registra el acceso y creación

**Datos de Entrada**:
```json
{
  "patientId": 5,
  "appointmentId": 1,
  "diagnosis": "Hipertensión arterial",
  "treatment": "Medicamento antihipertensivo",
  "notes": "Paciente debe monitorear presión arterial diariamente",
  "prescriptions": [
    {
      "medication": "Losartán 50mg",
      "dosage": "1 tableta diaria",
      "duration": "30 días"
    }
  ]
}
```

**Respuesta Exitosa (201 Created)**:
```json
{
  "success": true,
  "medicalRecord": {
    "id": 1,
    "patientId": 5,
    "doctorId": 2,
    "appointmentId": 1,
    "diagnosis": "Hipertensión arterial",
    "treatment": "Medicamento antihipertensivo",
    "notes": "Paciente debe monitorear presión arterial diariamente",
    "createdAt": "2024-12-01T10:00:00Z"
  }
}
```

**Códigos de Estado**:
- `201`: Registro creado exitosamente
- `401`: No autenticado
- `403`: Doctor no verificado o sin permisos
- `400`: Datos inválidos

---

### 9.2 Obtener Registro Médico

**Método**: `GET`  
**Ruta**: `/api/medical-records/:id`  
**Descripción**: Obtiene un registro médico específico.

**Autenticación**: Requerida  
**Middleware**: Verifica acceso al registro médico  
**HIPAA**: Registra el acceso

**Parámetros de Ruta**:
- `id`: ID del registro médico

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "medicalRecord": {
    "id": 1,
    "patient": {
      "id": 5,
      "name": "María García"
    },
    "doctor": {
      "id": 2,
      "name": "Dr. Juan Pérez"
    },
    "diagnosis": "Hipertensión arterial",
    "treatment": "Medicamento antihipertensivo",
    "notes": "Paciente debe monitorear presión arterial diariamente",
    "createdAt": "2024-12-01T10:00:00Z"
  }
}
```

**Códigos de Estado**:
- `200`: Registro obtenido exitosamente
- `401`: No autenticado
- `403`: Sin acceso a este registro
- `404`: Registro no encontrado

---

### 9.3 Actualizar Registro Médico

**Método**: `PUT`  
**Ruta**: `/api/medical-records/:id`  
**Descripción**: Actualiza un registro médico existente.

**Autenticación**: Requerida (rol: doctor, admin)  
**HIPAA**: Registra la actualización

**Parámetros de Ruta**:
- `id`: ID del registro médico

**Datos de Entrada**:
```json
{
  "diagnosis": "Hipertensión arterial controlada",
  "notes": "Paciente responde bien al tratamiento"
}
```

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Registro médico actualizado exitosamente"
}
```

---

### 9.4 Eliminar Registro Médico

**Método**: `DELETE`  
**Ruta**: `/api/medical-records/:id`  
**Descripción**: Elimina un registro médico (soft delete).

**Autenticación**: Requerida (rol: doctor, admin)  
**HIPAA**: Registra la eliminación

**Parámetros de Ruta**:
- `id`: ID del registro médico

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "message": "Registro médico eliminado exitosamente"
}
```

---

### 9.5 Obtener Historial del Paciente

**Método**: `GET`  
**Ruta**: `/api/medical-records/patient/:patientId`  
**Descripción**: Obtiene el historial médico completo de un paciente.

**Autenticación**: Requerida  
**Middleware**: Verifica acceso al historial del paciente  
**HIPAA**: Registra el acceso al historial

**Parámetros de Ruta**:
- `patientId`: ID del paciente

**Respuesta Exitosa (200 OK)**:
```json
{
  "success": true,
  "patient": {
    "id": 5,
    "name": "María García"
  },
  "medicalHistory": [
    {
      "id": 1,
      "doctor": {
        "id": 2,
        "name": "Dr. Juan Pérez"
      },
      "diagnosis": "Hipertensión arterial",
      "treatment": "Medicamento antihipertensivo",
      "date": "2024-12-01T10:00:00Z"
    }
  ]
}
```

**Códigos de Estado**:
- `200`: Historial obtenido exitosamente
- `401`: No autenticado
- `403`: Sin acceso a este historial
- `404`: Paciente no encontrado

---

## Guía de Integración Paso a Paso

### Ejemplo: Autenticación y Consumo de Endpoints

```javascript
// 1. Iniciar Sesión
async function login(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/auth/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // IMPORTANTE: Incluir cookies
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
}

// 2. Consumir endpoint autenticado
async function getProfile() {
  try {
    const response = await fetch('http://localhost:3000/api/auth/profile', {
      method: 'GET',
      credentials: 'include', // IMPORTANTE: Incluir cookies
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('No autenticado');
    }

    const profile = await response.json();
    return profile;
  } catch (error) {
    console.error('Error obteniendo perfil:', error);
    throw error;
  }
}

// 3. Crear una cita
async function createAppointment(appointmentData) {
  try {
    const response = await fetch('http://localhost:3000/api/appointments', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointmentData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creando cita:', error);
    throw error;
  }
}

// 4. Subir documentos (multipart/form-data)
async function uploadDocuments(files) {
  const formData = new FormData();
  
  if (files.medicalLicense) {
    formData.append('medical_license', files.medicalLicense);
  }
  if (files.cedula) {
    formData.append('cedula', files.cedula);
  }

  try {
    const response = await fetch('http://localhost:3000/api/doctor/credentials/upload', {
      method: 'PUT',
      credentials: 'include',
      // NO incluir Content-Type, el navegador lo establece automáticamente con boundary
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error subiendo documentos:', error);
    throw error;
  }
}
```

---

## Manejo de Errores

### Estructura de Error Estándar

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

### Códigos de Estado HTTP Comunes

| Código | Significado | Cuándo ocurre |
|--------|-------------|---------------|
| 200 | OK | Operación exitosa (GET, PUT, DELETE) |
| 201 | Created | Recurso creado exitosamente (POST) |
| 400 | Bad Request | Datos de entrada inválidos, validación fallida |
| 401 | Unauthorized | No autenticado, token inválido o expirado |
| 403 | Forbidden | Autenticado pero sin permisos suficientes |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej. email duplicado) |
| 500 | Internal Server Error | Error del servidor |

### Ejemplos de Errores por Endpoint

**Error de Validación (400)**:
```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "message": "Formato de email inválido"
    },
    {
      "field": "password",
      "message": "La contraseña debe tener al menos 8 caracteres"
    }
  ]
}
```

**Error de Autenticación (401)**:
```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

**Error de Permisos (403)**:
```json
{
  "success": false,
  "message": "No tienes permisos para realizar esta acción"
}
```

**Error de Recurso No Encontrado (404)**:
```json
{
  "success": false,
  "message": "Cita no encontrada"
}
```

---

## Notas Importantes

### Autenticación y Cookies

- La API utiliza cookies httpOnly para almacenar el token JWT
- Siempre incluir `credentials: 'include'` en las peticiones fetch
- Las cookies se establecen automáticamente al hacer login
- No es necesario incluir el token manualmente en las cabeceras

### CORS

- El frontend debe estar en la lista de orígenes permitidos
- Configuración en producción: solo dominios autorizados

### Rate Limiting

- La API implementa rate limiting para prevenir abuso
- Límite estándar: definido por el servidor

### Validaciones

- Todos los endpoints con POST/PUT implementan validación de entrada
- Los errores de validación retornan código 400 con detalles específicos
- Utilizar los ejemplos de validación para implementar validación del lado del cliente

### Seguridad HIPAA (Registros Médicos)

- Todos los accesos a registros médicos son auditados
- Solo usuarios autorizados pueden acceder a información médica
- Los logs de acceso son inmutables y permanentes
