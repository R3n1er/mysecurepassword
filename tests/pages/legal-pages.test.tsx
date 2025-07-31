/**
 * Tests pour les pages légales (mentions légales et politique de confidentialité)
 * Validation de l'accessibilité, contenu et navigation
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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

describe('Pages Légales', () => {
  describe('Politique de Confidentialité', () => {
    it('devrait afficher le titre principal', () => {
      render(<PrivacyPolicyPage />);
      
      expect(screen.getByRole('heading', { level: 1, name: /politique de confidentialité/i })).toBeInTheDocument();
      expect(screen.getByText('Protection de vos données personnelles')).toBeInTheDocument();
    });

    it('devrait contenir les sections obligatoires RGPD', () => {
      render(<PrivacyPolicyPage />);
      
      // Sections obligatoires
      expect(screen.getByText('Informations Générales')).toBeInTheDocument();
      expect(screen.getByText('Collecte de Données')).toBeInTheDocument();
      expect(screen.getByText('Cookies et Stockage')).toBeInTheDocument();
      expect(screen.getByText('Sécurité Technique')).toBeInTheDocument();
      expect(screen.getByText('Vos Droits RGPD')).toBeInTheDocument();
      expect(screen.getByText('Contact & Questions')).toBeInTheDocument();
    });

    it('devrait mentionner explicitement "aucune collecte"', () => {
      render(<PrivacyPolicyPage />);
      
      expect(screen.getByText(/aucune collecte de données personnelles/i)).toBeInTheDocument();
      expect(screen.getByText(/ne collecte, ne stocke et ne transmet aucune donnée/i)).toBeInTheDocument();
    });

    it('devrait lister les droits RGPD', () => {
      render(<PrivacyPolicyPage />);
      
      expect(screen.getByText(/droit d'accès/i)).toBeInTheDocument();
      expect(screen.getByText(/droit de rectification/i)).toBeInTheDocument();
      expect(screen.getByText(/droit d'effacement/i)).toBeInTheDocument();
      expect(screen.getByText(/droit de portabilité/i)).toBeInTheDocument();
      expect(screen.getByText(/droit d'opposition/i)).toBeInTheDocument();
    });

    it('devrait avoir un lien vers GitHub', () => {
      render(<PrivacyPolicyPage />);
      
      const githubLink = screen.getByRole('link', { name: /github repository/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/R3n1er/mysecurepassword');
      expect(githubLink).toHaveAttribute('target', '_blank');
    });

    it('devrait avoir des icônes accessibles', () => {
      render(<PrivacyPolicyPage />);
      
      // Vérifier les icônes principales avec des éléments visuels
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(5);
    });

    it('devrait afficher la date de mise à jour', () => {
      render(<PrivacyPolicyPage />);
      
      expect(screen.getByText('Décembre 2024')).toBeInTheDocument();
    });
  });

  describe('Mentions Légales', () => {
    it('devrait afficher le titre principal', () => {
      render(<LegalMentionsPage />);
      
      expect(screen.getByRole('heading', { level: 1, name: /mentions légales/i })).toBeInTheDocument();
      expect(screen.getByText('Informations légales et conditions d\'utilisation')).toBeInTheDocument();
    });

    it('devrait contenir les sections légales essentielles', () => {
      render(<LegalMentionsPage />);
      
      expect(screen.getByText('Éditeur du Site')).toBeInTheDocument();
      expect(screen.getByText('Propriété Intellectuelle')).toBeInTheDocument();
      expect(screen.getByText('Conditions d\'Utilisation')).toBeInTheDocument();
      expect(screen.getByText('Limitation de Responsabilité')).toBeInTheDocument();
      expect(screen.getByText('Droit Applicable')).toBeInTheDocument();
    });

    it('devrait mentionner le caractère open source', () => {
      render(<LegalMentionsPage />);
      
      expect(screen.getAllByText(/projet open source/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/code source ouvert et auditable/i).length).toBeGreaterThan(0);
    });

    it('devrait lister les usages autorisés et interdits', () => {
      render(<LegalMentionsPage />);
      
      expect(screen.getByText(/usage autorisé/i)).toBeInTheDocument();
      expect(screen.getByText(/usage interdit/i)).toBeInTheDocument();
      expect(screen.getByText(/génération de mots de passe pour usage personnel/i)).toBeInTheDocument();
      expect(screen.getByText(/tentative de reverse engineering malveillant/i)).toBeInTheDocument();
    });

    it('devrait mentionner la conformité française et européenne', () => {
      render(<LegalMentionsPage />);
      
      expect(screen.getByText(/droit français/i)).toBeInTheDocument();
      expect(screen.getAllByText(/rgpd/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/france/i).length).toBeGreaterThan(0);
    });

    it('devrait avoir un lien externe vers GitHub', () => {
      render(<LegalMentionsPage />);
      
      const githubLink = screen.getByRole('link', { name: /github repository/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute('href', 'https://github.com/R3n1er/mysecurepassword');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('devrait afficher la date de mise à jour', () => {
      render(<LegalMentionsPage />);
      
      expect(screen.getByText('Décembre 2024')).toBeInTheDocument();
    });
  });

  describe('Accessibilité et Structure', () => {
    it('devrait avoir une structure de headings logique (Privacy)', () => {
      render(<PrivacyPolicyPage />);
      
      // H1 principal - être plus spécifique
      expect(screen.getByRole('heading', { level: 1, name: /politique de confidentialité/i })).toBeInTheDocument();
      
      // H2 sections
      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings.length).toBeGreaterThanOrEqual(5);
    });

    it('devrait avoir une structure de headings logique (Legal)', () => {
      render(<LegalMentionsPage />);
      
      // H1 principal - être plus spécifique
      expect(screen.getByRole('heading', { level: 1, name: /mentions légales/i })).toBeInTheDocument();
      
      // H2 sections
      const h2Headings = screen.getAllByRole('heading', { level: 2 });
      expect(h2Headings.length).toBeGreaterThanOrEqual(5);
    });

    it('devrait avoir des liens avec des attributs accessibles', () => {
      render(<PrivacyPolicyPage />);
      
      // Vérifier les liens externes
      const externalLinks = document.querySelectorAll('a[target="_blank"]');
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('devrait utiliser les classes MSP cohérentes', () => {
      render(<PrivacyPolicyPage />);
      
      // Vérifier les classes MSP
      expect(document.querySelector('.msp-section-generator')).toBeInTheDocument();
      expect(document.querySelector('.msp-card')).toBeInTheDocument();
      expect(document.querySelector('.msp-text-white')).toBeInTheDocument();
    });

    it('devrait avoir des couleurs contrastées pour l\'accessibilité', () => {
      render(<LegalMentionsPage />);
      
      // Vérifier les classes de couleur à contraste élevé
      const whiteTexts = document.querySelectorAll('.msp-text-white');
      expect(whiteTexts.length).toBeGreaterThan(10);
      
      // Vérifier les alertes colorées avec bon contraste
      const alertBoxes = document.querySelectorAll('.bg-green-500\\/20, .bg-yellow-500\\/20, .bg-blue-500\\/20');
      expect(alertBoxes.length).toBeGreaterThan(0);
    });
  });

  describe('Navigation et Integration', () => {
    it('devrait avoir le header et footer intégrés (Privacy)', () => {
      render(<PrivacyPolicyPage />);
      
      // Header présent - vérifier la structure MSP
      expect(document.querySelector('.msp-header')).toBeInTheDocument();
      expect(screen.getAllByText('Solution française').length).toBeGreaterThan(0);
    });

    it('devrait avoir le header et footer intégrés (Legal)', () => {
      render(<LegalMentionsPage />);
      
      // Header présent - vérifier la structure MSP  
      expect(document.querySelector('.msp-header')).toBeInTheDocument();
      expect(screen.getAllByText('Solution française').length).toBeGreaterThan(0);
    });

    it('devrait maintenir la cohérence visuelle avec le design V2', () => {
      render(<PrivacyPolicyPage />);
      
      // Vérifier la présence des classes de design V2
      expect(document.querySelector('.msp-glass-overlay')).toBeInTheDocument();
      
      // Vérifier les icônes et la structure
      const iconContainers = document.querySelectorAll('.w-16.h-16, .w-6.h-6');
      expect(iconContainers.length).toBeGreaterThan(5);
    });
  });
});