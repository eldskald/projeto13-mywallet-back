import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectDatabase } from './db.js';
import router from './router.js';

dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;

const server = express();
server.use(express.json());
server.use(cors());

connectDatabase();

server.use(router);

server.listen(SERVER_PORT, () => {
    console.log(`Server listening at ${SERVER_PORT}`);
})
