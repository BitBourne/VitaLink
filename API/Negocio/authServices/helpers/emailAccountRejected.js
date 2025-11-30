import nodemailer from 'nodemailer';

/**
 * Envía email notificando que la cuenta ha sido rechazada
 * @param {object} data - Datos del doctor
 * @param {string} data.name - Nombre del doctor
 * @param {string} data.last_name - Apellido del doctor
 * @param {string} data.email - Email del doctor
 * @param {string} data.verification_notes - Razón del rechazo
 */
const emailAccountRejected = async (data) => {
    const { name, last_name, email, verification_notes } = data;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const supportEmail = process.env.SUPPORT_EMAIL || 'soporte@vitalink.com';

    const mailOptions = {
        from: `"VitaLink" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Actualización sobre tu solicitud - VitaLink',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
                    .reason-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
                    .next-steps { background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .contact-info { background: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>⚠️ Actualización de tu Solicitud</h1>
                    </div>
                    <div class="content">
                        <p>Hola <strong>Dr. ${name} ${last_name}</strong>,</p>
                        
                        <p>Gracias por tu interés en unirte a VitaLink. Hemos revisado tu solicitud y los documentos proporcionados.</p>
                        
                        <div class="warning-box">
                            <strong>⚠️ Estado de tu solicitud:</strong> Requiere correcciones
                        </div>
                        
                        <div class="reason-box">
                            <p><strong>Motivo:</strong></p>
                            <p>${verification_notes || 'Los documentos proporcionados no cumplen con nuestros requisitos de verificación.'}</p>
                        </div>
                        
                        <div class="next-steps">
                            <p><strong>📋 Próximos pasos:</strong></p>
                            <ol>
                                <li>Revisa el motivo del rechazo mencionado arriba</li>
                                <li>Corrige o actualiza los documentos necesarios</li>
                                <li>Contacta a nuestro equipo de soporte para más información</li>
                                <li>Si corresponde, podrás volver a aplicar con documentos actualizados</li>
                            </ol>
                        </div>
                        
                        <div class="contact-info">
                            <p><strong>¿Necesitas ayuda?</strong></p>
                            <p>Contacta a nuestro equipo de soporte:</p>
                            <p>📧 <a href="mailto:${supportEmail}">${supportEmail}</a></p>
                        </div>
                        
                        <p>Estamos aquí para ayudarte a resolver cualquier inconveniente. No dudes en contactarnos si tienes preguntas sobre el proceso de verificación.</p>
                        
                        <p>Saludos,<br><strong>Equipo VitaLink</strong></p>
                        
                        <div class="footer">
                            <p>Este es un email automático, por favor no respondas a este mensaje.</p>
                            <p>Para consultas, escribe a ${supportEmail}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    await transporter.sendMail(mailOptions);
};

export default emailAccountRejected;
