import http from "http";
import app from "./app.js";
import socketServer from "./Socket/socketServer.js";
import { Server } from "socket.io";
import logger from './Infraestructura/utils/logger.js';

// Crear HTTP server
const server = http.createServer(app);

// Inicializar socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Pasar servidor al módulo del socket
socketServer(io);

const PORT = process.env.PORT || 4000;

// Levantar servidor HTTP + Socket.IO
server.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
});
