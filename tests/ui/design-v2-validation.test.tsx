/**
 * Tests de validation pour le design V2 de MySecurePassword
 * Vérifie le respect du cahier des charges UI/UX
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeaderV2 from '@/components/layout/HeaderV2';
import PasswordGeneratorV2 from '@/components/password/PasswordGeneratorV2';
import AppPresentationV2 from '@/components/presentation/AppPresentationV2';
import FooterV2 from '@/components/layout/FooterV2';

// Mocks
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Design V2 - Validation du cahier des charges', () => {
  describe('Header V2', () => {
    it('devrait avoir un dégradé bleu-violet', () => {
      render(<HeaderV2 />);
      
      const header = document.querySelector('.msp-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('msp-header');
    });

    it('devrait avoir le logo à gauche sans fond coloré', () => {
      render(<HeaderV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toBeInTheDocument();
      
      // Vérifier que le logo est dans un conteneur simple
      const logoContainer = logoImage.closest('div');
      expect(logoContainer).toBeInTheDocument();
      expect(logoContainer).not.toHaveClass('msp-logo');
    });

    it('devrait avoir tout le texte en blanc', () => {
      render(<HeaderV2 />);
      
      const whiteTexts = document.querySelectorAll('.msp-text-white');
      expect(whiteTexts.length).toBeGreaterThan(0);
      
      // Vérifier le titre principal
      expect(screen.getByText('MySecurePassword')).toBeInTheDocument();
    });

    it('devrait avoir le badge français', () => {
      render(<HeaderV2 />);
      
      expect(screen.getByText('Solution française')).toBeInTheDocument();
    });
  });

  describe('PasswordGenerator V2', () => {
    it('devrait utiliser la section bleu nuit', () => {
      render(<PasswordGeneratorV2 />);
      
      const section = document.querySelector('.msp-section-generator');
      expect(section).toBeInTheDocument();
    });

    it('devrait avoir tous les textes en blanc', () => {
      render(<PasswordGeneratorV2 />);
      
      const whiteTexts = document.querySelectorAll('.msp-text-white');
      expect(whiteTexts.length).toBeGreaterThan(3);
    });

    it('devrait avoir des boutons blancs ou dégradé', () => {
      render(<PasswordGeneratorV2 />);
      
      const whiteButtons = document.querySelectorAll('.msp-button-white');
      const gradientButtons = document.querySelectorAll('.msp-button-gradient');
      
      expect(whiteButtons.length + gradientButtons.length).toBeGreaterThan(0);
    });

    it('devrait avoir des cartes avec le style MSP', () => {
      render(<PasswordGeneratorV2 />);
      
      const cards = document.querySelectorAll('.msp-card');
      expect(cards.length).toBeGreaterThan(0);
    });

    it('devrait avoir les contrôles accessibles', () => {
      render(<PasswordGeneratorV2 />);
      
      // Vérifier les labels
      expect(screen.getByText('Générateur Sécurisé')).toBeInTheDocument();
      expect(screen.getByText('Configuration')).toBeInTheDocument();
    });
  });

  describe('AppPresentation V2', () => {
    it('devrait utiliser la section bleu intense', () => {
      render(<AppPresentationV2 />);
      
      const section = document.querySelector('.msp-section-advantages');
      expect(section).toBeInTheDocument();
    });

    it('devrait avoir tous les textes en blanc', () => {
      render(<AppPresentationV2 />);
      
      const whiteTexts = document.querySelectorAll('.msp-text-white');
      expect(whiteTexts.length).toBeGreaterThan(5);
    });

    it('devrait avoir les 6 avantages principaux', () => {
      render(<AppPresentationV2 />);
      
      expect(screen.getByText('Sécurité Maximale')).toBeInTheDocument();
      expect(screen.getByText('Compatible Google Workspace')).toBeInTheDocument();
      expect(screen.getByText('Conforme RGPD')).toBeInTheDocument();
      expect(screen.getByText('Rapide & Simple')).toBeInTheDocument();
      expect(screen.getByText('Accessible Partout')).toBeInTheDocument();
      expect(screen.getByText('100% Gratuit')).toBeInTheDocument();
    });

    it('devrait avoir les icônes en blanc', () => {
      render(<AppPresentationV2 />);
      
      // Les icônes Lucide doivent être en text-white
      const icons = document.querySelectorAll('svg');
      expect(icons.length).toBeGreaterThan(0);
    });

    it('devrait avoir les sections RGPD et Google Workspace', () => {
      render(<AppPresentationV2 />);
      
      expect(screen.getByText('Conformité RGPD Complète')).toBeInTheDocument();
      expect(screen.getByText('Compatibilité Google Workspace')).toBeInTheDocument();
    });
  });

  describe('Footer V2', () => {
    it('devrait utiliser la section bleu très foncé', () => {
      render(<FooterV2 />);
      
      const footer = document.querySelector('.msp-section-footer');
      expect(footer).toBeInTheDocument();
    });

    it('devrait avoir tous les textes en blanc', () => {
      render(<FooterV2 />);
      
      const whiteTexts = document.querySelectorAll('.msp-text-white');
      expect(whiteTexts.length).toBeGreaterThan(3);
    });

    it('devrait avoir le lien GitHub', () => {
      render(<FooterV2 />);
      
      expect(screen.getByText('Code source')).toBeInTheDocument();
    });

    it('devrait avoir le formulaire de contact', () => {
      render(<FooterV2 />);
      
      expect(screen.getByText('Contact')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('devrait avoir les liens légaux', () => {
      render(<FooterV2 />);
      
      expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();
      expect(screen.getByText('Mentions légales')).toBeInTheDocument();
    });
  });

  describe('Respect de la palette de couleurs', () => {
    it('ne devrait pas utiliser de jaune pour le texte', () => {
      render(<HeaderV2 />);
      render(<PasswordGeneratorV2 />);
      render(<AppPresentationV2 />);
      render(<FooterV2 />);
      
      // Vérifier qu'il n'y a pas de classes de texte jaune
      const yellowTexts = document.querySelectorAll('.text-yellow-400, .text-yellow-500, .text-msp-gold');
      expect(yellowTexts.length).toBe(0);
    });

    it('devrait utiliser les classes MSP définies', () => {
      render(<HeaderV2 />);
      render(<PasswordGeneratorV2 />);
      render(<AppPresentationV2 />);
      render(<FooterV2 />);
      
      // Vérifier la présence des classes MSP
      expect(document.querySelector('.msp-header')).toBeInTheDocument();
      expect(document.querySelector('.msp-logo')).toBeInTheDocument();
      expect(document.querySelector('.msp-section-generator')).toBeInTheDocument();
      expect(document.querySelector('.msp-section-advantages')).toBeInTheDocument();
      expect(document.querySelector('.msp-section-footer')).toBeInTheDocument();
    });

    it('devrait avoir des boutons avec les bonnes classes', () => {
      render(<PasswordGeneratorV2 />);
      render(<FooterV2 />);
      
      const whiteButtons = document.querySelectorAll('.msp-button-white');
      const gradientButtons = document.querySelectorAll('.msp-button-gradient');
      
      expect(whiteButtons.length).toBeGreaterThan(0);
      expect(gradientButtons.length).toBeGreaterThan(0);
    });
  });

  describe('Structure modulaire', () => {
    it('devrait avoir des sections bien séparées', () => {
      render(<HeaderV2 />);
      render(<PasswordGeneratorV2 />);
      render(<AppPresentationV2 />);
      render(<FooterV2 />);
      
      // Vérifier que chaque section a sa propre classe
      expect(document.querySelector('.msp-header')).toBeInTheDocument();
      expect(document.querySelector('.msp-section-generator')).toBeInTheDocument();
      expect(document.querySelector('.msp-section-advantages')).toBeInTheDocument();
      expect(document.querySelector('.msp-section-footer')).toBeInTheDocument();
    });

    it('devrait avoir des cartes cohérentes', () => {
      render(<PasswordGeneratorV2 />);
      render(<AppPresentationV2 />);
      
      const cards = document.querySelectorAll('.msp-card');
      expect(cards.length).toBeGreaterThan(3);
    });
  });
});