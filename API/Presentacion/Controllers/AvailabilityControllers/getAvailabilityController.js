// getAvailabilityController.js
import getAvailabilityService from "../../../Negocio/availabilityServices/getAvailabilityService.js";

const getAvailabilityController = async (req, res, next) => {
    try {
        const { doctorId } = req.params;
        const { dayOfWeek } = req.query;

        const availability = await getAvailabilityService(
            parseInt(doctorId),
            dayOfWeek !== undefined ? parseInt(dayOfWeek) : null
        );

        res.status(200).json({
            success: true,
            count: availability.length,
            availability,
        });
    } catch (error) {
        next(error);
    }
};

export default getAvailabilityController;
