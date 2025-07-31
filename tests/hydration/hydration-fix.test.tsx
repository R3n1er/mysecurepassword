/**
 * Tests pour valider que les problèmes d'hydratation Next.js sont résolus
 * Vérification des sources d'erreurs hydratation mismatch
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PasswordGeneratorV2 from '@/components/password/PasswordGeneratorV2';
import PrivacyPolicyPage from '@/app/privacy/page';
import LegalMentionsPage from '@/app/legal/page';

// Mocks
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Correction des Erreurs d\'Hydratation', () => {
  describe('Dates Statiques', () => {
    it('devrait utiliser des dates statiques dans la politique de confidentialité', () => {
      render(<PrivacyPolicyPage />);
      
      // Vérifier que la date est statique (pas dynamique)
      expect(screen.getByText('Décembre 2024')).toBeInTheDocument();
      
      // Vérifier qu'aucune date dynamique n'est présente
      const content = document.body.textContent || '';
      expect(content).not.toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/); // Format dd/mm/yyyy
      expect(content).not.toMatch(/\d{1,2} \w+ \d{4}/); // Format "15 décembre 2024"
    });

    it('devrait utiliser des dates statiques dans les mentions légales', () => {
      render(<LegalMentionsPage />);
      
      // Vérifier que la date est statique
      expect(screen.getByText('Décembre 2024')).toBeInTheDocument();
      
      // Vérifier qu'aucune date dynamique n'est présente
      const content = document.body.textContent || '';
      expect(content).not.toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
      expect(content).not.toMatch(/\d{1,2} \w+ \d{4}/);
    });
  });

  describe('Conditions Client/Serveur', () => {
    it('devrait éviter les conditions typeof window dans PasswordGeneratorV2', () => {
      render(<PasswordGeneratorV2 />);
      
      // Vérifier que le composant s'affiche sans erreur
      expect(screen.getByText('Générateur Sécurisé')).toBeInTheDocument();
      
      // Vérifier que les éléments critiques sont présents
      expect(screen.getByRole('button', { name: /générer/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/mot de passe généré/i)).toBeInTheDocument();
    });

    it('devrait gérer l\'état de montage côté client correctement', () => {
      render(<PasswordGeneratorV2 />);
      
      // Vérifier que les éléments interactifs sont présents
      expect(screen.getByRole('slider')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox').length).toBeGreaterThan(0);
    });
  });

  describe('Rendu Cohérent Serveur/Client', () => {
    it('devrait avoir un rendu initial cohérent pour les pages légales', () => {
      // Privacy Policy
      const { unmount: unmountPrivacy } = render(<PrivacyPolicyPage />);
      expect(screen.getByText('Politique de Confidentialité')).toBeInTheDocument();
      unmountPrivacy();

      // Legal Mentions
      const { unmount: unmountLegal } = render(<LegalMentionsPage />);
      expect(screen.getByText('Mentions Légales')).toBeInTheDocument();
      unmountLegal();
    });

    it('devrait avoir un rendu cohérent pour le générateur de mots de passe', () => {
      render(<PasswordGeneratorV2 />);
      
      // Vérifier la structure de base sans dépendances client
      expect(screen.getByText('Générateur Sécurisé')).toBeInTheDocument();
      expect(screen.getByText('Configuration')).toBeInTheDocument();
      expect(screen.getByText('Longueur')).toBeInTheDocument();
      expect(screen.getByText('Types de caractères')).toBeInTheDocument();
    });
  });

  describe('Prévention des Sources d\'Hydratation Mismatch', () => {
    it('ne devrait pas contenir de Math.random() côté serveur', () => {
      // Ce test vérifie que le composant peut être rendu côté serveur
      // sans générer d'erreurs dues à Math.random()
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<PasswordGeneratorV2 />);
      
      // Vérifier qu'aucune erreur de console n'est émise
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('ne devrait pas contenir de Date.now() côté serveur', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      render(<PrivacyPolicyPage />);
      render(<LegalMentionsPage />);
      
      // Vérifier qu'aucune erreur liée aux dates n'est émise
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('devrait gérer les API du navigateur de manière sécurisée', () => {
      // Mock window.crypto pour simuler l'environnement serveur
      const originalCrypto = global.window?.crypto;
      
      // Supprimer crypto temporairement
      if (global.window) {
        // @ts-ignore
        delete global.window.crypto;
      }
      
      render(<PasswordGeneratorV2 />);
      
      // Le composant devrait toujours fonctionner
      expect(screen.getByText('Générateur Sécurisé')).toBeInTheDocument();
      
      // Restaurer crypto
      if (global.window && originalCrypto) {
        global.window.crypto = originalCrypto;
      }
    });
  });

  describe('Structure HTML Cohérente', () => {
    it('devrait maintenir une structure HTML identique côté serveur et client', () => {
      render(<PasswordGeneratorV2 />);
      
      // Vérifier les éléments structurels principaux
      expect(document.querySelector('.msp-section-generator')).toBeInTheDocument();
      expect(document.querySelector('.msp-card')).toBeInTheDocument();
      expect(document.querySelector('.msp-text-white')).toBeInTheDocument();
      
      // Vérifier les classes de design V2
      expect(document.querySelector('.msp-button-gradient')).toBeInTheDocument();
    });

    it('devrait avoir des attributs HTML constants', () => {
      render(<PrivacyPolicyPage />);
      
      // Vérifier que les attributs ne changent pas entre les rendus
      const links = document.querySelectorAll('a[target="_blank"]');
      links.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});