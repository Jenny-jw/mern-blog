import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import app from "../app.mjs";
import { createAuthenticatedAgent } from "./helpers/auth.js";
import * as postService from "../services/postService.js";

describe("Posts API integration", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("requires auth for creating posts", async () => {
    const res = await request(app).post("/api/posts").send({
      title: "Unauthorized post",
      content: "<p>Body</p>",
      tags: ["life"],
      images: ["https://example.com/post.jpg"],
    });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token found");
  });

  it("creates and fetches a post with auth + csrf token", async () => {
    vi.spyOn(postService, "createPost").mockResolvedValue({
      _id: "507f191e810c19729de860ea",
      title: "First post",
      content: "<p>Safe body</p>",
      tags: ["travel"],
      images: ["https://example.com/post.jpg"],
      createdAt: new Date().toISOString(),
    });
    vi.spyOn(postService, "listPosts").mockResolvedValue([
      {
        _id: "507f191e810c19729de860ea",
        title: "First post",
      },
    ]);
    vi.spyOn(postService, "getPostById").mockResolvedValue({
      _id: "507f191e810c19729de860ea",
      title: "First post",
    });

    const { agent, csrfToken } = await createAuthenticatedAgent();

    const createRes = await agent
      .post("/api/posts")
      .set("x-csrf-token", csrfToken)
      .send({
        title: "First post",
        content: "<p>Safe body</p>",
        tags: ["travel"],
        images: ["https://example.com/post.jpg"],
      });

    expect(createRes.status).toBe(200);
    expect(createRes.body._id).toBe("507f191e810c19729de860ea");

    const listRes = await request(app).get("/api/posts");
    expect(listRes.status).toBe(200);
    expect(listRes.body).toHaveLength(1);

    const getRes = await request(app).get(`/api/posts/${createRes.body._id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body._id).toBe(createRes.body._id);
  });
});
