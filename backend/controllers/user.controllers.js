import User from "../models/user.model.js";
export const getUsersForSidebar = async(req,res)=>{
        try {
                const loggedInUserId = req.user._id
                const filteredUser  = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
                res.status(200).json(filteredUser);
        } catch (error) {
                console.error("Error in getuserForSidebar",error.message);
                res.status(500).json({error:"Internal Server Error"});
        }
}

// Update profile (name, username)
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { firstName, lastName, username } = req.body;
        if (!firstName || !lastName || !username) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Check if username is unique
        const existing = await User.findOne({ username, _id: { $ne: userId } });
        if (existing) {
            return res.status(400).json({ error: "Username already taken" });
        }
        const user = await User.findByIdAndUpdate(userId, { firstName, lastName, username }, { new: true }).select("-password");
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Change password
import bcrypt from "bcryptjs";
export const changePassword = async (req, res) => {
    try {
        const userId = req.user._id;
        const { oldPassword, newPassword, confirmPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        const user = await User.findById(userId);
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        user.confirmPassword = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete user account
export const deleteUser = async (req, res) => {
    try {
        const userId = req.user._id;
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};