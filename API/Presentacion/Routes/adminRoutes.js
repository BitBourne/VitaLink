import express from 'express';


// import * as roleControllers from '../Controllers/roleControllers/index.js'
import { assignRoleUserCtrlr } from '../Controllers/RoleControllers/actionsId.js';
import { checkAuth, checkPermission, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js'
import { assignPermissionCtrlr } from '../Controllers/PermissionControllers/actionsId.js'

const router = express.Router();

router.post('/assign-role', checkAuth, checkRole(["admin"]), checkPermission(['asignar_permisos','todo']), assignRoleUserCtrlr)
router.post('/assign-permission', checkAuth, checkRole(["admin"]), checkPermission(['asignar_permisos','todo']), assignPermissionCtrlr)


export default router;