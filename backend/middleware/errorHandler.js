const errorHandler = (err, req, res, _next) => {
  if (res.headersSent) {
    return;
  }

  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }

  const statusCode = Number.isInteger(err?.statusCode) ? err.statusCode : 500;
  const safeMessage =
    statusCode >= 500 ? "Internal server error" : err?.message || "Request failed";

  if (statusCode >= 500) {
    console.error("[api] unhandled error", {
      method: req.method,
      path: req.originalUrl,
      name: err?.name,
      code: err?.code,
      message: err?.message,
    });
  }

  return res.status(statusCode).json({ error: safeMessage });
};

export default errorHandler;
