import request from "supertest";
import app from "../../app.mjs";
import { TOKEN_COOKIE_OPTIONS } from "../../services/authService.js";

export const createAuthenticatedAgent = async () => {
  TOKEN_COOKIE_OPTIONS.secure = false;
  TOKEN_COOKIE_OPTIONS.sameSite = "lax";

  const agent = request.agent(app);

  const loginRes = await agent.post("/api/auth/login").send({
    username: process.env.ADMIN_USERNAME,
    password: "admin-password",
  });

  const csrfRes = await agent.get("/api/auth/csrf-token");

  return {
    agent,
    loginRes,
    csrfToken: csrfRes.body.csrfToken,
  };
};
