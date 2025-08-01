/**
 * Test de correction du favicon
 * Vérifie que le favicon est correctement configuré et accessible
 */

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Favicon Fix Tests", () => {
  it("should have favicon.png in public directory", () => {
    const faviconPath = path.join(process.cwd(), "public", "favicon.png");
    expect(fs.existsSync(faviconPath)).toBe(true);
  });

  it("should not have favicon.ico in app directory anymore", () => {
    const faviconIcoPath = path.join(
      process.cwd(),
      "src",
      "app",
      "favicon.ico"
    );
    expect(fs.existsSync(faviconIcoPath)).toBe(false);
  });

  it("should have correct favicon configuration in layout", async () => {
    const layoutPath = path.join(process.cwd(), "src", "app", "layout.tsx");
    const layoutContent = fs.readFileSync(layoutPath, "utf-8");

    // Vérifier que la configuration pointe vers favicon.png
    expect(layoutContent).toContain("/favicon.png");
    expect(layoutContent).toContain("icon: [");
    expect(layoutContent).toContain('apple: "/favicon.png"');
    expect(layoutContent).toContain('shortcut: "/favicon.png"');
  });

  it("should have correct webmanifest configuration", () => {
    const manifestPath = path.join(process.cwd(), "public", "site.webmanifest");
    expect(fs.existsSync(manifestPath)).toBe(true);

    const manifestContent = fs.readFileSync(manifestPath, "utf-8");
    const manifest = JSON.parse(manifestContent);

    expect(manifest.icons).toBeDefined();
    expect(manifest.icons.length).toBeGreaterThan(0);
    expect(manifest.icons[0].src).toBe("/favicon.png");
  });

  it("should have favicon with correct file size", () => {
    const faviconPath = path.join(process.cwd(), "public", "favicon.png");
    const stats = fs.statSync(faviconPath);

    // Le favicon doit faire au moins 1KB (éviter les fichiers corrompus)
    expect(stats.size).toBeGreaterThan(1024);
    // Mais pas trop gros (moins de 2MB)
    expect(stats.size).toBeLessThan(2 * 1024 * 1024);
  });
});
