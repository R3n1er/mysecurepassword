import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

async function getHeaderMap() {
  expect(nextConfig.headers).toBeTypeOf("function");
  const routes = await nextConfig.headers!();
  const globalRoute = routes.find((route) => route.source === "/(.*)");
  expect(globalRoute).toBeDefined();

  return new Map(globalRoute!.headers.map((header) => [header.key, header.value]));
}

describe("en-têtes HTTP de sécurité", () => {
  it("durcit toutes les routes avec une CSP anti-exfiltration", async () => {
    const headers = await getHeaderMap();
    const csp = headers.get("Content-Security-Policy");

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("connect-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("form-action 'self'");
  });

  it("active les protections navigateur essentielles", async () => {
    const headers = await getHeaderMap();

    expect(headers.get("X-Frame-Options")).toBe("DENY");
    expect(headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(headers.get("Permissions-Policy")).toContain("clipboard-write=(self)");
    expect(headers.get("Permissions-Policy")).toContain("camera=()");
    expect(headers.get("Permissions-Policy")).toContain("microphone=()");
    expect(headers.get("Strict-Transport-Security")).toBe(
      "max-age=63072000; includeSubDomains; preload"
    );
  });
});
