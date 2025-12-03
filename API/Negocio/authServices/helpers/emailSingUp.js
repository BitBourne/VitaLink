import nodemailer from 'nodemailer';

const emailSingUp = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        }
    });

     // Enviar email
    const { email, name, last_name, token } = data;

    // const info = await transport.sendMail({
    //     // Configura el mail
    //     from: "VitaLink",
    //     to: email,
    //     subject: 'Comprueba tu cuenta en APV',
    //     text: 'Comprueba tu cuenta en APV',
    //     html: ` <p>Hola: ${name}, cmprueba tu cuenta en APV</p>
    //         <p>Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href="/confirmar/${token}">Comprobar Cuenta</a> </p>
    //         <p>Si tu no create esta cuenta puedes ignorar este mensaje</p>
    //     `
    // });

    const info = await transport.sendMail({
        from: '"VitaLink" <no-reply@vitalink.com>', // el nombre visible será VitaLink
        to: email,
        subject: 'Código de verificación de cuenta | VitaLink',
        text: `Hola ${name} ${last_name}, gracias por registrarte en VitaLink. Tu código de verificación es: ${token}`,
        html: `
            <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                    <h2 style="color: #0056b3; text-align: center;">Bienvenido a VitaLink</h2>
                    <p style="font-size: 16px; color: #333;">
                        Hola <strong>${name} ${last_name}</strong>,
                    </p>
                    <p style="font-size: 16px; color: #333;">
                        Gracias por registrarte en <strong>VitaLink</strong>. Para completar la verificación de tu cuenta, por favor introduce el siguiente código en la aplicación:
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #0056b3;">${token}</span>
                    </div>
                    <p style="font-size: 15px; color: #555;">
                        Si tú no realizaste este registro, puedes ignorar este mensaje de forma segura.
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

    console.log('mensaje enviado: %s', info.messageId);
}

export default emailSingUp;