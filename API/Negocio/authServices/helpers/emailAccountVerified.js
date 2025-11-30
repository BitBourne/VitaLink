import nodemailer from 'nodemailer';

/**
 * Envía email notificando que la cuenta ha sido verificada y aprobada
 * @param {object} data - Datos del doctor
 * @param {string} data.name - Nombre del doctor
 * @param {string} data.last_name - Apellido del doctor
 * @param {string} data.email - Email del doctor
 */
const emailAccountVerified = async (data) => {
    const { name, last_name, email } = data;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const loginUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    const mailOptions = {
        from: `"VitaLink" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '🎉 ¡Tu cuenta ha sido verificada! - VitaLink',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .success-icon { font-size: 60px; margin: 20px 0; }
                    .cta-button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                    .cta-button:hover { opacity: 0.9; }
                    .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .feature-item { padding: 10px 0; }
                    .checkmark { color: #10b981; font-weight: bold; margin-right: 10px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="success-icon">🎉</div>
                        <h1>¡Cuenta Verificada!</h1>
                    </div>
                    <div class="content">
                        <p>¡Felicidades <strong>Dr. ${name} ${last_name}</strong>!</p>
                        
                        <p>Tu cuenta ha sido verificada exitosamente por nuestro equipo. Tus credenciales médicas han sido validadas y ahora tienes acceso completo a la plataforma VitaLink.</p>
                        
                        <div style="text-align: center;">
                            <a href="${loginUrl}/login" class="cta-button">Iniciar Sesión Ahora</a>
                        </div>
                        
                        <div class="features">
                            <p><strong>Ya puedes:</strong></p>
                            <div class="feature-item">
                                <span class="checkmark">✓</span> Configurar tu perfil profesional
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span> Gestionar tus citas médicas
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span> Atender a tus pacientes
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span> Acceder a registros médicos
                            </div>
                            <div class="feature-item">
                                <span class="checkmark">✓</span> Configurar tu disponibilidad
                            </div>
                        </div>
                        
                        <p><strong>Próximos pasos:</strong></p>
                        <ol>
                            <li>Inicia sesión en tu cuenta</li>
                            <li>Completa tu perfil profesional</li>
                            <li>Configura tu disponibilidad de horarios</li>
                            <li>¡Comienza a atender pacientes!</li>
                        </ol>
                        
                        <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
                        
                        <p>¡Bienvenido a VitaLink!</p>
                        
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

export default emailAccountVerified;
