import path from "path"
import express from "express"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import cookieParser from "cookie-parser"
import {app,server} from "./socket/socket.js"
dotenv.config();
// const app=express();
const PORT= process.env.PORT || 5000;
const __dirname=path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
app.use("/api/user",userRoutes);
app.use(express.static(path.join(__dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
     res.send(path.join(__dirname,"/frontend","dist","index.html"))
});

server.listen(PORT,()=>{ 
     connectToMongoDB();
     console.log(`Server running on the port ${PORT}`);
});