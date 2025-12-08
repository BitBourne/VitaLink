import express from 'express';

import { assignRoleUserCtrlr } from '../Controllers/RoleControllers/actionsId.js';
import { removeUserRoleCtrlr } from '../Controllers/RoleControllers/removeUserRole.js';
import { checkAuth, checkPermission, checkRole } from '../../Infraestructura/middlewares/authMiddleware.js'
import { assignUserPermissionCtrlr } from '../Controllers/PermissionControllers/assignUserPermission.js'
import { removeUserPermissionCtrlr } from '../Controllers/PermissionControllers/removeUserPermission.js';
import { getAllPermissionsCtrlr } from '../Controllers/PermissionControllers/getAllPermissions.js';
import {
    getAllUsersCtrlr,
    getUserRolesPermissionsCtrlr,
    updateUserCtrlr,
    suspendUserCtrlr,
    activateUserCtrlr,
    deleteUserCtrlr
} from '../Controllers/UserControllers/userControllers.js';
import { getDashboardStatsCtrlr, getRecentActivityCtrlr } from '../Controllers/AdminControllers/dashboardController.js';
import { adminCancelAppointmentController } from '../Controllers/AppointmentControllers/adminCancelAppointmentController.js';
import { getAppointmentDetails, reassignDoctor } from '../Controllers/AppointmentControllers/index.js';
import auditAction from '../../Infraestructura/middlewares/auditMiddleware.js';

const router = express.Router();

// Rutas de dashboard
router.get('/dashboard/stats', checkAuth, checkRole(["admin"]), checkPermission(['all']), getDashboardStatsCtrlr);
router.get('/dashboard/recent-activity', checkAuth, checkRole(["admin"]), checkPermission(['all']), getRecentActivityCtrlr);

// Rutas de gestión de usuarios
router.get('/users', checkAuth, checkRole(["admin"]), checkPermission(['all']), getAllUsersCtrlr);
router.get('/users/:userId/roles-permissions', checkAuth, checkRole(["admin"]), checkPermission(['all']), getUserRolesPermissionsCtrlr);
router.put('/users/:userId', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_update_user', 'User'), updateUserCtrlr);
router.put('/users/:userId/suspend', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_suspend_user', 'User'), suspendUserCtrlr);
router.put('/users/:userId/activate', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_activate_user', 'User'), activateUserCtrlr);
router.delete('/users/:userId', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_delete_user', 'User'), deleteUserCtrlr);

// Rutas de gestión de roles
router.post('/assign-role', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_assign_role', 'Role'), assignRoleUserCtrlr);
router.delete('/remove-role', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_remove_role', 'Role'), removeUserRoleCtrlr);

// Rutas de gestión de permisos
router.get('/permissions', checkAuth, checkRole(["admin"]), checkPermission(['all']), getAllPermissionsCtrlr);
router.post('/assign-permission', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_assign_permission', 'Permission'), assignUserPermissionCtrlr);
router.delete('/remove-permission', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_remove_permission', 'Permission'), removeUserPermissionCtrlr);

// Rutas de gestión de citas (admin)
router.get('/appointments/:id/details', checkAuth, checkRole(["admin"]), checkPermission(['all']), getAppointmentDetails);
router.put('/appointments/:id/cancel', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_cancel_appointment', 'Appointment'), adminCancelAppointmentController);
router.put('/appointments/:id/reassign', checkAuth, checkRole(["admin"]), checkPermission(['all']), auditAction('admin_reassign_appointment', 'Appointment'), reassignDoctor);

export default router;