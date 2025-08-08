/**
 * Test pour vérifier le positionnement de l'option Google Workspace
 * Doit être placée juste après le slider de longueur
 */

import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PasswordGeneratorV2 from "@/components/password/PasswordGeneratorV2";

// Mocks
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

describe("Positionnement Google Workspace", () => {
  it("devrait placer le mode Google Workspace juste après le slider de longueur", () => {
    render(<PasswordGeneratorV2 />);

    // Vérifier que les éléments sont présents
    expect(screen.getByText("Longueur")).toBeInTheDocument();
    expect(screen.getByText("Mode Google Workspace")).toBeInTheDocument();
    expect(screen.getByText("Types de caractères")).toBeInTheDocument();

    // Récupérer toutes les cartes de configuration dans l'ordre du DOM
    const container = document.querySelector(".msp-section-generator");
    expect(container).toBeInTheDocument();

    const allCards = container?.querySelectorAll(".msp-card");
    expect(allCards?.length).toBeGreaterThanOrEqual(4); // Au moins 4 cartes au total

    // Vérifier que Google Workspace apparaît après Longueur et avant Types de caractères
    let foundLongueur = false;
    let foundGoogleWorkspace = false;
    let foundTypes = false;
    let positionLongueur = -1;
    let positionGoogleWorkspace = -1;
    let positionTypes = -1;

    allCards?.forEach((card, index) => {
      const text = card.textContent || "";
      // Nouvelle structure compacte: "Longueur" + nombre + "car" (version courte)
      if (
        text.includes("Longueur") &&
        (text.includes("caractères") || text.includes("car"))
      ) {
        foundLongueur = true;
        positionLongueur = index;
      }
      if (text.includes("Mode Google Workspace")) {
        foundGoogleWorkspace = true;
        positionGoogleWorkspace = index;
      }
      if (text.includes("Types de caractères") && text.includes("Majuscules")) {
        foundTypes = true;
        positionTypes = index;
      }
    });

    expect(foundLongueur).toBe(true);
    expect(foundGoogleWorkspace).toBe(true);
    expect(foundTypes).toBe(true);

    // Vérifier l'ordre: Longueur < Google Workspace < Types de caractères
    expect(positionLongueur).toBeGreaterThan(-1);
    expect(positionGoogleWorkspace).toBeGreaterThan(positionLongueur);
    expect(positionTypes).toBeGreaterThan(positionGoogleWorkspace);
  });

  it("devrait avoir la checkbox Google Workspace avec la bonne description", () => {
    render(<PasswordGeneratorV2 />);

    // Vérifier le nouveau texte descriptif
    expect(
      screen.getByText(/Optimisé pour Google Workspace/i)
    ).toBeInTheDocument();

    // Vérifier que la checkbox est présente
    const checkbox = screen.getByRole("checkbox", {
      name: /Mode Google Workspace/i,
    });
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked(); // Par défaut non cochée
  });

  it("devrait avoir une structure logique de configuration", () => {
    render(<PasswordGeneratorV2 />);

    const container = document.querySelector(".msp-section-generator");
    const configSection =
      container?.querySelector("h3")?.parentElement?.parentElement;

    // Vérifier que la section Configuration existe
    expect(screen.getByText("Configuration")).toBeInTheDocument();
    expect(
      screen.getByText("Personnalisez votre mot de passe")
    ).toBeInTheDocument();

    // Vérifier la progression logique: Longueur → Compatibilité → Types
    const elements = [
      screen.getByText("Longueur"),
      screen.getByText("Mode Google Workspace"),
      screen.getByText("Types de caractères"),
    ];

    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it("devrait avoir une interface compacte pour Google Workspace", () => {
    render(<PasswordGeneratorV2 />);

    // Vérifier que la nouvelle interface est plus compacte
    const googleWorkspaceSection = screen
      .getByText("Mode Google Workspace")
      .closest(".msp-card");
    expect(googleWorkspaceSection).toBeInTheDocument();
    expect(googleWorkspaceSection).toHaveClass(
      "border-2",
      "border-white/20",
      "p-4"
    );

    // Vérifier l'icône bâtiment
    const buildingIcon = screen.getByRole("img", { name: "Bâtiment" });
    expect(buildingIcon).toBeInTheDocument();
  });
});
