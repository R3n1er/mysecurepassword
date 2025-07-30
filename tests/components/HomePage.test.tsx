import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import HomePage from "../../src/app/page";

// Mock du composant PasswordGenerator
vi.mock("@/components/password/PasswordGenerator", () => ({
  default: () => (
    <div data-testid="password-generator">
      <h1>MySecurePassword</h1>
      <p>Générateur de mots de passe sécurisés compatible Google Workspace</p>
      <button>Générer</button>
    </div>
  ),
}));

describe("HomePage", () => {
  it("devrait afficher la page d'accueil", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("password-generator")).toBeInTheDocument();
    });
  });

  it("devrait contenir le composant PasswordGenerator", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("MySecurePassword")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Générateur de mots de passe sécurisés compatible Google Workspace"
        )
      ).toBeInTheDocument();
    });
  });

  it("devrait avoir une structure de base", async () => {
    render(<HomePage />);

    await waitFor(() => {
      const container = screen.getByTestId("password-generator").parentElement;
      expect(container).toHaveClass("relative", "z-10");
    });
  });
});
