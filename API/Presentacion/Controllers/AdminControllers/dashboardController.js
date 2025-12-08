import { getDashboardStatsService, getRecentActivityService } from "../../../Negocio/AdminServices/dashboardService.js";

/**
 * Controlador para obtener estadísticas consolidadas del dashboard
 * GET /api/admin/dashboard/stats
 */
export const getDashboardStatsCtrlr = async (req, res, next) => {
    try {
        const stats = await getDashboardStatsService();

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error en getDashboardStatsCtrlr:', error);
        next(error);
    }
};

/**
 * Controlador para obtener actividad reciente del sistema
 * GET /api/admin/dashboard/recent-activity
 */
export const getRecentActivityCtrlr = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const activities = await getRecentActivityService(limit);

        res.status(200).json({
            success: true,
            data: activities
        });
    } catch (error) {
        console.error('Error en getRecentActivityCtrlr:', error);
        next(error);
    }
};