import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import { io } from "../socket/socket.js";
export const signup = async (req,res)=>{
        try{
            const {firstName, lastName, username, password, confirmPassword, gender} = req.body;
            if (!firstName || !lastName || !username || !password || !confirmPassword || !gender) {
                return res.status(400).json({error: "All fields are required"});
            }
            if(password !== confirmPassword){
                return res.status(400).json({error:"Passwords do not match"});
            }
            const user = await User.findOne({username});
            if(user){
                return res.status(400).json({error:"Username already exists"});
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
            const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
            const newUser = new User({
                firstName,
                lastName,
                username,
                password: hashedPassword,
                confirmPassword: hashedPassword,
                gender,
                profilePic: gender === "Male" ? boyProfilePic : girlProfilePic
            });
            if(newUser){
                generateTokenAndSetCookie(newUser._id,res);
                await newUser.save();
                // Notify other connected users (except the new one) that a user list update is needed
                io.emit("user:created", {
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username,
                    profilePic: newUser.profilePic
                });
                res.status(201).json({
                    _id: newUser._id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    username: newUser.username,
                    profilePic: newUser.profilePic,
                });
            } else {
                res.status(400).json({error:"Invalid user data"});
            }
        } catch(error){
            console.log("error in signup controller",error.message)
            res.status(500).json({error:"Internal Server Error"});
        }
    };
    

export const login = async(req,res)=>{
    try {
        const{username,password}=req.body;
        const user =await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error:"Invalid username or password"});
        }
        generateTokenAndSetCookie(user._id,res);
        res.status(200).json({
            _id:user._id,
            firstName:user.firstName,
            lastName:user.lastName,
            username:user.username,
            profilePic:user.profilePic
        });
    } catch (error) {
        console.log("error in login controller",error.message)
         res.status(500).json({error:"Internal Server Error"});
    }
}
export const logout = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out Successfully"})
    } catch (error) {
        console.log("error in logout controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}