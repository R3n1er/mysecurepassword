/**
 * Test pour valider l'intégration du nouveau logo dans HeaderV2
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HeaderV2 from '@/components/layout/HeaderV2';

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

describe('HeaderV2 - Nouveau Logo', () => {
  describe('Intégration du Logo V2', () => {
    it('devrait afficher le nouveau logo MySecurePassword', () => {
      render(<HeaderV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute('src', '/mysecurepassword-logo-v2-min.png');
    });

    it('devrait avoir les bonnes dimensions pour le logo', () => {
      render(<HeaderV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toHaveAttribute('width', '80');
      expect(logoImage).toHaveAttribute('height', '80');
      expect(logoImage).toHaveClass('w-16', 'h-16', 'lg:w-20', 'lg:h-20', 'object-contain');
    });

    it('devrait avoir la priorité de chargement activée', () => {
      render(<HeaderV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      // Le mock Next.js convertit priority en attribut string
      expect(logoImage).toHaveAttribute('priority', 'true');
    });

    it('devrait être dans le conteneur avec le fond jaune (msp-logo)', () => {
      render(<HeaderV2 />);
      
      const logoContainer = document.querySelector('.msp-logo');
      expect(logoContainer).toBeInTheDocument();
      expect(logoContainer).toHaveClass(
        'flex', 'items-center', 'justify-center',
        'w-24', 'h-24', 'lg:w-32', 'lg:h-32',
        'p-4', 'flex-shrink-0'
      );
      
      const logoImage = logoContainer?.querySelector('img');
      expect(logoImage).toBeInTheDocument();
    });

    it('devrait maintenir la structure du header avec le nouveau logo', () => {
      render(<HeaderV2 />);
      
      // Vérifier que le header existe toujours
      const header = document.querySelector('header.msp-header');
      expect(header).toBeInTheDocument();
      
      // Vérifier que les autres éléments sont toujours présents
      expect(screen.getByText('MySecurePassword')).toBeInTheDocument();
      expect(screen.getByText('Générateur de mots de passe sécurisés')).toBeInTheDocument();
      expect(screen.getByText('Solution française')).toBeInTheDocument();
    });

    it('devrait conserver les classes CSS Design V2', () => {
      render(<HeaderV2 />);
      
      const header = document.querySelector('header');
      expect(header).toHaveClass('msp-header', 'relative', 'overflow-hidden');
      
      const overlay = document.querySelector('.msp-glass-overlay');
      expect(overlay).toBeInTheDocument();
    });

    it('devrait avoir un texte alternatif accessible', () => {
      render(<HeaderV2 />);
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toBeInTheDocument();
      
      // Le texte alternatif doit être descriptif et accessible
      expect(logoImage.getAttribute('alt')).toBe('MySecurePassword Logo');
    });

    it('devrait respecter le responsive design', () => {
      render(<HeaderV2 />);
      
      const logoContainer = document.querySelector('.msp-logo');
      expect(logoContainer).toHaveClass('w-24', 'h-24', 'lg:w-32', 'lg:h-32');
      
      const logoImage = screen.getByAltText('MySecurePassword Logo');
      expect(logoImage).toHaveClass('w-16', 'h-16', 'lg:w-20', 'lg:h-20');
    });
  });

  describe('Compatibilité avec le Design V2', () => {
    it('devrait maintenir le dégradé bleu-violet du header', () => {
      render(<HeaderV2 />);
      
      const header = document.querySelector('header.msp-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('msp-header');
    });

    it('devrait garder le fond jaune du logo (msp-logo)', () => {
      render(<HeaderV2 />);
      
      const logoContainer = document.querySelector('.msp-logo');
      expect(logoContainer).toBeInTheDocument();
      expect(logoContainer).toHaveClass('msp-logo');
    });

    it('devrait maintenir la disposition flex responsive', () => {
      render(<HeaderV2 />);
      
      const flexContainer = document.querySelector('.flex.flex-col.lg\\:flex-row');
      expect(flexContainer).toBeInTheDocument();
      expect(flexContainer).toHaveClass(
        'flex', 'flex-col', 'lg:flex-row',
        'items-center', 'lg:items-start', 'gap-6'
      );
    });

    it('ne devrait plus contenir l\'ancien logo texte "MSP"', () => {
      render(<HeaderV2 />);
      
      // Vérifier que l'ancien texte "MSP" et "Secure" n'est plus présent
      expect(screen.queryByText('MSP')).not.toBeInTheDocument();
      expect(screen.queryByText('Secure')).not.toBeInTheDocument();
    });
  });
});