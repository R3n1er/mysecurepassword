import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import HomePage from "../../src/app/page";

// Mock de crypto.getRandomValues
Object.defineProperty(window, "crypto", {
  value: {
    getRandomValues: vi.fn(
      () =>
        new Uint8Array([
          65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        ])
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

describe("Application Intégration", () => {
  it("devrait charger l'application complète", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("MySecurePassword")).toBeInTheDocument();
    });
  });

  it("devrait avoir un bouton de génération fonctionnel", async () => {
    render(<HomePage />);

    // Attendre que l'application soit chargée
    await waitFor(() => {
      expect(
        screen.getByText("Générer un nouveau mot de passe")
      ).toBeInTheDocument();
    });

    // Vérifier que le bouton est présent
    const generateButton = screen.getByText("Générer un nouveau mot de passe");
    expect(generateButton).toBeInTheDocument();
  });

  it("devrait changer les options de configuration", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Configuration")).toBeInTheDocument();
    });

    // Changer la longueur
    const lengthSlider = screen.getByLabelText("Longueur du mot de passe");
    fireEvent.change(lengthSlider, { target: { value: "20" } });

    await waitFor(() => {
      expect(screen.getByText("Longueur: 20 caractères")).toBeInTheDocument();
    });

    // Désactiver les majuscules
    const uppercaseCheckbox = screen.getByLabelText("Majuscules (A-Z)");
    fireEvent.click(uppercaseCheckbox);

    await waitFor(() => {
      expect(uppercaseCheckbox).not.toBeChecked();
    });
  });

  it("devrait activer la compatibilité Google Workspace", async () => {
    render(<HomePage />);

    await waitFor(() => {
      const googleWorkspaceLabels = screen.getAllByText("Compatibilité Google Workspace");
      expect(googleWorkspaceLabels.length).toBeGreaterThan(0);
    });

    // Trouver le checkbox dans le composant PasswordGenerator
    const googleWorkspaceCheckbox = screen.getByRole("checkbox", {
      name: /compatibilité google workspace/i,
    });

    fireEvent.click(googleWorkspaceCheckbox);

    expect(googleWorkspaceCheckbox).toBeChecked();
  });

  it("devrait avoir une interface responsive", async () => {
    render(<HomePage />);

    await waitFor(() => {
      const gridContainer = screen
        .getByText("Configuration")
        .closest("div")?.parentElement;
      expect(gridContainer).toHaveClass(
        "grid",
        "grid-cols-1",
        "lg:grid-cols-2"
      );
    });
  });
});
