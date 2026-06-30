import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { handleImageUpload } from "../middleware/upload.js";
import * as uploadController from "../controllers/uploadController.js";

const router = express.Router();

router.post("/", verifyToken, handleImageUpload, uploadController.uploadImage);

export default router;
