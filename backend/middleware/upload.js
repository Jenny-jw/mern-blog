import multer from "multer";

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (ALLOWED_MIME_TYPES.has(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Invalid file type"));
  },
});

export const handleImageUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ error: "File exceeds 5MB limit" });
      }
      return res.status(400).json({ error: "Upload failed" });
    }
    if (err) {
      if (err.message === "Invalid file type") {
        return res.status(400).json({ error: "Invalid file type" });
      }
      return res.status(400).json({ error: "Upload failed" });
    }
    next();
  });
};
