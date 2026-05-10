import { describe, expect, it } from "vitest";
import { env, validateEnv } from "@/config/env";

describe("Environment Configuration", () => {
  it("exposes the application public URL", () => {
    expect(env.APP_URL).toBeDefined();
  });

  it("validates environment successfully", () => {
    expect(() => validateEnv()).not.toThrow();
    expect(validateEnv()).toBe(true);
  });

  it("uses a localhost default for local builds", () => {
    expect(env.APP_URL).toBe("http://localhost:3000");
  });
});
