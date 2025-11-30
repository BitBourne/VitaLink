// Dependencias
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Módulos personalizados
import db from './Infraestructura/config/db.js';
import routes from './Presentacion/Routes/index.js';
import ErrorHandling from './Infraestructura/middlewares/errorHandling.js';
import logger from './Infraestructura/utils/logger.js';

// Middlewares de seguridad
import securityHeaders from './Infraestructura/middlewares/securityHeaders.js';
import { globalRateLimiter } from './Infraestructura/middlewares/rateLimiter.js';

// Configuración de variables de entorno (debe ir primero)
dotenv.config();

// Inicializar servidor express
const app = express();

// Headers de seguridad HTTP (helmet) - DEBE IR PRIMERO
app.use(securityHeaders);

// Parseo de JSON con límite de tamaño (previene ataques de payload grande)
app.use(express.json({ limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// CORS configurado
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rate limiting global (antes de las rutas)
app.use(globalRateLimiter);

// Conectar a la base de datos
db.authenticate()
  .then(() => logger.info('Database connected'))
  .catch(error => logger.error('Database connection failed', error));

// Sincronizar modelos
import './Datos/Models/Relations.js';
import User from './Datos/Models/User.js';
import UserRoles from './Datos/Models/UserRoles.js';
import UserPermission from './Datos/Models/UserPermission.js';
import Roles from './Datos/Models/Role.js';
import Permission from './Datos/Models/Permission.js';
import AuditLog from './Datos/Models/AuditLog.js';
import UserSession from './Datos/Models/UserSession.js';
import Review from './Datos/Models/Review.js';
import DoctorAvailability from './Datos/Models/DoctorAvailability.js';

// Enrutamiento
app.use('/api', routes);

// Manejo de errores
app.use(ErrorHandling);

// Asignación de puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`)
});
