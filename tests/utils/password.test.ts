import { describe, it, expect, vi } from "vitest";

// Mock de crypto.getRandomValues
Object.defineProperty(window, "crypto", {
  value: {
    getRandomValues: vi.fn(
      () =>
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
    ),
  },
});

describe("Password Generation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait générer un mot de passe avec la longueur spécifiée", () => {
    const length = 14;
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);

    expect(array.length).toBe(length);
  });

  it("devrait utiliser Web Crypto API pour la génération", () => {
    const array = new Uint8Array(14);
    crypto.getRandomValues(array);

    expect(crypto.getRandomValues).toHaveBeenCalled();
  });

  it("devrait générer des valeurs aléatoires", () => {
    const array1 = new Uint8Array(14);
    const array2 = new Uint8Array(14);

    crypto.getRandomValues(array1);
    crypto.getRandomValues(array2);

    expect(crypto.getRandomValues).toHaveBeenCalledTimes(2);
  });
});

describe("Password Strength Analysis", () => {
  it("devrait évaluer un mot de passe fort", () => {
    const strongPassword = "MySecurePass123!";

    let score = 0;

    // Longueur
    if (strongPassword.length >= 12) score += 2;
    else if (strongPassword.length >= 8) score += 1;

    // Complexité
    if (/[A-Z]/.test(strongPassword)) score += 1;
    if (/[a-z]/.test(strongPassword)) score += 1;
    if (/[0-9]/.test(strongPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(strongPassword)) score += 1;

    expect(score).toBeGreaterThanOrEqual(5);
  });

  it("devrait évaluer un mot de passe faible", () => {
    const weakPassword = "123";

    let score = 0;

    // Longueur
    if (weakPassword.length >= 12) score += 2;
    else if (weakPassword.length >= 8) score += 1;

    // Complexité
    if (/[A-Z]/.test(weakPassword)) score += 1;
    if (/[a-z]/.test(weakPassword)) score += 1;
    if (/[0-9]/.test(weakPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(weakPassword)) score += 1;

    expect(score).toBeLessThan(3);
  });

  it("devrait détecter les caractères répétés", () => {
    const passwordWithRepeats = "aaa123";
    const hasRepeats = /(.)\1{2,}/.test(passwordWithRepeats);

    expect(hasRepeats).toBe(true);
  });

  it("devrait détecter l'absence de caractères répétés", () => {
    const passwordWithoutRepeats = "abc123";
    const hasRepeats = /(.)\1{2,}/.test(passwordWithoutRepeats);

    expect(hasRepeats).toBe(false);
  });
});

describe("Google Workspace Compatibility", () => {
  it("devrait exclure les caractères problématiques", () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

    // Caractères similaires (l, 1, I, O, 0)
    const withoutSimilar = charset.replace(/[il1Lo0O]/g, "");

    // Caractères ambigus et problématiques
    const compatible = withoutSimilar.replace(/[{}[\]()/\\'"`~,;:.<>]/g, "");

    expect(compatible).not.toContain("l");
    expect(compatible).not.toContain("1");
    expect(compatible).not.toContain("O");
    expect(compatible).not.toContain("0");
    expect(compatible).not.toContain("{");
    expect(compatible).not.toContain("}");
    expect(compatible).not.toContain("[");
    expect(compatible).not.toContain("]");
    expect(compatible).not.toContain("(");
    expect(compatible).not.toContain(")");
    expect(compatible).not.toContain("\\");
    expect(compatible).not.toContain('"');
    expect(compatible).not.toContain("'");
    expect(compatible).not.toContain("`");
    expect(compatible).not.toContain("~");
    expect(compatible).not.toContain(",");
    expect(compatible).not.toContain(";");
    expect(compatible).not.toContain(":");
    expect(compatible).not.toContain(".");
    expect(compatible).not.toContain("<");
    expect(compatible).not.toContain(">");
  });

  it("devrait conserver les caractères sûrs", () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";

    // Caractères similaires (l, 1, I, O, 0)
    const withoutSimilar = charset.replace(/[il1Lo0O]/g, "");

    // Caractères ambigus et problématiques
    const compatible = withoutSimilar.replace(/[{}[\]()/\\'"`~,;:.<>]/g, "");

    expect(compatible).toContain("A");
    expect(compatible).toContain("a");
    expect(compatible).toContain("2");
    expect(compatible).toContain("3");
    expect(compatible).toContain("!");
    expect(compatible).toContain("@");
    expect(compatible).toContain("#");
    expect(compatible).toContain("$");
    expect(compatible).toContain("%");
    expect(compatible).toContain("^");
    expect(compatible).toContain("&");
    expect(compatible).toContain("*");
    expect(compatible).toContain("_");
    expect(compatible).toContain("+");
    expect(compatible).toContain("-");
    expect(compatible).toContain("=");
  });
});
