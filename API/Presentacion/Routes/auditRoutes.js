import express from 'express';
import * as auditControllers from '../Controllers/AuditControllers/index.js';
import { checkAuth, checkRole, checkPermission } from '../../Infraestructura/middlewares/authMiddleware.js';

const router = express.Router();

router.get('/logs', checkAuth, checkRole(['admin']), checkPermission(['view_audit_logs', 'all']), auditControllers.getAuditLogs);

export default router;
