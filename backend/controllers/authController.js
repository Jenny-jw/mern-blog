import { generateCsrfToken } from "../middleware/csrfProtection.js";
import { ServiceError } from "../errors/ServiceError.js";
import { logRouteError } from "../utils/safeLogger.js";
import * as authService from "../services/authService.js";

const ROUTE = "auth";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.validated.body;
    const { token } = await authService.login({ username, password });

    res.cookie("token", token, {
      ...authService.TOKEN_COOKIE_OPTIONS,
      maxAge: 3600000,
    });

    return res.json({ message: "Login successful" });
  } catch (err) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({ message: err.message });
    }
    logRouteError(ROUTE, "login failed", err);
    next(err);
  }
};

export const logout = (_req, res) => {
  res.clearCookie("token", authService.TOKEN_COOKIE_OPTIONS);
  res.json({ message: "Logged out" });
};

export const test = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const me = (req, res) => {
  res.json({ username: req.user.username });
};

export const csrfToken = (req, res) => {
  res.json({ csrfToken: generateCsrfToken(req, res) });
};
