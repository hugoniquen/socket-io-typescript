import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import {Server as SocketIOServer, Socket } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { dot } from 'node:test/reporters';

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
    cors:{
        origin:"http://127.0.0.1:5500",
        methods:['GET', 'POST']
    }
});

// TODO: registros por terminar
app.use(cors());

io.on('connection', (socket: Socket)=>{
    console.log('a user connected');

    // Evento personalizado -manejar el registro a una sala
    socket.on('join room', (room)=>{
        socket.join(room);
        console.log(`User joined room: ${room}`);
    });    
    
    socket.on('chat message', (msg)=>{
        io.emit('chat message', msg);
    })

    socket.on('disconnect', ()=>{
        console.log('a user desconectado');
    })
    
});

server.listen(3000, ()=>{
    console.log('Escuchando en el puerto 3000');
})