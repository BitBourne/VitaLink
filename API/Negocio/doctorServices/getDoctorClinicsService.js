import DoctorClinicDAO from '../../Datos/DAOs/DoctorClinicDAO.js';

const getDoctorClinicsService = async (doctorProfileId) => {
    const doctorClinicDAO = new DoctorClinicDAO();

    const clinics = await doctorClinicDAO.getClinicsByDoctor(doctorProfileId);

    return clinics.map(dc => ({
        id: dc.DC_clinic.id,
        name: dc.DC_clinic.name,
        address: dc.DC_clinic.address,
        phone: dc.DC_clinic.phone
    }));
};

export default getDoctorClinicsService;
