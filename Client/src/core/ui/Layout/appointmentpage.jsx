import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Chat from "./chat";
import useAuth from "../../../features/auth/hooks/useAuth";

export default function AppointmentPage() {

    const { id } = useParams();
    const { user } = useAuth(); // trae user.id del logeado

    const [appointment, setAppointment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAppointment = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(`http://localhost:4000/api/appointments/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                const json = await res.json();
                setAppointment(json.appointment);

            } catch (error) {
                console.error("Error:", error);
                setError("No se pudo cargar la información de la cita");
            }
        };

        fetchAppointment();

    }, [id]);

    if (error) return <p>{error}</p>;
    if (!appointment) return <p>Cargando...</p>;

    console.log(appointment);
    return (
        <div>
            <h1>Cita #{appointment.id}</h1>

            <p><strong>Doctor:</strong> {appointment.A_doctor?.DP_user?.name}</p>
            <p><strong>Paciente:</strong> {appointment.A_patient?.name}</p>

            <Chat
                userId={user.id}              // ID del logeado
                doctorId={appointment.A_doctor.DP_user.id}
                patientId={appointment.A_patient.id}
                conversationId={appointment.conversationId}
            />

        </div>
    );
}
