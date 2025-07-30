import "@testing-library/jest-dom";
import { vi } from "vitest";

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
        new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])
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
