// Dependencias
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Módulos personalizados
import db from './Infraestructura/config/db.js';
import routes from './Presentacion/Routes/index.js';
import ErrorHandling from './Infraestructura/middlewares/errorHandling.js';
import logger from './Infraestructura/utils/logger.js';

// Inicializar servidor express
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Configuración de variables de entorno
dotenv.config();

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
