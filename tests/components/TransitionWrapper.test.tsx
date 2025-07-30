import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TransitionWrapper from "../../src/components/animations/TransitionWrapper";

describe("TransitionWrapper", () => {
  it("devrait afficher le contenu enfant", () => {
    render(
      <TransitionWrapper>
        <div data-testid="test-content">Contenu de test</div>
      </TransitionWrapper>
    );
    
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });

  it("devrait avoir les classes de transition", () => {
    render(
      <TransitionWrapper>
        <div>Contenu</div>
      </TransitionWrapper>
    );
    
    const wrapper = screen.getByText("Contenu").parentElement;
    expect(wrapper).toHaveClass("transition-all", "duration-1000", "ease-out");
  });

  it("devrait appliquer le délai correctement", () => {
    render(
      <TransitionWrapper delay={1000}>
        <div>Contenu avec délai</div>
      </TransitionWrapper>
    );
    
    const wrapper = screen.getByText("Contenu avec délai").parentElement;
    expect(wrapper).toBeInTheDocument();
  });
}); 