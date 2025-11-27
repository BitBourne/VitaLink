// Dependencias
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Módulos personalizados
import db from './Infraestructura/config/db.js';
import routes from './Presentacion/Routes/index.js';
import ErrorHandling from './Infraestructura/middlewares/errorHandling.js';
import logger from './Infraestructura/utils/logger.js';

// Config env
dotenv.config();

// Inicializar express
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

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
import Conversation from './Datos/Models/Chats/Conversations.js';
import DoctorAvailability from './Datos/Models/DoctorAvailability.js';
// db.sync({ alter: true })
//   .then(() => console.log('Database & tables synced'))
//   .catch(err => console.log(err));


// Rutas
app.use('/api', routes);

// Manejo de errores
app.use(ErrorHandling);

export default app;
