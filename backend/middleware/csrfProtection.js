import { doubleCsrf } from "csrf-csrf";

const isProduction = process.env.NODE_ENV === "production";

const getCsrfSecret = () => {
  const secret = process.env.CSRF_SECRET || process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("CSRF_SECRET or JWT_SECRET must be set for CSRF protection");
  }
  return secret;
};

const getSessionIdentifier = (req) => req.cookies?.token || req.ip || "anonymous";

const { generateCsrfToken, doubleCsrfProtection, invalidCsrfTokenError } = doubleCsrf({
  getSecret: getCsrfSecret,
  getSessionIdentifier,
  cookieName: isProduction ? "__Host-psifi.x-csrf-token" : "psifi.x-csrf-token",
  cookieOptions: {
    sameSite: isProduction ? "strict" : "lax",
    path: "/",
    secure: isProduction,
    httpOnly: true,
  },
  getCsrfTokenFromRequest: (req) => req.headers["x-csrf-token"],
});

export { generateCsrfToken, doubleCsrfProtection, invalidCsrfTokenError };
