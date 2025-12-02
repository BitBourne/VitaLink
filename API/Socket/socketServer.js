import Role from '../Datos/Models/Role.js';
import User from '../Datos/Models/User.js'
import MessageDAO from "../Datos/DAOs/Chats/MessagesDAO.js";


const onlineUsers = new Map();

export default function socketServer(io) {

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);






socket.on("user:connect", async (userId) => {
  const user = await User.findOne({
    where: { id: userId },
    attributes: ["id", "name"],
    include: [
      {
        model: Role,
        as: "U_roles",
        attributes: ["name"]
      }
    ]
  });

  if (!user) return;

  onlineUsers.set(socket.id, {
    socketId: socket.id,  
    id: user.id,
    name: user.name,
    role: user.U_roles.map(r => r.name),
  });

  io.emit("users:online", Array.from(onlineUsers.values()));
});




  console.log("Usuarios en Map:", Array.from(onlineUsers.values())); 

  io.emit("users:online", Array.from(onlineUsers.values()));





const messageDAO = new MessageDAO();

socket.on("send_message", async ({ conversation_id, sender_id, receiver_id, message  }) => {
    
    
    if (!message || !conversation_id || !sender_id || !receiver_id) {
        console.log("Mensaje inválido:", { conversation_id, sender_id, receiver_id, message  });
        return; // no hacer nada si falta info
    }
    const savedMessage = await messageDAO.createMessage(
        conversation_id,
        sender_id,
        receiver_id,
        message 
    );

    const receiverSocket = [...onlineUsers.values()].find(u => u.id === receiver_id);

    if (receiverSocket) {
        io.to(receiverSocket.socketId).emit("receive_message", savedMessage);
    }

    socket.emit("message_saved", savedMessage);
});









    // Cuando se desconecta
socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);

      io.emit("users:disconnect", Array.from(onlineUsers.values()));

      console.log("Cliente desconectado:", socket.id);
    });








})};
