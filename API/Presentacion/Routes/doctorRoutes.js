import express from 'express';


import * as doctorControllers from '../Controllers/DoctorsControllers/index.js'
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

// Cualquier usuario autenticado puede ver la lista de doctores.
router.get('/', checkAuth, doctorControllers.getDoctores);

export default router;