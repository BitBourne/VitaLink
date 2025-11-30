import nodemailer from 'nodemailer';

/**
 * Envía email notificando que los documentos están en revisión
 * @param {object} data - Datos del doctor
 * @param {string} data.name - Nombre del doctor
 * @param {string} data.last_name - Apellido del doctor
 * @param {string} data.email - Email del doctor
 * @param {string} data.medical_license_number - Número de licencia médica
 * @param {string} data.cedula_profesional - Cédula profesional
 */
const emailDocumentsUnderReview = async (data) => {
    const { name, last_name, email, medical_license_number, cedula_profesional } = data;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"VitaLink" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Tus documentos están en revisión - VitaLink',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .document-list { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .document-item { padding: 10px 0; border-bottom: 1px solid #eee; }
                    .document-item:last-child { border-bottom: none; }
                    .checkmark { color: #10b981; font-weight: bold; }
                    .info-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>📋 Documentos en Revisión</h1>
                    </div>
                    <div class="content">
                        <p>Hola <strong>Dr. ${name} ${last_name}</strong>,</p>
                        
                        <p>Hemos recibido exitosamente tus documentos de credenciales:</p>
                        
                        <div class="document-list">
                            <div class="document-item">
                                <span class="checkmark">✓</span> Licencia médica: <strong>${medical_license_number}</strong>
                            </div>
                            <div class="document-item">
                                <span class="checkmark">✓</span> Cédula profesional: <strong>${cedula_profesional}</strong>
                            </div>
                        </div>
                        
                        <div class="info-box">
                            <strong>⏱️ Tiempo estimado de verificación:</strong> 24-48 horas
                        </div>
                        
                        <p>Nuestro equipo está revisando tus documentos cuidadosamente. Te notificaremos por email cuando tu cuenta esté verificada y lista para usar.</p>
                        
                        <p><strong>¿Qué sigue?</strong></p>
                        <ul>
                            <li>Nuestro equipo verificará tus credenciales</li>
                            <li>Recibirás un email de confirmación cuando estés aprobado</li>
                            <li>Podrás iniciar sesión y comenzar a usar VitaLink</li>
                        </ul>
                        
                        <p>Gracias por tu paciencia.</p>
                        
                        <p>Saludos,<br><strong>Equipo VitaLink</strong></p>
                        
                        <div class="footer">
                            <p>Este es un email automático, por favor no respondas a este mensaje.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

export default emailDocumentsUnderReview;
