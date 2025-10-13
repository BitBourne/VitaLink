import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import authRoutes from './Presentacion/Router/authRoutes.js';

const app = express();

// Middleware
app.use(bodyParser.json());



// Routing
app.use('/api/auth', authRoutes);








// PORT asigment
const PORT = process.env.PORT || 4000;

// Run server
app.listen(PORT, () => {
    console.log(`Server listening in port http://localhost:${PORT}`)
});

