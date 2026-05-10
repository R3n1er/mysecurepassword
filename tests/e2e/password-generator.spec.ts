import { expect, test } from "@playwright/test";

const GOOGLE_WORKSPACE_FORBIDDEN_CHARS = /[~`/]/;

test.describe("parcours cœur du générateur", () => {
  test("un utilisateur génère, rend compatible Google Workspace et copie un mot de passe", async ({
    page,
    context,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/");

    await expect(page.locator("h1", { hasText: "MySecurePassword" })).toBeVisible();
    await expect(page.getByText(/générateur de mots de passe haute sécurité/i)).toBeVisible();
    await expect(page.getByLabel(/mot de passe généré/i)).toBeVisible();

    await page.getByLabel(/mode google workspace/i).check();
    await page.getByLabel(/générer un nouveau mot de passe sécurisé/i).click();

    const passwordInput = page.getByLabel(/mot de passe généré/i);
    await expect(passwordInput).toHaveValue(/.{14}/);

    const password = await passwordInput.inputValue();
    expect(password).toHaveLength(14);
    expect(password).not.toMatch(GOOGLE_WORKSPACE_FORBIDDEN_CHARS);

    await page.getByLabel(/copier le mot de passe/i).click();
    await expect(page.getByLabel(/mot de passe copié/i)).toBeVisible();
    await expect(page.evaluate(() => navigator.clipboard.readText())).resolves.toBe(password);

    expect(consoleErrors).toEqual([]);
  });
});
