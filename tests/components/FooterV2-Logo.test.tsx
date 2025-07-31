/**
 * Test pour valider l'intégration du nouveau logo dans FooterV2
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FooterV2 from '@/components/layout/FooterV2';

// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, priority, ...props }: any) => (
    <img 
      src={src} 
      alt={alt} 
      {...props} 
      {...(priority && { priority: 'true' })}
    />
  ),
}));

describe('FooterV2 - Nouveau Logo', () => {
  describe('Intégration du Logo V2', () => {
    it('devrait afficher le nouveau logo MySecurePassword', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('src', '/mysecurepassword-logo-v2-min.png');
    });

    it('devrait avoir les bonnes dimensions pour le footer', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toHaveAttribute('width', '64');
      expect(logoImage).toHaveAttribute('height', '64');
      expect(logoImage).toHaveClass('w-20', 'h-20', 'lg:w-24', 'lg:h-24', 'object-contain');
    });

    it('devrait être dans un conteneur simple sans fond coloré', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      const logoContainer = logoImage.closest('div');
      
      expect(logoContainer).toBeInTheDocument();
      expect(logoContainer).toHaveClass(
        'flex', 'items-center', 'justify-center', 'flex-shrink-0'
      );
      expect(logoContainer).not.toHaveClass('msp-logo');
    });

    it('devrait maintenir la structure du footer avec le nouveau logo', () => {
      render(<FooterV2 />);
      
      // Vérifier que le footer existe toujours
      const footer = document.querySelector('footer.msp-section-footer');
      expect(footer).toBeInTheDocument();
      
      // Vérifier que les autres éléments sont toujours présents
      expect(screen.getByText('MySecurePassword')).toBeInTheDocument();
      expect(screen.getByText('Solution française')).toBeInTheDocument();
      expect(screen.getByText('Open Source')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('devrait avoir un texte alternatif accessible', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toBeInTheDocument();
      
      // Le texte alternatif doit être descriptif et accessible
      expect(logoImage.getAttribute('alt')).toBe('MySecurePassword Logo');
    });

    it('devrait être positionné avec le titre et la description', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      const parentContainer = logoImage.closest('.flex.items-center.gap-4');
      
      expect(parentContainer).toBeInTheDocument();
      expect(parentContainer?.textContent).toContain('MySecurePassword');
      expect(parentContainer?.textContent).toContain('Solution française');
    });

    it('ne devrait plus contenir l\'ancien logo texte "MSP"', () => {
      render(<FooterV2 />);
      
      // Vérifier que l'ancien texte "MSP" n'est plus présent
      expect(screen.queryByText('MSP')).not.toBeInTheDocument();
    });
  });

  describe('Compatibilité avec le Design V2', () => {
    it('devrait maintenir le fond bleu très foncé du footer', () => {
      render(<FooterV2 />);
      
      const footer = document.querySelector('footer.msp-section-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('msp-section-footer');
    });

    it('devrait maintenir la grille responsive', () => {
      render(<FooterV2 />);
      
      const gridContainer = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-3');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass(
        'grid', 'grid-cols-1', 'lg:grid-cols-3', 'gap-12'
      );
    });

    it('devrait maintenir tous les liens et sections', () => {
      render(<FooterV2 />);
      
      // Vérifier les liens légaux
      expect(screen.getByText('Politique de confidentialité')).toBeInTheDocument();
      expect(screen.getByText('Mentions légales')).toBeInTheDocument();
      
      // Vérifier la section Open Source
      expect(screen.getByText('Code source')).toBeInTheDocument();
      
      // Vérifier le formulaire de contact
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Message')).toBeInTheDocument();
    });

    it('devrait avoir tous les textes en blanc', () => {
      render(<FooterV2 />);
      
      const whiteTexts = document.querySelectorAll('.msp-text-white');
      expect(whiteTexts.length).toBeGreaterThan(0);
      
      // Vérifier les éléments principaux
      const title = screen.getByText('MySecurePassword');
      expect(title).toHaveClass('msp-text-white');
    });

    it('devrait maintenir le copyright et les mentions', () => {
      render(<FooterV2 />);
      
      expect(screen.getByText(/© 2024 MySecurePassword/)).toBeInTheDocument();
      expect(screen.getAllByText(/Développé en France/).length).toBeGreaterThan(0);
      expect(screen.getByText(/Code source disponible/)).toBeInTheDocument();
    });
  });

  describe('Taille adaptée au Footer', () => {
    it('devrait avoir une taille plus petite que dans le header', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      
      // Footer: w-20 h-20 lg:w-24 lg:h-24 (80x80px → 96x96px)
      expect(logoImage).toHaveClass('w-20', 'h-20', 'lg:w-24', 'lg:h-24');
      
      // Vérifier que ce n'est pas les classes du header (w-24 h-24 lg:w-28 lg:h-28)
      expect(logoImage).not.toHaveClass('w-16', 'h-16');
      expect(logoImage).not.toHaveClass('lg:w-20', 'lg:h-20');
    });

    it('devrait maintenir les proportions avec object-contain', () => {
      render(<FooterV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toHaveClass('object-contain');
    });
  });
});