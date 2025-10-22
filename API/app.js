// Dependences
import express from 'express';
import dotenv from 'dotenv';


// Custom modules
import db from './Infraestructura/config/db.js';
import authRoutes from './Presentacion/Router/authRoutes.js';
import ErrorHandling from './Infraestructura/middlewares/errorHandling.js';

// Init express server
const app = express();

app.use(express.json()); // body parser to JSON

// Enviroment variables config
dotenv.config();

// Connect to database
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error));







// Routing
app.use('/api/auth', authRoutes);

// Error Handling
app.use(ErrorHandling);







// PORT asigment
const PORT = process.env.PORT || 4000;

// Run server
app.listen(PORT, () => {
    console.log(`Server listening in port http://localhost:${PORT}`)
});

