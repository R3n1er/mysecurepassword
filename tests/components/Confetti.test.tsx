import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Confetti from "../../src/components/animations/Confetti";

describe("Confetti", () => {
  it("devrait se rendre sans erreur", () => {
    expect(() => render(<Confetti isActive={false} />)).not.toThrow();
  });
}); 