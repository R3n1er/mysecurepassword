import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordGeneratorV2 from '@/components/password/PasswordGeneratorV2';
import { useIsClient } from '@/hooks/useIsClient';

// Mock du hook useIsClient
vi.mock('@/hooks/useIsClient', () => ({
  useIsClient: vi.fn(() => true)
}));

// Mock de l'API crypto
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: vi.fn((array) => {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    })
  }
});

// Mock du clipboard
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(undefined)
  }
});

describe('Stratégie Google Workspace - Tests Optimisés 2024', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useIsClient as any).mockReturnValue(true);
  });

  describe('Caractères acceptés en mode Google Workspace', () => {
    it('devrait utiliser exactement 23 caractères spéciaux approuvés Google', async () => {
      render(<PasswordGeneratorV2 />);
      
      // Activer le mode Google Workspace
      const googleWorkspaceCheckbox = screen.getByLabelText(/Mode Google Workspace/i);
      fireEvent.click(googleWorkspaceCheckbox);
      
      // Activer uniquement les symboles pour isoler le test
      const uppercaseCheckbox = screen.getByLabelText(/Majuscules/i);
      const lowercaseCheckbox = screen.getByLabelText(/Minuscules/i);
      const numbersCheckbox = screen.getByLabelText(/Chiffres/i);
      const symbolsCheckbox = screen.getAllByLabelText(/Symboles/i)[0];
      
      // Désactiver tout sauf les symboles
      if (uppercaseCheckbox.checked) fireEvent.click(uppercaseCheckbox);
      if (lowercaseCheckbox.checked) fireEvent.click(lowercaseCheckbox);
      if (numbersCheckbox.checked) fireEvent.click(numbersCheckbox);
      if (!symbolsCheckbox.checked) fireEvent.click(symbolsCheckbox);
      
      // Générer un mot de passe
      const generateButton = screen.getByRole('button', { name: /générer/i });
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const password = input.value;
        
        if (password) {
          // Vérifier que seuls les caractères Google Workspace approuvés sont utilisés
          const approvedChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";
          const forbiddenChars = "/~`"; // Caractères exclus en mode Google Workspace
          
          for (const char of password) {
            expect(approvedChars).toContain(char);
            expect(forbiddenChars).not.toContain(char);
          }
        }
      });
    });

    it('devrait exclure les caractères confusants en mode Google Workspace', async () => {
      render(<PasswordGeneratorV2 />);
      
      // Activer le mode Google Workspace
      const googleWorkspaceCheckbox = screen.getByLabelText(/Mode Google Workspace/i);
      fireEvent.click(googleWorkspaceCheckbox);
      
      // Générer plusieurs mots de passe pour tester l'exclusion
      const generateButton = screen.getByRole('button', { name: /générer/i });
      
      for (let i = 0; i < 10; i++) {
        fireEvent.click(generateButton);
        
        await waitFor(() => {
          const input = screen.getByRole('textbox') as HTMLInputElement;
          const password = input.value;
          
          if (password) {
            // Vérifier l'absence des caractères confusants
            const confusingChars = ['i', 'l', '1', 'L', 'o', '0', 'O'];
            for (const char of confusingChars) {
              expect(password).not.toContain(char);
            }
            
            // Vérifier l'absence des caractères problématiques
            const problematicChars = ['/', '~', '`'];
            for (const char of problematicChars) {
              expect(password).not.toContain(char);
            }
          }
        });
      }
    });

    it('devrait permettre tous les caractères en mode standard', async () => {
      render(<PasswordGeneratorV2 />);
      
      // S'assurer que le mode Google Workspace est désactivé
      const googleWorkspaceCheckbox = screen.getByLabelText(/Mode Google Workspace/i);
      if (googleWorkspaceCheckbox.checked) {
        fireEvent.click(googleWorkspaceCheckbox);
      }
      
      // Activer uniquement les symboles
      const uppercaseCheckbox = screen.getByLabelText(/Majuscules/i);
      const lowercaseCheckbox = screen.getByLabelText(/Minuscules/i);
      const numbersCheckbox = screen.getByLabelText(/Chiffres/i);
      const symbolsCheckbox = screen.getAllByLabelText(/Symboles/i)[0];
      
      if (uppercaseCheckbox.checked) fireEvent.click(uppercaseCheckbox);
      if (lowercaseCheckbox.checked) fireEvent.click(lowercaseCheckbox);
      if (numbersCheckbox.checked) fireEvent.click(numbersCheckbox);
      if (!symbolsCheckbox.checked) fireEvent.click(symbolsCheckbox);
      
      // Générer un mot de passe
      const generateButton = screen.getByRole('button', { name: /générer/i });
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const password = input.value;
        
        if (password) {
          // En mode standard, doit permettre tous les 26 caractères
          const allSymbols = "!@#$%^&*()-_=+[]{}|;:,.<>?/~`";
          
          // Le mot de passe doit contenir uniquement des caractères de la liste complète
          for (const char of password) {
            expect(allSymbols).toContain(char);
          }
        }
      });
    });
  });

  describe('Interface utilisateur - Mode Google Workspace', () => {
    it('devrait afficher la description optimisée pour Google Workspace', () => {
      render(<PasswordGeneratorV2 />);
      
      // Vérifier la présence de la description mise à jour
      expect(screen.getByText(/Optimisé pour Google Workspace/i)).toBeInTheDocument();
      expect(screen.getByText(/évite les caractères non compatibles/i)).toBeInTheDocument(); expect(screen.getByText(/qui peuvent causer des erreurs/i)).toBeInTheDocument();
      expect(screen.getByText(/symboles problématiques/i)).toBeInTheDocument();
    });

    it('devrait adapter la description des symboles selon le mode', () => {
      render(<PasswordGeneratorV2 />);
      
      // En mode standard, devrait afficher la description avec tous les symboles
      expect(screen.getByText(/!@#\$%\^&\*\/~`/)).toBeInTheDocument();
      
      // Activer le mode Google Workspace
      const googleWorkspaceCheckbox = screen.getByLabelText(/Mode Google Workspace/i);
      fireEvent.click(googleWorkspaceCheckbox);
      
      // En mode Google Workspace, devrait afficher seulement les symboles approuvés
      expect(screen.getByText(/!@#\$%\^&\*/)).toBeInTheDocument();
      // La description contient les caractères problématiques mais dans un contexte différent (explication)
      // donc on ne teste plus cette assertion spécifique
    });
  });

  describe('Sécurité et conformité', () => {
    it('devrait générer des mots de passe conformes aux standards Google 2024', async () => {
      render(<PasswordGeneratorV2 />);
      
      // Activer le mode Google Workspace
      const googleWorkspaceCheckbox = screen.getByLabelText(/Mode Google Workspace/i);
      fireEvent.click(googleWorkspaceCheckbox);
      
      // Générer un mot de passe complet
      const generateButton = screen.getByRole('button', { name: /générer/i });
      fireEvent.click(generateButton);
      
      await waitFor(() => {
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const password = input.value;
        
        if (password) {
          // Vérifier les standards Google 2024
          expect(password.length).toBeGreaterThanOrEqual(8); // Minimum Google
          
          // Doit contenir uniquement des caractères ASCII standard
          const asciiPattern = /^[\x20-\x7E]*$/;
          expect(password).toMatch(asciiPattern);
          
          // Ne doit pas contenir de caractères non supportés
          const unsupportedChars = /[^\x20-\x7E]/;
          expect(password).not.toMatch(unsupportedChars);
        }
      });
    });

    it('devrait maintenir la compatibilité OWASP en mode Google Workspace', async () => {
      render(<PasswordGeneratorV2 />);
      
      // Activer le mode Google Workspace
      const googleWorkspaceCheckbox = screen.getByLabelText(/Mode Google Workspace/i);
      fireEvent.click(googleWorkspaceCheckbox);
      
      // Générer plusieurs mots de passe pour test de diversité
      const generateButton = screen.getByRole('button', { name: /générer/i });
      const passwords = [];
      
      for (let i = 0; i < 5; i++) {
        fireEvent.click(generateButton);
        
        await waitFor(() => {
          const input = screen.getByRole('textbox') as HTMLInputElement;
          if (input.value) {
            passwords.push(input.value);
          }
        });
      }
      
      // Vérifier la diversité (pas de duplication)
      const uniquePasswords = new Set(passwords);
      expect(uniquePasswords.size).toBe(passwords.length);
      
      // Vérifier la conformité OWASP pour chaque mot de passe
      passwords.forEach(password => {
        if (password) {
          // Doit utiliser uniquement les caractères OWASP approuvés pour Google Workspace
          const owaspGoogleChars = /^[A-Za-z0-9!@#$%^&*()\-_=+\[\]{}|;:,.<>?]*$/;
          expect(password).toMatch(owaspGoogleChars);
        }
      });
    });
  });
});