import { describe, it, expect, vi, afterEach } from "vitest";
import request from "supertest";
import app from "../app.mjs";
import * as uploadService from "../services/uploadService.js";
import { createAuthenticatedAgent } from "./helpers/auth.js";

describe("Upload API integration", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("uploads image for authenticated user", async () => {
    const uploadSpy = vi
      .spyOn(uploadService, "uploadImage")
      .mockResolvedValue({ url: "https://cdn.example.com/uploaded.jpg" });

    const { agent } = await createAuthenticatedAgent();

    const res = await agent
      .post("/api/upload")
      .attach("image", Buffer.from("fake-image-bytes"), "cover.jpg");

    expect(res.status).toBe(200);
    expect(res.body.url).toBe("https://cdn.example.com/uploaded.jpg");
    expect(uploadSpy).toHaveBeenCalledTimes(1);
  });

  it("rejects upload without auth", async () => {
    const res = await request(app)
      .post("/api/upload")
      .attach("image", Buffer.from("fake-image-bytes"), "cover.jpg");

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token found");
  });
});
