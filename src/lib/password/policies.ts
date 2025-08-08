// Centralisation des règles de génération de mots de passe
// Source de vérité unique utilisée par les composants et les tests

export const UPPERCASE_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const LOWERCASE_LETTERS = "abcdefghijklmnopqrstuvwxyz";
export const DIGITS = "0123456789";

// Ensemble complet utilisé en mode standard
export const STANDARD_SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?/~`";

// Ensemble approuvé pour Google Workspace (exclusion de / ~ `)
export const GOOGLE_WORKSPACE_SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?";

// Caractères visuellement similaires exclus en mode Google Workspace
export const EXCLUDED_LOOKALIKE_REGEX = /[il1Lo0O]/g;

export type CharsetOptions = {
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  googleWorkspaceCompatible: boolean;
};

export function buildCharset(options: CharsetOptions): string {
  const {
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
    googleWorkspaceCompatible,
  } = options;

  let charset = "";

  if (includeUppercase) charset += UPPERCASE_LETTERS;
  if (includeLowercase) charset += LOWERCASE_LETTERS;
  if (includeNumbers) charset += DIGITS;
  if (includeSymbols)
    charset += googleWorkspaceCompatible
      ? GOOGLE_WORKSPACE_SYMBOLS
      : STANDARD_SYMBOLS;

  if (googleWorkspaceCompatible) {
    charset = charset.replace(EXCLUDED_LOOKALIKE_REGEX, "");
  }

  // Fallback minimal si aucune option n'est cochée
  if (!charset) charset = LOWERCASE_LETTERS;

  return charset;
}
