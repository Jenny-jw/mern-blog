const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "cookie",
  "cookies",
  "authorization",
  "recaptchatoken",
  "content",
  "name",
  "email",
]);

const sanitizeMetadata = (metadata) => {
  const safe = {};

  for (const [key, value] of Object.entries(metadata || {})) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) continue;
    if (value === null || value === undefined) continue;
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      safe[key] = value;
    }
  }

  return safe;
};

const extractErrorDetails = (err) => ({
  name: err?.name,
  code: err?.code,
  message: err?.message,
  status: err?.response?.status,
});

export const logRouteError = (route, scope, err, metadata = {}) => {
  console.error(`[${route}] ${scope}`, {
    ...extractErrorDetails(err),
    ...sanitizeMetadata(metadata),
  });
};

export const logRequestError = (req, err, metadata = {}) => {
  console.error("[api] unhandled error", {
    method: req?.method,
    path: req?.originalUrl,
    ...extractErrorDetails(err),
    ...sanitizeMetadata(metadata),
  });
};
