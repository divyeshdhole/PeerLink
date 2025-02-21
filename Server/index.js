const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Frontend origin
        methods: ["GET", "POST"],
    },
});

// Store meetings and code data
let meetings = {}; // Format: { meetingCode: [{ name, id }, ...] }
let meetingCodes = {}; // Format: { meetingCode: lastKnownCode }
// Handle socket connections
io.on("connection", (socket) => {
    console.log("A user connected " + socket.id);

    // Listen for a user joining a meeting
    socket.on("join", ({ userName, meetingCode }) => {
        if (!meetings[meetingCode]) {
            meetings[meetingCode] = [];
            meetingCodes[meetingCode] = ""; // Initialize code if meeting is new
        }

        const user = { name: userName, id: socket.id };
        meetings[meetingCode].push(user);
        socket.join(meetingCode);
        console.log(`${userName} joined meeting ${meetingCode}`);

        // Sync last known code with the new user
        io.to(socket.id).emit("codeUpdate", { code: meetingCodes[meetingCode] });

        // Emit the updated list of users for the meeting
        io.to(meetingCode).emit("updateUsers", [...meetings[meetingCode]]);
    });

    // Handle code change events
    socket.on("codeChange", ({ meetingCode, code }) => {
        console.log(`Code changed in meeting ${meetingCode}`);
        meetingCodes[meetingCode] = code; // Update last known code
        socket.in(meetingCode).emit("codeUpdate", { code });
    });

    // Handle chat messages
    socket.on("chatMessage", ({ meetingCode, message }) => {
        console.log(`Chat message received in meeting ${meetingCode}: ${message}`);
        io.to(meetingCode).emit("newMessage", { message });
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        for (let meetingCode in meetings) {
            const updatedUsers = meetings[meetingCode].filter(
                (user) => user.id !== socket.id
            );
            meetings[meetingCode] = updatedUsers;
            io.to(meetingCode).emit("updateUsers", [...updatedUsers]);
        }
        console.log("A user disconnected");
    });
});

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
