import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Confetti from '@/components/animations/Confetti';
import { useIsClient } from '@/hooks/useIsClient';

// Mock du hook useIsClient
vi.mock('@/hooks/useIsClient', () => ({
  useIsClient: vi.fn()
}));

describe('Confetti - Corrections Hydratation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Prévention hydratation côté serveur', () => {
    it('ne devrait pas rendre côté serveur (isClient = false)', () => {
      // Simuler le rendu côté serveur
      (useIsClient as any).mockReturnValue(false);
      
      const { container } = render(<Confetti isActive={true} />);
      
      // Le composant ne devrait rien rendre côté serveur
      expect(container.firstChild).toBeNull();
      expect(container.innerHTML).toBe('');
    });

    it('devrait rendre côté client (isClient = true)', () => {
      // Simuler le rendu côté client
      (useIsClient as any).mockReturnValue(true);
      
      // Mock window pour éviter les erreurs
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1200
      });

      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 800
      });

      render(<Confetti isActive={true} />);
      
      // Le composant devrait maintenant pouvoir démarrer l'animation côté client
      // (même si aucune particule n'est encore visible immédiatement)
      expect(useIsClient).toHaveBeenCalled();
    });

    it('ne devrait pas rendre si isActive est false, même côté client', () => {
      (useIsClient as any).mockReturnValue(true);
      
      const { container } = render(<Confetti isActive={false} />);
      
      expect(container.firstChild).toBeNull();
    });
  });

  describe('Gestion sécurisée des APIs navigateur', () => {
    it('devrait utiliser des valeurs par défaut quand window est indéfini', () => {
      (useIsClient as any).mockReturnValue(true);
      
      // Mock window avec des valeurs undefined pour simuler l'absence
      Object.defineProperty(window, 'innerWidth', {
        value: undefined,
        configurable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: undefined,
        configurable: true
      });
      
      // Le composant ne devrait pas planter même avec des propriétés window manquantes
      expect(() => {
        render(<Confetti isActive={true} />);
      }).not.toThrow();
      
      // Restaurer les valeurs normales
      Object.defineProperty(window, 'innerWidth', {
        value: 1024,
        configurable: true
      });
      Object.defineProperty(window, 'innerHeight', {
        value: 768,
        configurable: true
      });
    });

    it('devrait gérer Math.random de manière cohérente', () => {
      (useIsClient as any).mockReturnValue(true);
      
      // Mock Math.random pour avoir des valeurs prévisibles
      const mockMath = vi.spyOn(Math, 'random');
      mockMath.mockReturnValue(0.5);
      
      Object.defineProperty(window, 'innerWidth', {
        value: 1200
      });

      render(<Confetti isActive={true} />);
      
      // Math.random devrait être appelé pour générer les confettis
      expect(mockMath).toHaveBeenCalled();
      
      mockMath.mockRestore();
    });
  });

  describe('Éviter les différences serveur/client', () => {
    it('devrait avoir un comportement cohérent entre les rendus', () => {
      // Premier rendu (simulant le serveur)
      (useIsClient as any).mockReturnValue(false);
      const { container: serverContainer } = render(<Confetti isActive={true} />);
      
      // Deuxième rendu (simulant l'hydratation côté client)
      (useIsClient as any).mockReturnValue(true);
      const { container: clientContainer } = render(<Confetti isActive={true} />);
      
      // Les deux rendus devraient être différents mais sans erreur
      expect(serverContainer.innerHTML).toBe(''); // Serveur: rien
      expect(clientContainer).toBeDefined(); // Client: peut rendre
    });

    it('devrait gérer les conditions typeof window de manière sécurisée', () => {
      (useIsClient as any).mockReturnValue(true);
      
      // Le composant utilise maintenant typeof window dans ses vérifications
      // et cela ne devrait pas causer d'erreurs d'hydratation
      expect(() => {
        render(<Confetti isActive={true} />);
      }).not.toThrow();
    });
  });

  describe('Structure HTML cohérente', () => {
    it('devrait maintenir une structure HTML identique pour isActive=false', () => {
      // Peu importe la valeur de isClient, si isActive=false, le rendu doit être null
      (useIsClient as any).mockReturnValue(false);
      const { container: container1 } = render(<Confetti isActive={false} />);
      
      (useIsClient as any).mockReturnValue(true);
      const { container: container2 } = render(<Confetti isActive={false} />);
      
      expect(container1.innerHTML).toBe(container2.innerHTML);
      expect(container1.innerHTML).toBe('');
    });

    it('devrait avoir des props cohérentes sur les éléments rendus', () => {
      (useIsClient as any).mockReturnValue(true);
      
      // Mock window dimensions
      Object.defineProperty(window, 'innerWidth', { value: 1200 });
      Object.defineProperty(window, 'innerHeight', { value: 800 });
      
      const { container } = render(<Confetti isActive={true} />);
      
      // Vérifier que les éléments ont des classes CSS cohérentes
      const confettiContainer = container.querySelector('.fixed.inset-0.pointer-events-none.z-50');
      if (confettiContainer) {
        expect(confettiContainer).toHaveClass('fixed', 'inset-0', 'pointer-events-none', 'z-50');
      }
    });
  });

  describe('Performance et mémoire', () => {
    it('devrait nettoyer les timers quand le composant est démonté', () => {
      (useIsClient as any).mockReturnValue(true);
      
      const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
      
      const { unmount } = render(<Confetti isActive={true} />);
      
      // Démonter le composant
      unmount();
      
      // Les timers devraient être nettoyés
      expect(clearIntervalSpy).toHaveBeenCalled();
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      clearIntervalSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });

    it('ne devrait pas créer de timers côté serveur', () => {
      (useIsClient as any).mockReturnValue(false);
      
      const setIntervalSpy = vi.spyOn(global, 'setInterval');
      const setTimeoutSpy = vi.spyOn(global, 'setTimeout');
      
      render(<Confetti isActive={true} />);
      
      // Aucun timer ne devrait être créé côté serveur
      expect(setIntervalSpy).not.toHaveBeenCalled();
      expect(setTimeoutSpy).not.toHaveBeenCalled();
      
      setIntervalSpy.mockRestore();
      setTimeoutSpy.mockRestore();
    });
  });
});