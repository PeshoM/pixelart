import express, { Express } from 'express';
import cors from 'cors';
import { Server } from "socket.io";
import { createServer } from "http";

const app: Express = express();
const port = process.env.PORT || 8000;

const httpServer = createServer();
app.use(cors({ origin: "*" }));

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('board-update', (updatedBoard) => {
        socket.broadcast.emit('board-update', updatedBoard);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

httpServer.listen(port, () => {
    console.log("server is running on", port);
});
