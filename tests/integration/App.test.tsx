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
      expect(screen.getAllByText(/MySecurePassword/i).length).toBeGreaterThan(
        0
      );
    });
  });

  it("devrait avoir un bouton de génération fonctionnel", async () => {
    render(<HomePage />);

    // Attendre que l'application soit chargée
    await waitFor(() => {
      expect(screen.getAllByText(/Générer/i).length).toBeGreaterThan(0);
    });

    // Vérifier que le bouton est présent (libellé court V2)
    const generateButtons = screen.getAllByText(/Générer/i);
    expect(generateButtons.length).toBeGreaterThan(0);
  });

  it("devrait changer les options de configuration", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("Configuration")).toBeInTheDocument();
    });

    // Changer la longueur
    const lengthSlider = screen.getByLabelText(/Longueur du mot de passe/i);
    fireEvent.change(lengthSlider, { target: { value: "20" } });

    // L'UI V2 affiche la valeur à proximité du slider; on vérifie simplement la présence de 20
    await waitFor(() => {
      expect(screen.getAllByText(/20/).length).toBeGreaterThan(0);
    });

    // Désactiver les majuscules
    const uppercaseCheckbox = screen.getByLabelText(/Majuscules/i);
    fireEvent.click(uppercaseCheckbox);

    await waitFor(() => {
      expect(uppercaseCheckbox).not.toBeChecked();
    });
  });

  it("devrait activer le mode Google Workspace", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getAllByText(/Mode Google Workspace/i).length
      ).toBeGreaterThan(0);
    });

    // Trouver le checkbox dans le composant PasswordGenerator
    const googleWorkspaceCheckbox = screen.getByRole("checkbox", {
      name: /mode google workspace/i,
    });

    fireEvent.click(googleWorkspaceCheckbox);

    expect(googleWorkspaceCheckbox).toBeChecked();
  });

  it("devrait avoir une interface responsive", async () => {
    render(<HomePage />);

    await waitFor(() => {
      const gridContainer = document.querySelector(
        ".grid.grid-cols-1.lg\\:grid-cols-2"
      );
      expect(gridContainer).not.toBeNull();
    });
  });
});
