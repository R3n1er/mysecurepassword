export const translations = {
  fr: {
    scrollToTop: "Retour en haut de la page",
    passwordGenerator: "Générateur de mots de passe",
    generatePassword: "Générer",
    generating: "Génération en cours...",
    copy: "Copier",
    copied: "Copié !",
    configuration: "Configuration",
    length: "Longueur",
    characters: "Types de caractères",
    uppercase: "Majuscules",
    lowercase: "Minuscules",
    numbers: "Chiffres",
    symbols: "Symboles",
    googleWorkspace: "Mode Google Workspace",
    googleWorkspaceDesc:
      "Optimisé pour Google Workspace : évite les caractères similaires et les symboles réservés",
    placeholder:
      "Cliquez sur 'Générer' pour créer votre mot de passe sécurisé...",
  },
  en: {
    scrollToTop: "Back to top",
    passwordGenerator: "Password Generator",
    generatePassword: "Generate",
    generating: "Generating...",
    copy: "Copy",
    copied: "Copied!",
    configuration: "Configuration",
    length: "Length",
    characters: "Character types",
    uppercase: "Uppercase",
    lowercase: "Lowercase",
    numbers: "Numbers",
    symbols: "Symbols",
    googleWorkspace: "Google Workspace Mode",
    googleWorkspaceDesc:
      "Optimized for Google Workspace: avoids lookalike characters and reserved symbols",
    placeholder: "Click 'Generate' to create a secure password...",
  },
};

export function t(
  key: keyof typeof translations.fr,
  locale?: "fr" | "en" | string
) {
  const safeLocale: "fr" | "en" = locale === "en" ? "en" : "fr";
  return translations[safeLocale][key] ?? translations.fr[key];
}
