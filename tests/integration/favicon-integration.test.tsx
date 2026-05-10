/**
 * Test d'intégration du favicon
 * Vérifie les assets et métadonnées sans dépendre d'un serveur localhost.
 */

import { describe, it, expect, vi } from "vitest";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { metadata } from "@/app/layout";

vi.mock("next/font/google", () => ({
  Inter: () => ({ variable: "--font-inter" }),
}));

const publicDir = path.resolve(process.cwd(), "public");

describe("Favicon Integration Tests", () => {
  it("should provide favicon.png correctly", async () => {
    const faviconPath = path.join(publicDir, "favicon.png");
    const faviconStat = await stat(faviconPath);

    expect(faviconStat.size).toBeGreaterThan(1024); // Au moins 1KB
  });

  it("should have correct favicon metadata", () => {
    expect(metadata.icons).toBeDefined();
    expect(metadata.icons).toMatchObject({
      apple: "/favicon.png",
      shortcut: "/favicon.png",
    });
    expect(JSON.stringify(metadata.icons)).toContain("/favicon.png");
    expect(JSON.stringify(metadata.icons)).toContain("image/png");
    expect(metadata.manifest).toBe("/site.webmanifest");
  });

  it("should provide webmanifest correctly", async () => {
    const manifestPath = path.join(publicDir, "site.webmanifest");
    const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

    expect(manifest.name).toBe("MySecurePassword");
    expect(manifest.short_name).toBe("MSP");
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons[0].src).toBe("/favicon.png");
    expect(manifest.icons[0].type).toBe("image/png");
  });
});
