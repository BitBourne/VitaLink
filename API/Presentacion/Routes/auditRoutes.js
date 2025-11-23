// auditRoutes.js
import express from 'express';
import * as auditControllers from '../Controllers/AuditControllers/index.js';
import { checkAuth, checkRole, checkPermission } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

// Ver logs de auditoría (solo admin con permiso específico)
router.get('/logs', checkAuth, checkRole(['admin']), checkPermission(['view_audit_logs', 'todo']), auditControllers.getAuditLogs);

export default router;
