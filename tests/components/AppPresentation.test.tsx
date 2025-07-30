import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppPresentation from "../../src/components/presentation/AppPresentation";

describe("AppPresentation", () => {
  it("devrait afficher le titre principal", () => {
    render(<AppPresentation />);

    expect(
      screen.getByText("Générateur de Mots de Passe Sécurisés")
    ).toBeInTheDocument();
  });

  it("devrait afficher le drapeau français", () => {
    render(<AppPresentation />);

    expect(screen.getByText("Solution française")).toBeInTheDocument();
  });

  it("devrait afficher les avantages principaux", () => {
    render(<AppPresentation />);

    expect(screen.getByText("Sécurité Maximale")).toBeInTheDocument();
    expect(screen.getByText("Compatible Google Workspace")).toBeInTheDocument();
    expect(screen.getByText("Conforme RGPD")).toBeInTheDocument();
    expect(screen.getByText("Rapide & Simple")).toBeInTheDocument();
    expect(screen.getByText("Accessible Partout")).toBeInTheDocument();
    expect(screen.getByText("100% Gratuit")).toBeInTheDocument();
  });

  it("devrait afficher la section RGPD", () => {
    render(<AppPresentation />);

    expect(screen.getByText("Conformité RGPD Complète")).toBeInTheDocument();
    expect(screen.getByText("Minimisation des données :")).toBeInTheDocument();
    expect(screen.getByText("Intégrité et confidentialité :")).toBeInTheDocument();
    expect(screen.getByText("Transparence :")).toBeInTheDocument();
    expect(screen.getByText("Responsabilité :")).toBeInTheDocument();
  });

  it("devrait afficher les caractères exclus", () => {
    render(<AppPresentation />);

    expect(screen.getByText("l")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("I")).toBeInTheDocument();
    expect(screen.getByText("O")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
}); 