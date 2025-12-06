import nodemailer from 'nodemailer';

// Configuración del transporte (reutilizable)
const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
    }
});

/**
 * Send an email to reset the password
 */
const emailResetPassword = async (data) => {
    const { email, name, last_name, token } = data; // Asumimos que 'name' está disponible

    const info = await transport.sendMail({
        from: '"VitaLink" <no-reply@vitalink.com>',
        to: email,
        subject: 'Restablece tu Contraseña | VitaLink', 
        text: `Hola ${name} ${last_name}, has solicitado restablecer tu contraseña. Sigue el enlace: ${process.env.CLIENT_URL}/olvide-password/${token}`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                    <h2 style="color: #0056b3; text-align: center;">Restablecer Contraseña</h2>
                    <p style="font-size: 16px; color: #333;">
                        Hola <strong>${name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Has solicitado restablecer tu contraseña en <strong>VitaLink</strong>. Por favor, haz clic en el siguiente botón para crear una nueva contraseña:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.REACT_WEB_CLIENT}/auth/forgot-password/${token}" style="background-color: #0056b3; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                            Restablecer Contraseña
                        </a>
                    </div>
                    <p style="font-size: 15px; color: #555;">
                        Si tú no solicitaste este cambio, puedes ignorar este mensaje de forma segura.
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">
                    <p style="font-size: 13px; color: #999; text-align: center;">
                        Este es un mensaje automático. Por favor, no respondas a este correo.<br>
                        © ${new Date().getFullYear()} VitaLink. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        `
    });

    console.log('Mensaje de restablecimiento enviado: %s', info.messageId);
}

// Exportamos ambas funciones
export default emailResetPassword;