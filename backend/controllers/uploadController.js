import { logRouteError } from "../utils/safeLogger.js";
import * as uploadService from "../services/uploadService.js";

const ROUTE = "upload";

export const uploadImage = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const result = await uploadService.uploadImage(req.file.buffer);
    res.json(result);
  } catch (err) {
    logRouteError(ROUTE, "cloudinary upload failed", err, {
      mimeType: req.file?.mimetype,
      fileSize: req.file?.size,
    });
    next(err);
  }
};
