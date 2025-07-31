import { t, translations } from '@/lib/i18n';

describe('i18n', () => {
  it('should return French translation by default', () => {
    expect(t('scrollToTop')).toBe('Retour en haut de la page');
    expect(t('passwordGenerator')).toBe('Générateur de mots de passe');
  });

  it('should return English translation when specified', () => {
    expect(t('scrollToTop', 'en')).toBe('Back to top');
    expect(t('passwordGenerator', 'en')).toBe('Password Generator');
  });

  it('should fallback to French for invalid locale', () => {
    // @ts-expect-error Testing invalid locale
    expect(t('scrollToTop', 'invalid')).toBe('Retour en haut de la page');
  });

  it('should have all required translation keys', () => {
    const requiredKeys = [
      'scrollToTop',
      'passwordGenerator',
      'generatePassword',
      'generating',
      'copy',
      'copied',
      'configuration',
      'length',
      'characters',
      'uppercase',
      'lowercase',
      'numbers',
      'symbols',
      'googleWorkspace',
      'googleWorkspaceDesc',
      'placeholder'
    ];

    requiredKeys.forEach(key => {
      expect(translations.fr[key as keyof typeof translations.fr]).toBeDefined();
      expect(translations.en[key as keyof typeof translations.en]).toBeDefined();
    });
  });

  it('should have consistent translation keys between locales', () => {
    const frKeys = Object.keys(translations.fr);
    const enKeys = Object.keys(translations.en);
    
    expect(frKeys.sort()).toEqual(enKeys.sort());
  });
});