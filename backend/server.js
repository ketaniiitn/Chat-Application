import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import conversationRoutes from './routes/conversation.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Correctly define __dirname for ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);
app.use("/api/conversations", conversationRoutes);


// --------- DEPLOYMENT ---------
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // This is the corrected line
    app.get("/*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
}
// --------- DEPLOYMENT ---------


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${PORT} 🚀`);
});

