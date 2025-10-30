import express from 'express';


import * as doctorControllers from '../'
import { getDoctores } from '../Presentacion/controllers/doctoresController.js';
import { checkAuth, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

// Cualquier usuario autenticado puede ver la lista de doctores.
router.get('/', checkAuth, getDoctores);

export default router;