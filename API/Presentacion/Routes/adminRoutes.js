import express from 'express';

import { assignRoleUserCtrlr } from '../Controllers/RoleControllers/actionsId.js';
import { checkAuth, checkPermission, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js'
import { assignUserPermissionCtrlr } from '../Controllers/PermissionControllers/assignUserPermission.js'

const router = express.Router();

router.post('/assign-role', checkAuth, checkRole(["admin"]), checkPermission(['all']), assignRoleUserCtrlr)
router.post('/assign-permission', checkAuth, checkRole(["admin"]), checkPermission(['all']), assignUserPermissionCtrlr)

export default router;