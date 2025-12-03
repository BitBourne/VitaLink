import * as utils from '../../Infraestructura/utils/index.js'
import UserDAO from '../../Datos/DAOs/UserDAO.js';
import UserPermissionDAO from '../../Datos/DAOs/UserPermissionDAO.js';
import UserRolesDAO from '../../Datos/DAOs/UserRoleDAO.js'
import DoctorProfileDAO from '../../Datos/DAOs/DoctorProfileDAO.js';
import generate6DigitToken from './helpers/generate6DigitToken.js';
import emailSingUp from './helpers/emailSingUp.js';
import hashPassword from './helpers/hashPassword.js';
import validateMedicalLicense from './helpers/validateMedicalLicense.js';
import validateCedulaProfesional from './helpers/validateCedulaProfesional.js';

const signUpService = async (signUpDTO) => {
    const { name, last_name, email, password, roleId, permId, medical_license_number, cedula_profesional, files } = signUpDTO;

    const userDAO = new UserDAO();
    const userPermissionDAO = new UserPermissionDAO();
    const userRolesDAO = new UserRolesDAO();

    if (!name || !last_name || !email || !password) {
        const error = new Error('Todos los campos son obligatorios');
        error.statusCode = 400;
        throw error;
    }

    if (!utils.isValidEmail(email)) {
        const error = new Error('El email no es valido');
        error.statusCode = 400;
        throw error;
    }

    // Minimum 6 characters required for security
    if (password.length < 6) {
        const error = new Error('La contraseña debe tener al menos 6 caracteres');
        error.statusCode = 400;
        throw error;
    }

    // roleId === 2 is doctor role
    if (roleId === 2 || (!roleId && permId === 11)) {
        // Validar números de credenciales
        if (medical_license_number && !validateMedicalLicense(medical_license_number)) {
            const error = new Error('El número de licencia médica no es válido. Debe tener entre 6-12 caracteres alfanuméricos.');
            error.statusCode = 400;
            throw error;
        }

        if (cedula_profesional && !validateCedulaProfesional(cedula_profesional)) {
            const error = new Error('La cédula profesional no es válida. Debe tener 7-8 dígitos.');
            error.statusCode = 400;
            throw error;
        }

        // Validar que se hayan subido los documentos obligatorios
        if (!files || !files.medical_license_document || !files.medical_license_document[0]) {
            const error = new Error('Debes subir el documento de licencia médica.');
            error.statusCode = 400;
            throw error;
        }

        if (!files || !files.cedula_document || !files.cedula_document[0]) {
            const error = new Error('Debes subir el documento de cédula profesional.');
            error.statusCode = 400;
            throw error;
        }
    }

    const userExist = await userDAO.findOne({ email });
    if (userExist) {
        const error = new Error('Este usuario ya existe');
        error.statusCode = 400;
        throw error;
    }

    try {
        const hashedPassword = await hashPassword(password);

        const usuario = await userDAO.create({
            name,
            last_name,
            email,
            password: hashedPassword,
            token: generate6DigitToken()
        });

        const roleDefualt = roleId || 2;
        await userRolesDAO.create({
            user_id: usuario.id,
            role_id: roleDefualt
        });

        let permissionDefault = permId;
        if (!permId) {
            if (roleDefualt === 1) {
                permissionDefault = 1;
            } else if (roleDefualt === 2) {
                permissionDefault = 11;
            } else if (roleDefualt === 3) {
                permissionDefault = 9;
            }
        }

        if (permissionDefault) {
            await userPermissionDAO.create({
                user_id: usuario.id,
                permission_id: permissionDefault
            });
        }

        if (roleDefualt === 2) {
            const doctorProfileDAO = new DoctorProfileDAO();

            // Construir URLs de documentos
            const baseUrl = '/uploads/doctor-credentials/';
            const medicalLicenseUrl = files?.medical_license_document?.[0]
                ? baseUrl + files.medical_license_document[0].filename
                : null;
            const cedulaUrl = files?.cedula_document?.[0]
                ? baseUrl + files.cedula_document[0].filename
                : null;

            // URLs de documentos adicionales (opcional)
            const additionalUrls = files?.additional_documents
                ? files.additional_documents.map(file => baseUrl + file.filename)
                : null;

            await doctorProfileDAO.create({
                user_id: usuario.id,
                is_active: true,
                medical_license_number: medical_license_number || null,
                cedula_profesional: cedula_profesional || null,
                license_verified: false,
                cedula_verified: false,
                medical_license_document_url: medicalLicenseUrl,
                cedula_document_url: cedulaUrl,
                additional_documents_urls: additionalUrls,
                verification_status: 'under_review'
            });
        }

        // Email sending is non-critical, user creation should succeed even if email fails
        try {
            await emailSingUp({ name, last_name, email, token: usuario.token });
        } catch (emailError) {
            console.error('Error enviando email (no crítico):', emailError.message);
        }

        return 'Hemos enviado un email de verificacion a tu correo.';

    } catch (error) {
        console.error('Error in signUpService.js: ', error);
        const serviceError = new Error('Ocurrió un error al crear la cuenta.');
        serviceError.statusCode = 500;
        throw serviceError;
    }
};

export default signUpService;