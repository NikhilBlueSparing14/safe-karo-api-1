import express from "express";
import {
    createUserProfile,
    getUserProfileById,
    updateUserProfile,
    deleteUserProfile,
    getAllUserProfiles,
    getUserProfilesByRole,
    checkEmailExists
} from "../../controller/adminController/userProfileController.js";

import logActivity from '../../middlewares/logActivity.js';
const router = express.Router();

// User profile routes
router.post("/",logActivity, createUserProfile);
router.get("/byRole",logActivity, getUserProfilesByRole);
router.get("/",logActivity, getAllUserProfiles);
router.get('/check-email',logActivity,checkEmailExists); 
router.get("/:id", logActivity,getUserProfileById);
router.put("/:id", logActivity,updateUserProfile);
router.delete("/:id",logActivity, deleteUserProfile);

export default router;
