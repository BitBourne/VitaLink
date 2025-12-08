import getAuditLogsService from "../../../Negocio/auditServices/getAuditLogsService.js";

const getAuditLogsController = async (req, res, next) => {
    try {
        const {
            userId,
            user,
            action,
            dateFrom,
            dateTo,
            ip,
            page = 1,
            limit = 20
        } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const offset = (pageNum - 1) * limitNum;

        const result = await getAuditLogsService({
            userId: userId ? parseInt(userId) : undefined,
            user,
            action,
            dateFrom,
            dateTo,
            ip,
            offset,
            limit: limitNum,
        });

        res.status(200).json({
            data: result.logs,
            meta: {
                total: result.total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(result.total / limitNum)
            }
        });
    } catch (error) {
        console.error('Error in getAuditLogsController:', error);
        res.status(500).json({ message: 'Error al obtener logs de auditoría' });
    }
};

export default getAuditLogsController;