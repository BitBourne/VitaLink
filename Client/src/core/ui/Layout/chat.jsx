import { useEffect, useState } from "react";
import React from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Chat({ userId, doctorId, patientId, conversationId }) {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const otherUserId = userId === patientId ? doctorId : patientId;

  useEffect(() => {

    //  Conectar el usuario al socket
    socket.emit("user:connect", userId);

    // Cargar mensajes históricos de la conversación
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token"); // si usas auth
        const res = await fetch(
          `http://localhost:4000/api/chats/conversations/${conversationId}/messages`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

setMessages(
  data.map((m) => ({
    ...m,
    isMine: m.sender_id === userId,
  }))
);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      }
    };
    fetchMessages();

    // Escuchar usuarios online
    socket.on("users:online", (users) => setOnlineUsers(users));

    // Escuchar mensajes en tiempo real
    socket.on("receive_message", (data) => {
      setMessages((prev) => [
        ...prev,
        { ...data, isMine: data.sender_id === userId },
      ]);
    });

    // Cleanup
    return () => {
      socket.off("users:online");
      socket.off("receive_message");
    };
  }, [conversationId, userId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const messagePayload = {
      conversation_id: conversationId,
      sender_id: userId,
      receiver_id: otherUserId,
      message: message,
    };

    console.log("Enviando mensaje:", messagePayload);

    socket.emit("send_message", messagePayload);

    setMessages((prev) => [
      ...prev,
      { sender_id: userId, message, isMine: true },
    ]);

    setMessage("");
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-bold mb-3">Chat con tu doctor/paciente</h2>

      <div className="h-80 overflow-y-auto mb-3 p-2 border rounded">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded mb-2 w-fit ${
              msg.isMine ? "bg-blue-500 text-white ml-auto" : "bg-gray-200"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
        />
        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={sendMessage}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
