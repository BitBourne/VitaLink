import nodemailer from 'nodemailer';

const sendAppointmentEmail = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { type, patientEmail, doctorEmail, patientName, doctorName, date, time, reason, meeting_link } = data;

    let subject = '';
    let htmlContent = '';

    const commonStyles = `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
                <h2 style="color: #0056b3; text-align: center;">VitaLink - Citas Médicas</h2>
    `;

    const footer = `
                <hr style="border: none; border-top: 1px solid #ddd; margin: 25px 0;">
                <p style="font-size: 13px; color: #999; text-align: center;">
                    Este es un mensaje automático. Por favor, no respondas a este correo.<br>
                    © ${new Date().getFullYear()} VitaLink. Todos los derechos reservados.
                </p>
            </div>
        </div>
    `;

    switch (type) {
        case 'created':
            subject = 'Nueva Cita Agendada | VitaLink';
            htmlContent = `
                ${commonStyles}
                <p>Hola <strong>${patientName}</strong>,</p>
                <p>Tu cita ha sido agendada exitosamente y está <strong>pendiente de confirmación</strong> por el doctor.</p>
                <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Doctor:</strong> ${doctorName}</p>
                    <p><strong>Fecha:</strong> ${date}</p>
                    <p><strong>Hora:</strong> ${time}</p>
                    <p><strong>Motivo:</strong> ${reason}</p>
                </div>
                <p>Recibirás un correo cuando el doctor confirme tu cita.</p>
                ${footer}
            `;
            break;

        case 'confirmed':
            subject = 'Cita Confirmada | VitaLink';
            htmlContent = `
                ${commonStyles}
                <p>Hola <strong>${patientName}</strong>,</p>
                <p>¡Buenas noticias! Tu cita con el <strong>Dr. ${doctorName}</strong> ha sido <strong>CONFIRMADA</strong>.</p>
                <div style="background-color: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Fecha:</strong> ${date}</p>
                    <p><strong>Hora:</strong> ${time}</p>
                    ${meeting_link ? `<p><strong>Link de Videollamada:</strong> <a href="${meeting_link}">${meeting_link}</a></p>` : ''}
                </div>
                <p>Por favor, intenta llegar 10 minutos antes.</p>
                ${footer}
            `;
            break;

        case 'cancelled':
            subject = 'Cita Cancelada | VitaLink';
            htmlContent = `
                ${commonStyles}
                <p>Hola <strong>${patientName}</strong>,</p>
                <p>Te informamos que tu cita con el <strong>Dr. ${doctorName}</strong> ha sido <strong>CANCELADA</strong>.</p>
                <div style="background-color: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <p><strong>Fecha original:</strong> ${date}</p>
                    <p><strong>Hora original:</strong> ${time}</p>
                </div>
                <p>Si esto fue un error o deseas reagendar, por favor visita nuestra plataforma.</p>
                ${footer}
            `;
            break;

        case 'completed':
            subject = 'Cita Completada | VitaLink';
            htmlContent = `
                ${commonStyles}
                <p>Hola <strong>${patientName}</strong>,</p>
                <p>Tu cita con el <strong>Dr. ${doctorName}</strong> ha sido marcada como <strong>COMPLETADA</strong>.</p>
                <p>Esperamos que hayas tenido una excelente atención. Te invitamos a dejar una reseña sobre tu experiencia.</p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="http://localhost:5173/reviews/new" style="background-color: #0056b3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Dejar Reseña</a>
                </div>
                ${footer}
            `;
            break;

        default:
            return;
    }

    // Send to patient
    await transport.sendMail({
        from: '"VitaLink Citas" <appointments@vitalink.com>',
        to: patientEmail,
        subject: subject,
        html: htmlContent
    });

    // Optionally send to doctor (simplified for now, mostly for 'created' and 'cancelled')
    if (doctorEmail && (type === 'created' || type === 'cancelled')) {
        const doctorSubject = type === 'created' ? 'Nueva Cita Recibida' : 'Cita Cancelada';
        const doctorHtml = `
            ${commonStyles}
            <p>Hola Dr. ${doctorName},</p>
            <p>${type === 'created' ? 'Tienes una nueva solicitud de cita.' : 'Una cita ha sido cancelada.'}</p>
            <div style="background-color: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Paciente:</strong> ${patientName}</p>
                <p><strong>Fecha:</strong> ${date}</p>
                <p><strong>Hora:</strong> ${time}</p>
                <p><strong>Motivo:</strong> ${reason}</p>
            </div>
            ${footer}
        `;

        await transport.sendMail({
            from: '"VitaLink System" <system@vitalink.com>',
            to: doctorEmail,
            subject: doctorSubject,
            html: doctorHtml
        });
    }

    console.log(`Email de cita (${type}) enviado a ${patientEmail}`);
};

export default sendAppointmentEmail;
