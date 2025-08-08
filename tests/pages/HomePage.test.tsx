import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/app/page";

// Mock du composant PasswordGenerator
vi.mock("@/components/password/PasswordGeneratorV2", () => ({
  default: () => (
    <div data-testid="password-generator">
      <h1>MySecurePassword</h1>
      <p>Générateur de mots de passe sécurisés</p>
      <button>Générer</button>
    </div>
  ),
}));

describe("HomePage", () => {
  it("devrait afficher la page d'accueil", () => {
    render(<HomePage />);

    expect(screen.getByTestId("password-generator")).toBeInTheDocument();
  });

  it("devrait contenir le composant PasswordGeneratorV2", () => {
    render(<HomePage />);

    expect(screen.getAllByText(/MySecurePassword/i).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(/Générateur de mots de passe sécurisés/i).length
    ).toBeGreaterThan(0);
  });
});
