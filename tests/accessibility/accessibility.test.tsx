import { render, screen } from "@testing-library/react";
import PasswordGeneratorV2 from "@/components/password/PasswordGeneratorV2";
import { ScrollArrow } from "@/components/ui/scroll-arrow";

describe("Accessibility Tests", () => {
  describe("PasswordGeneratorV2", () => {
    it("should have proper ARIA labels", () => {
      render(<PasswordGeneratorV2 />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /générer/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("should have proper form labels", () => {
      render(<PasswordGeneratorV2 />);

      expect(screen.getByLabelText(/majuscules/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/minuscules/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/chiffres/i)).toBeInTheDocument();
      // Deux checkboxes peuvent matcher "symboles" (description du mode GWS et l'option symboles).
      // On vérifie simplement qu'au moins une case "Symboles" est présente dans les contrôles de type.
      const symbolCheckboxes = screen.getAllByLabelText(/symboles/i);
      expect(symbolCheckboxes.length).toBeGreaterThan(0);
    });

    it("should have keyboard navigation support", () => {
      render(<PasswordGeneratorV2 />);

      const generateButton = screen.getByRole("button", { name: /générer/i });
      expect(generateButton).toBeInTheDocument();

      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeEnabled();
      });
    });
  });

  describe("ScrollArrow", () => {
    it("should have proper ARIA label", () => {
      render(<ScrollArrow />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label");
    });

    it("should be keyboard accessible", () => {
      render(<ScrollArrow />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });
});
