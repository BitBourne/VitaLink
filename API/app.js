// Dependences
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Custom modules
import db from './Infraestructura/config/db.js';
import routes from './Presentacion/Routes/index.js';
import ErrorHandling from './Infraestructura/middlewares/errorHandling.js';

// Init express server
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Enviroment variables config
dotenv.config();

// Connect to database
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error));

// Sync models
// import User from './Datos/Models/User.js';
// db.sync({ alter: true })
//   .then(() => console.log('Database & tables synced'))
//   .catch(err => console.log(err));

// Routing
app.use('/api', routes); 

// Error Handling
app.use(ErrorHandling);

// PORT assignment
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening in port http://localhost:${PORT}`)
});
