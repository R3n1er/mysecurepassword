import { expect, test } from "@playwright/test";

for (const { path, heading } of [
  { path: "/privacy", heading: /politique de confidentialité/i },
  { path: "/legal", heading: /mentions légales/i },
]) {
  test(`la page ${path} charge sans erreur console et affiche son titre`, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto(path);

    await expect(page.getByRole("heading", { name: heading }).first()).toBeVisible();
    await expect(page.locator("body")).toContainText("MySecurePassword");
    expect(consoleErrors).toEqual([]);
  });
}
