import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

// Certains tests TSX historiques n'importent pas React explicitement.
// Avec l'outillage Vite/Vitest récent, on expose React globalement pour
// conserver la compatibilité sans réécrire toute la suite de tests.
Object.assign(globalThis, { React });

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock environment variables
vi.mock("@/config/env", () => ({
  env: {
    SUPABASE_URL: "https://test.supabase.co",
    SUPABASE_ANON_KEY: "test-anon-key",
    APP_URL: "http://localhost:3000",
  },
  validateEnv: vi.fn(() => true),
}));

// Mock de crypto.getRandomValues pour les tests
Object.defineProperty(window, "crypto", {
  value: {
    getRandomValues: vi.fn(
      () =>
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])
    ),
  },
});

// Mock de navigator.clipboard
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
});
