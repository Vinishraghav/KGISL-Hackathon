const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // Store rooms in memory: { meetingId: [ { socketId, username, email, micOn, cameraOn } ] }
    const rooms = {};

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // 1. Join Meeting
        socket.on('join-meeting', (data) => {
            const { meetingId, username, email, micOn, cameraOn } = data;

            if (!rooms[meetingId]) {
                rooms[meetingId] = [];
            }

            const user = {
                socketId: socket.id,
                name: username || 'Anonymous User',
                email: email || 'anon@example.com',
                micOn: micOn !== undefined ? micOn : true,
                cameraOn: cameraOn !== undefined ? cameraOn : true,
                joinedAt: new Date().toISOString()
            };

            rooms[meetingId].push(user);
            socket.join(meetingId);
            console.log(`User ${user.name} joined meeting ${meetingId}`);

            // Emit participants-update to everyone in the room
            io.to(meetingId).emit('participants-update', rooms[meetingId]);
        });

        // Handle Chat Messages
        socket.on('send-message', (data) => {
            const { meetingId, text, username } = data;
            const message = {
                id: Date.now().toString(),
                socketId: socket.id,
                username: username || 'Anonymous',
                text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            io.to(meetingId).emit('receive-message', message);
        });

        // Handle Mic/Camera Toggles
        socket.on('toggle-media', (data) => {
            const { meetingId, micOn, cameraOn } = data;
            if (rooms[meetingId]) {
                const userIndex = rooms[meetingId].findIndex(p => p.socketId === socket.id);
                if (userIndex !== -1) {
                    if (micOn !== undefined) rooms[meetingId][userIndex].micOn = micOn;
                    if (cameraOn !== undefined) rooms[meetingId][userIndex].cameraOn = cameraOn;
                    io.to(meetingId).emit('participants-update', rooms[meetingId]);
                }
            }
        });

        // WebRTC Signaling
        socket.on('offer', (data) => {
            const { target, offer, caller } = data;
            console.log(`Forwarding offer from ${caller.name} to ${target}`);
            io.to(target).emit('offer', { offer, caller, from: socket.id });
        });

        socket.on('answer', (data) => {
            const { target, answer } = data;
            console.log(`Forwarding answer from ${socket.id} to ${target}`);
            io.to(target).emit('answer', { answer, from: socket.id });
        });

        socket.on('ice-candidate', (data) => {
            const { target, candidate } = data;
            io.to(target).emit('ice-candidate', { candidate, from: socket.id });
        });

        // 2. Handle User Disconnecting
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);

            for (const [mId, participants] of Object.entries(rooms)) {
                const userIndex = participants.findIndex(p => p.socketId === socket.id);

                if (userIndex !== -1) {
                    const user = participants[userIndex];
                    participants.splice(userIndex, 1);

                    socket.to(mId).emit('user-left', user);
                    io.to(mId).emit('participants-update', participants);

                    if (participants.length === 0) {
                        delete rooms[mId];
                    }
                    break;
                }
            }
        });
    });

    server.all(/.*/, (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
        console.log(`> Real-time Socket.io injected!`);
    });
});
