/**
 * Test pour valider la compacité du design pour écran MacBook 15 pouces
 * Résolution typique: 1440x900px
 */

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PasswordGeneratorV2 from '@/components/password/PasswordGeneratorV2';

// Mocks
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

describe('Design Compact MacBook 15"', () => {
  it('devrait avoir des espaces réduits optimisés pour MacBook 15"', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier que la section principale utilise des espaces compacts
    const section = document.querySelector('.msp-section-generator');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('py-8'); // Au lieu de py-20
    
    // Vérifier que le container principal est plus compact
    const mainCard = section?.querySelector('.msp-card');
    expect(mainCard).toHaveClass('p-6'); // Au lieu de p-8 lg:p-12
  });

  it('devrait avoir un header compact avec petites icônes', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier le titre compact
    expect(screen.getByText('Générateur Sécurisé')).toBeInTheDocument();
    expect(screen.getByText('Chiffrement cryptographique avancé')).toBeInTheDocument();
    
    // Vérifier que l'icône et le titre sont plus petits
    const iconContainer = document.querySelector('.w-12.h-12'); // Au lieu de w-16 h-16
    expect(iconContainer).toBeInTheDocument();
  });

  it('devrait avoir un champ de mot de passe avec hauteur réduite', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier que le champ password a une hauteur réduite
    const passwordInput = screen.getByLabelText('Mot de passe généré');
    expect(passwordInput).toHaveClass('h-12'); // Au lieu de h-20
    expect(passwordInput).toHaveClass('text-lg'); // Au lieu de text-2xl
  });

  it('devrait avoir un bouton de génération compact', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier le bouton de génération
    const generateButton = screen.getByRole('button', { name: /générer un nouveau mot de passe/i });
    expect(generateButton).toHaveClass('h-12'); // Au lieu de h-16
    expect(generateButton).toHaveClass('text-lg'); // Au lieu de text-xl
  });

  it('devrait organiser la configuration en grille compacte', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier la grille 2 colonnes pour longueur et Google Workspace
    const gridContainer = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
    
    // Vérifier les cartes compactes
    const compactCards = gridContainer?.querySelectorAll('.p-4'); // Au lieu de p-6
    expect(compactCards?.length).toBeGreaterThanOrEqual(2);
  });

  it('devrait avoir des types de caractères en grille 2x2 compacte', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier que les types de caractères sont en grille 2 colonnes
    const characterTypesGrid = document.querySelector('fieldset.grid.grid-cols-2');
    expect(characterTypesGrid).toBeInTheDocument();
    
    // Vérifier les 4 types de caractères
    expect(screen.getByText('Majuscules')).toBeInTheDocument();
    expect(screen.getByText('Minuscules')).toBeInTheDocument();
    expect(screen.getByText('Chiffres')).toBeInTheDocument();
    expect(screen.getByText('Symboles')).toBeInTheDocument();
  });

  it('devrait avoir des éléments avec des tailles de police adaptées', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier les tailles de texte compactes
    const container = document.querySelector('.msp-section-generator');
    
    // Titre principal compact
    expect(screen.getByText('Générateur Sécurisé')).toHaveClass('text-2xl'); // Au lieu de text-4xl
    
    // Configuration
    expect(screen.getByText('Configuration')).toHaveClass('text-lg'); // Au lieu de text-2xl
    
    // Labels de configuration
    expect(screen.getByText('Longueur')).toHaveClass('text-lg'); // Au lieu de text-xl
  });

  it('devrait avoir des espaces verticaux réduits', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier les espaces entre sections
    const mainContainer = document.querySelector('.space-y-6'); // Au lieu de space-y-10
    expect(mainContainer).toBeInTheDocument();
    
    // Vérifier les espaces dans la configuration
    const configContainer = document.querySelector('.space-y-4'); // Au lieu de space-y-8
    expect(configContainer).toBeInTheDocument();
  });

  it('devrait avoir des éléments interactifs de taille optimale', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier le bouton copier compact
    const copyButton = document.querySelector('.h-8'); // Au lieu de h-14
    expect(copyButton).toBeInTheDocument();
    
    // Vérifier les checkboxes plus petites
    const checkboxes = document.querySelectorAll('input[type="checkbox"].w-4.h-4'); // Au lieu de w-5 h-5
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  it('devrait maintenir l\'accessibilité malgré la compacité', () => {
    render(<PasswordGeneratorV2 />);
    
    // Vérifier que les labels sont toujours présents
    expect(screen.getByLabelText('Mot de passe généré')).toBeInTheDocument();
    
    // Vérifier les rôles ARIA
    expect(screen.getByRole('button', { name: /générer/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Bâtiment' })).toBeInTheDocument();
    
    // Vérifier le fieldset pour les types de caractères
    const fieldset = document.querySelector('fieldset');
    expect(fieldset).toBeInTheDocument();
    
    // Vérifier la légende pour l'accessibilité
    const legend = fieldset?.querySelector('legend.sr-only');
    expect(legend).toBeInTheDocument();
  });
});