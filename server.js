import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

export const app = express();
app.use(cors({
    origin: '*'
}));
export const server = http.createServer(app);
export const io = new Server(server,
    {
        cors: {
            origin: '*'
        }
    }
)

app.use(express.json());

