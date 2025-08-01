/**
 * Test d'intégration du favicon
 * Vérifie que le favicon fonctionne correctement en production
 */

import { describe, it, expect } from "vitest";

describe("Favicon Integration Tests", () => {
  it("should serve favicon.png correctly", async () => {
    const response = await fetch("http://localhost:3000/favicon.png");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    
    const buffer = await response.arrayBuffer();
    expect(buffer.byteLength).toBeGreaterThan(1024); // Au moins 1KB
  });

  it("should have correct favicon metadata in HTML", async () => {
    const response = await fetch("http://localhost:3000");
    expect(response.status).toBe(200);
    
    const html = await response.text();
    
    // Vérifier les meta tags du favicon
    expect(html).toContain('href="/favicon.png"');
    expect(html).toContain('type="image/png"');
    
    // Vérifier le manifest
    expect(html).toContain('href="/site.webmanifest"');
  });

  it("should serve webmanifest correctly", async () => {
    const response = await fetch("http://localhost:3000/site.webmanifest");
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("application/manifest+json");
    
    const manifest = await response.json();
    expect(manifest.name).toBe("MySecurePassword");
    expect(manifest.short_name).toBe("MSP");
    expect(manifest.icons).toBeDefined();
    expect(manifest.icons[0].src).toBe("/favicon.png");
  });
});