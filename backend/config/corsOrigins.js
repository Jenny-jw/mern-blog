const DEV_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const parseOriginList = (value) =>
  String(value || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

export const resolveAppEnv = (env = process.env) => {
  const appEnv = env.APP_ENV?.toLowerCase();
  if (appEnv === "development" || appEnv === "staging" || appEnv === "production") {
    return appEnv;
  }
  return env.NODE_ENV === "production" ? "production" : "development";
};

export const getAllowedOrigins = (env = process.env) => {
  const appEnv = resolveAppEnv(env);
  const fromEnv = parseOriginList(env.ALLOWED_ORIGINS);

  if (fromEnv.length > 0) {
    return { appEnv, origins: fromEnv, source: "ALLOWED_ORIGINS" };
  }

  if (appEnv === "development") {
    return { appEnv, origins: DEV_ORIGINS, source: "development-defaults" };
  }

  return { appEnv, origins: [], source: "none" };
};

export const createCorsOriginValidator = (allowedOrigins) => {
  const allowlist = new Set(allowedOrigins);

  return (origin, callback) => {
    // Same-origin and non-browser clients (curl, server-side) send no Origin header.
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowlist.has(origin)) {
      callback(null, true);
      return;
    }

    const error = new Error("Not allowed by CORS");
    error.statusCode = 403;
    callback(error);
  };
};

export const logCorsConfig = ({ appEnv, origins, source }) => {
  if (origins.length === 0) {
    console.warn(
      `[cors] APP_ENV=${appEnv} has no allowed origins (set ALLOWED_ORIGINS); cross-origin browser requests will be rejected`
    );
    return;
  }

  console.log(
    `[cors] APP_ENV=${appEnv} source=${source} origins=${origins.join(", ")}`
  );
};
