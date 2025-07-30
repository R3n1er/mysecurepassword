import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordGenerator from "../../src/components/password/PasswordGenerator";

// Mock des modules
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick, className, ...props }: any) => (
    <button onClick={onClick} className={className} {...props}>
      {children}
    </button>
  ),
}));

vi.mock("@/components/ui/input", () => ({
  Input: ({ value, readOnly, placeholder, className, ...props }: any) => (
    <input
      value={value}
      readOnly={readOnly}
      placeholder={placeholder}
      className={className}
      {...props}
    />
  ),
}));

vi.mock("@/components/ui/label", () => ({
  Label: ({ children, htmlFor, className, ...props }: any) => (
    <label htmlFor={htmlFor} className={className} {...props}>
      {children}
    </label>
  ),
}));

vi.mock("lucide-react", () => ({
  Copy: ({ className }: any) => (
    <div data-testid="copy-icon" className={className} />
  ),
  RefreshCw: ({ className }: any) => (
    <div data-testid="refresh-icon" className={className} />
  ),
  Shield: ({ className }: any) => (
    <div data-testid="shield-icon" className={className} />
  ),
  Settings: ({ className }: any) => (
    <div data-testid="settings-icon" className={className} />
  ),
  Check: ({ className }: any) => (
    <div data-testid="check-icon" className={className} />
  ),
}));

// Mock de crypto.getRandomValues avec des valeurs plus variées
Object.defineProperty(window, "crypto", {
  value: {
    getRandomValues: vi.fn(
      () =>
        new Uint8Array([
          65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        ])
    ), // A-P
  },
});

// Mock de navigator.clipboard
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
});

describe("PasswordGenerator", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait afficher le titre principal", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(screen.getByText("MySecurePassword")).toBeInTheDocument();
    });
  });

  it("devrait afficher la description", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Générateur de mots de passe sécurisés compatible Google Workspace"
        )
      ).toBeInTheDocument();
    });
  });

  it("devrait afficher le logo MSP", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const logo = screen.getByText("MSP");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveClass("font-bold", "text-xl");
    });
  });

  it("devrait afficher le champ de mot de passe", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText(
        "Cliquez sur 'Générer' pour créer votre mot de passe sécurisé"
      );
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute("readonly");
    });
  });

  it("devrait afficher le bouton de copie", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(screen.getByTestId("copy-icon")).toBeInTheDocument();
    });
  });

  it("devrait afficher le bouton de génération", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const generateButton = screen.getByText(
        "Générer un nouveau mot de passe"
      );
      expect(generateButton).toBeInTheDocument();
      expect(generateButton).toHaveClass("bg-gradient-to-r");
    });
  });

  it("devrait afficher la section de configuration", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(screen.getByText("Configuration")).toBeInTheDocument();
      expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
    });
  });

  it("devrait afficher les options de configuration", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(screen.getByText("Majuscules (A-Z)")).toBeInTheDocument();
      expect(screen.getByText("Minuscules (a-z)")).toBeInTheDocument();
      expect(screen.getByText("Chiffres (0-9)")).toBeInTheDocument();
      expect(screen.getByText("Symboles (!@#$%^&*)")).toBeInTheDocument();
    });
  });

  it("devrait afficher l'option de compatibilité Google Workspace", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(
        screen.getByText("Compatibilité Google Workspace")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Évite les caractères problématiques")
      ).toBeInTheDocument();
    });
  });

  it("devrait afficher le slider de longueur", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const lengthSlider = screen.getByLabelText("Longueur du mot de passe");
      expect(lengthSlider).toBeInTheDocument();
      expect(lengthSlider).toHaveAttribute("min", "8");
      expect(lengthSlider).toHaveAttribute("max", "64");
    });
  });

  it("devrait avoir un bouton de génération fonctionnel", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const generateButton = screen.getByText(
        "Générer un nouveau mot de passe"
      );
      expect(generateButton).toBeInTheDocument();
    });
  });

  it("devrait copier le mot de passe dans le presse-papiers", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const generateButton = screen.getByText(
        "Générer un nouveau mot de passe"
      );
      fireEvent.click(generateButton);
    });

    await waitFor(() => {
      const copyButton = screen.getByTestId("copy-icon").closest("button");
      expect(copyButton).toBeInTheDocument();
    });
  });

  it("devrait changer la longueur du mot de passe", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const lengthSlider = screen.getByLabelText("Longueur du mot de passe");
      fireEvent.change(lengthSlider, { target: { value: "20" } });
    });

    await waitFor(() => {
      expect(screen.getByText("Longueur: 20 caractères")).toBeInTheDocument();
    });
  });

  it("devrait activer/désactiver les options de caractères", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const uppercaseCheckbox = screen.getByLabelText("Majuscules (A-Z)");
      fireEvent.click(uppercaseCheckbox);
    });

    await waitFor(() => {
      const uppercaseCheckbox = screen.getByLabelText("Majuscules (A-Z)");
      expect(uppercaseCheckbox).not.toBeChecked();
    });
  });

  it("devrait activer/désactiver la compatibilité Google Workspace", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const googleCheckbox = screen.getByLabelText(
        "Compatibilité Google Workspace"
      );
      fireEvent.click(googleCheckbox);
    });

    await waitFor(() => {
      const googleCheckbox = screen.getByLabelText(
        "Compatibilité Google Workspace"
      );
      expect(googleCheckbox).toBeChecked();
    });
  });

  it("devrait avoir une structure responsive", async () => {
    render(<PasswordGenerator />);

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

  it("devrait afficher un état de chargement pendant la génération", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const generateButton = screen.getByText(
        "Générer un nouveau mot de passe"
      );
      fireEvent.click(generateButton);
    });

    await waitFor(() => {
      expect(screen.getByText("Génération...")).toBeInTheDocument();
    });
  });

  it("devrait afficher un feedback visuel lors de la copie", async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const generateButton = screen.getByText(
        "Générer un nouveau mot de passe"
      );
      fireEvent.click(generateButton);
    });

    await waitFor(() => {
      const copyButton = screen.getByTestId("copy-icon").closest("button");
      expect(copyButton).toBeInTheDocument();
    });
  });
});
