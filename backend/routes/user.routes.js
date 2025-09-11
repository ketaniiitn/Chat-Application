
import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
	getUsersForSidebar,
	updateProfile,
	changePassword,
	deleteUser
} from "../controllers/user.controllers.js";

const router = express.Router();
router.get("/", protectRoute, getUsersForSidebar);
router.put("/update", protectRoute, updateProfile);
router.put("/password", protectRoute, changePassword);
router.delete("/delete", protectRoute, deleteUser);

export default router;