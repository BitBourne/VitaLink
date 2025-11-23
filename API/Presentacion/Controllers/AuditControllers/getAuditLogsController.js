// getAuditLogsController.js
import getAuditLogsService from "../../../Negocio/auditServices/getAuditLogsService.js";

const getAuditLogsController = async (req, res, next) => {
    try {
        const { userId, resourceType, offset, limit } = req.query;

        const logs = await getAuditLogsService({
            userId: userId ? parseInt(userId) : undefined,
            resourceType,
            offset: offset ? parseInt(offset) : 0,
            limit: limit ? parseInt(limit) : 50,
        });

        res.status(200).json({
            success: true,
            count: logs.length,
            logs,
        });
    } catch (error) {
        next(error);
    }
};

export default getAuditLogsController;
