import express from 'express';


import { login } from '../Controllers/LogInControllers.js';



const router = express.Router();

// Controllers
router.route('/login').
                    get(login);





export default router;