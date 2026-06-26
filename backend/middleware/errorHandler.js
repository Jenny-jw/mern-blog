import { logRequestError } from "../utils/safeLogger.js";

const errorHandler = (err, req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }

  if (err.code === "EBADCSRFTOKEN") {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  const statusCode = Number.isInteger(err?.statusCode) ? err.statusCode : 500;
  const safeMessage =
    statusCode >= 500 ? "Internal server error" : err?.message || "Request failed";

  if (statusCode >= 500) {
    logRequestError(req, err);
  }

  return res.status(statusCode).json({ error: safeMessage });
};

export default errorHandler;
