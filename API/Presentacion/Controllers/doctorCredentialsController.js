import updateDoctorCredentials from '../../Negocio/DoctorServices/updateDoctorCredentials.js';
import verifyDoctorCredentials from '../../Negocio/DoctorServices/verifyDoctorCredentials.js';
import getDoctorCredentialStatus from '../../Negocio/DoctorServices/getDoctorCredentialStatus.js';

const updateCredentials = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { medical_license_number, cedula_profesional } = req.body;

        const result = await updateDoctorCredentials(userId, {
            medical_license_number,
            cedula_profesional
        });

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const verifyCredentials = async (req, res, next) => {
    try {
        const { doctorProfileId } = req.params;
        const verificationData = req.body;
        const adminId = req.user.id;

        const result = await verifyDoctorCredentials(
            parseInt(doctorProfileId),
            verificationData,
            adminId
        );

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

const getCredentialStatus = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const result = await getDoctorCredentialStatus(userId);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

export { updateCredentials, verifyCredentials, getCredentialStatus };
