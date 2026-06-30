import bcrypt from "bcrypt";
import { beforeEach } from "vitest";

process.env.NODE_ENV = "test";
process.env.APP_ENV = "development";
process.env.JWT_SECRET = "test-jwt-secret";
process.env.CSRF_SECRET = "test-csrf-secret";
process.env.ADMIN_USERNAME = "admin";
process.env.RECAPTCHA_SECRET_KEY = "test-recaptcha-secret";

const passwordHash = await bcrypt.hash("admin-password", 4);
process.env.ADMIN_PASSWORD_HASH = passwordHash;

beforeEach(() => {
  process.env.ADMIN_USERNAME = "admin";
  process.env.JWT_SECRET = "test-jwt-secret";
});
