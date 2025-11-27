import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../uploads/credentials');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${Date.now()}-${sanitizedName}`;
        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const allowedExtensions = /jpeg|jpg|png|pdf/;

    const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.includes(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    }

    cb(new Error('Solo se permiten archivos PDF, JPG, JPEG, PNG'));
};

export const uploadCredentials = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
        files: 5
    },
    fileFilter: fileFilter
});

export const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            const error = new Error('El archivo excede el tamaño máximo permitido de 5MB');
            error.statusCode = 400;
            return next(error);
        }
        if (err.code === 'LIMIT_FILE_COUNT') {
            const error = new Error('Se excedió el número máximo de archivos permitidos (5)');
            error.statusCode = 400;
            return next(error);
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            const error = new Error('Campo de archivo inesperado');
            error.statusCode = 400;
            return next(error);
        }
    }

    if (err) {
        const error = new Error(err.message || 'Error al procesar el archivo');
        error.statusCode = 400;
        return next(error);
    }

    next();
};

export default uploadCredentials;
