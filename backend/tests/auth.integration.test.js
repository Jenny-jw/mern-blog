import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.mjs";
import { createAuthenticatedAgent } from "./helpers/auth.js";

describe("Auth API integration", () => {
  it("logs in with valid admin credentials and sets cookie", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: process.env.ADMIN_USERNAME,
      password: "admin-password",
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Login successful" });
    expect(res.headers["set-cookie"]?.join(";")).toContain("token=");
  });

  it("rejects invalid password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      username: process.env.ADMIN_USERNAME,
      password: "wrong-password",
    });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ message: "Invalid credentials" });
  });

  it("returns profile on protected /me endpoint after login", async () => {
    const { agent } = await createAuthenticatedAgent();

    const meRes = await agent.get("/api/auth/me");

    expect(meRes.status).toBe(200);
    expect(meRes.body).toEqual({ username: process.env.ADMIN_USERNAME });
  });
});
