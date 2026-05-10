import { expect, test } from "@playwright/test";

const VIEWPORTS = [
  { name: "desktop MacBook", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

for (const viewport of VIEWPORTS) {
  test(`la homepage reste utilisable en ${viewport.name} sans débordement horizontal`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto("/");

    await expect(page.locator("h1", { hasText: "MySecurePassword" })).toBeVisible();
    await expect(page.getByLabel(/mot de passe généré/i)).toBeVisible();
    await expect(page.getByLabel(/générer un nouveau mot de passe sécurisé/i)).toBeVisible();

    const dimensions = await page.evaluate(() => ({
      viewportWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewportWidth + 1);
  });
}
