/**
 * Utilidad de registro centralizada para la API de VitaLink
 * Proporciona registro estructurado con diferentes niveles y filtrado basado en el entorno
 */

const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

const COLORS = {
    DEBUG: '\x1b[36m',  // Cyan
    INFO: '\x1b[32m',   // Green
    WARN: '\x1b[33m',   // Yellow
    ERROR: '\x1b[31m',  // Red
    RESET: '\x1b[0m'
};

class Logger {
    constructor() {
        // En producción, solo mostrar WARN y ERROR
        // En desarrollo, mostrar todos los niveles
        this.currentLevel = process.env.NODE_ENV === 'production'
            ? LOG_LEVELS.WARN
            : LOG_LEVELS.DEBUG;

        // Deshabilitar colores en producción para logs más limpios
        this.useColors = process.env.NODE_ENV !== 'production';
    }

    /**
     * Formatear mensaje de log con marca de tiempo y nivel
     */
    _formatMessage(level, message, data) {
        const timestamp = new Date().toISOString();
        const color = this.useColors ? COLORS[level] : '';
        const reset = this.useColors ? COLORS.RESET : '';

        let formattedMessage = `${color}[${timestamp}] [${level}]${reset} ${message}`;

        if (data !== undefined) {
            formattedMessage += ' ' + (typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
        }

        return formattedMessage;
    }

    /**
     * Registrar información de depuración (solo desarrollo)
     */
    debug(message, data) {
        if (this.currentLevel <= LOG_LEVELS.DEBUG) {
            console.log(this._formatMessage('DEBUG', message, data));
        }
    }

    /**
     * Registrar información general
     */
    info(message, data) {
        if (this.currentLevel <= LOG_LEVELS.INFO) {
            console.log(this._formatMessage('INFO', message, data));
        }
    }

    /**
     * Registrar advertencias
     */
    warn(message, data) {
        if (this.currentLevel <= LOG_LEVELS.WARN) {
            console.warn(this._formatMessage('WARN', message, data));
        }
    }

    /**
     * Registrar errores
     */
    error(message, error) {
        if (this.currentLevel <= LOG_LEVELS.ERROR) {
            const errorData = error instanceof Error
                ? { message: error.message, stack: error.stack }
                : error;

            console.error(this._formatMessage('ERROR', message, errorData));
        }
    }
}

// Exportar instancia singleton
export default new Logger();
