import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../app.mjs";
import * as commentService from "../services/commentService.js";
import { createAuthenticatedAgent } from "./helpers/auth.js";

describe("Comments moderation API integration", () => {
  it("creates comment and supports moderation flow", async () => {
    vi.spyOn(commentService, "createComment").mockResolvedValue({
      message: "留言成功~ 等待審核",
    });
    vi.spyOn(commentService, "listPendingComments").mockResolvedValue([
      { _id: "507f1f77bcf86cd799439011", approved: false },
    ]);
    vi.spyOn(commentService, "approveComment").mockResolvedValue({
      message: "Comment is arrpoved",
      comment: { _id: "507f1f77bcf86cd799439011", approved: true },
    });
    vi.spyOn(commentService, "listApprovedComments").mockResolvedValue([
      { _id: "507f1f77bcf86cd799439011", approved: true },
    ]);
    vi.spyOn(commentService, "deleteComment").mockResolvedValue({
      message: "Message has been deleted",
    });

    const createRes = await request(app).post("/api/comments").send({
      name: "Reader",
      avatar: "🐙",
      content: "Nice article",
      isPublic: true,
      post: "507f191e810c19729de860ea",
      recaptchaToken: "fake-token",
    });

    expect(createRes.status).toBe(201);
    expect(createRes.body.message).toContain("留言成功");

    const { agent, csrfToken } = await createAuthenticatedAgent();

    const pendingRes = await agent.get("/api/comments/pendingComments");
    expect(pendingRes.status).toBe(200);
    expect(pendingRes.body).toHaveLength(1);

    const approveRes = await agent
      .patch("/api/comments/507f1f77bcf86cd799439011/approve")
      .set("x-csrf-token", csrfToken);
    expect(approveRes.status).toBe(200);

    const approvedRes = await request(app).get(
      "/api/comments/approvedComments/507f191e810c19729de860ea"
    );
    expect(approvedRes.status).toBe(200);
    expect(approvedRes.body).toHaveLength(1);

    const deleteRes = await agent
      .delete("/api/comments/507f1f77bcf86cd799439011")
      .set("x-csrf-token", csrfToken);
    expect(deleteRes.status).toBe(200);
  });
});
