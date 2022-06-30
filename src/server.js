import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDatabase } from './database/mongo.js';
import { signIn, signUp } from './controllers/accountsController.js'

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;

const server = express();
server.use(express.json());
server.use(cors());

// Start mongodb
connectDatabase();

// Endpoints
server.post('/sign-in', signIn);
server.post('/sign-up', signUp);

server.listen(SERVER_PORT, () => {
    console.log(`Server listening at ${SERVER_PORT}`);
})
