# Documentation API - MySecurePassword

## 🎯 Vue d'ensemble

MySecurePassword est une application frontend uniquement, sans API backend. Toute la logique de génération de mots de passe se déroule côté client pour garantir la sécurité et la confidentialité.

## 🔐 Sécurité

### Principe de Fonctionnement

- **Aucun stockage** : Les mots de passe ne quittent jamais le navigateur
- **Génération locale** : Web Crypto API native du navigateur
- **Pas de réseau** : Aucune requête HTTP pour la génération
- **Confidentialité totale** : Aucune donnée envoyée à un serveur

## 🛠️ Technologies Utilisées

### Web Crypto API

```typescript
// Génération cryptographiquement sécurisée
const array = new Uint8Array(length);
window.crypto.getRandomValues(array);

let password = "";
for (let i = 0; i < length; i++) {
  password += charset[array[i] % charset.length];
}
```

### Compatibilité Navigateur

- **Chrome** : 60+ (Web Crypto API supportée)
- **Firefox** : 55+ (Web Crypto API supportée)
- **Safari** : 11+ (Web Crypto API supportée)
- **Edge** : 79+ (Web Crypto API supportée)

## 📋 Fonctionnalités

### Génération de Mots de Passe

#### Paramètres

```typescript
interface PasswordOptions {
  length: number; // 8-64 caractères
  includeUppercase: boolean; // A-Z
  includeLowercase: boolean; // a-z
  includeNumbers: boolean; // 0-9
  includeSymbols: boolean; // !@#$%^&*()_+-=
  googleWorkspaceCompatible: boolean; // Exclusion caractères problématiques
}
```

#### Algorithme de Génération

1. **Construction du charset** : Concaténation des caractères sélectionnés
2. **Filtrage Google Workspace** : Exclusion des caractères problématiques si activé
3. **Génération cryptographique** : Utilisation de `crypto.getRandomValues()`
4. **Construction du mot de passe** : Sélection aléatoire dans le charset

#### Caractères Exclus (Google Workspace)

```typescript
// Caractères similaires
const similarChars = /[il1Lo0O]/g;

// Caractères ambigus et problématiques
const ambiguousChars = /[{}[\]()\/\\'"`~,;:.<>]/g;
```

### Analyse de Force

#### Critères d'Évaluation

- **Longueur** : +2 points si ≥12, +1 si ≥8
- **Majuscules** : +1 point si présentes
- **Minuscules** : +1 point si présentes
- **Chiffres** : +1 point si présents
- **Symboles** : +1 point si présents
- **Répétitions** : -1 point si caractères répétés

#### Niveaux de Force

- **Très fort** : 5+ points (vert)
- **Fort** : 3-4 points (bleu)
- **Moyen** : 2 points (jaune)
- **Faible** : 0-1 point (rouge)

## 🎨 Interface Utilisateur

### Composants React

#### PasswordGenerator

```typescript
interface PasswordGeneratorProps {
  // Aucune prop requise - composant autonome
}

// États internes
const [password, setPassword] = useState("");
const [copied, setCopied] = useState(false);
const [isGenerating, setIsGenerating] = useState(false);
const [options, setOptions] = useState<PasswordOptions>({...});
```

#### Événements

- **Génération** : `onClick` sur le bouton "Générer"
- **Copie** : `onClick` sur l'icône de copie
- **Configuration** : `onChange` sur les inputs de configuration

### Responsive Design

- **Mobile** : Layout en colonne unique
- **Tablet** : Layout en 2 colonnes
- **Desktop** : Layout complet avec sidebar

## 🔧 Configuration

### Variables d'Environnement

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Configuration Tailwind

```typescript
// tailwind.config.ts
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette personnalisée
      },
    },
  },
};
```

## 🧪 Tests

### Structure des Tests

```typescript
// tests/components/PasswordGenerator.test.tsx
describe('PasswordGenerator', () => {
  it('devrait générer un mot de passe', async () => {
    render(<PasswordGenerator />);
    const button = screen.getByText('Générer');
    fireEvent.click(button);

    await waitFor(() => {
      const input = screen.getByPlaceholderText('...');
      expect(input).toHaveValue(expect.stringMatching(/^[A-Z]{16}$/));
    });
  });
});
```

### Mocks Requis

```typescript
// Mock Web Crypto API
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: vi.fn(() => new Uint8Array([...]))
  }
});

// Mock Clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn() }
});
```

## 🚀 Performance

### Métriques Cibles

- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

### Optimisations

- **Bundle Size** : < 100KB (gzipped)
- **Images** : Optimisées et lazy loading
- **Fonts** : Google Fonts avec display=swap
- **CSS** : PurgeCSS pour Tailwind

## 🔍 Monitoring

### Métriques Utilisateur

- **Générations** : Nombre de mots de passe générés
- **Copies** : Nombre de copies effectuées
- **Configurations** : Options les plus utilisées
- **Erreurs** : Problèmes de génération ou copie

### Outils de Monitoring

- **Vercel Analytics** : Métriques de performance
- **Google Analytics** : Comportement utilisateur
- **Sentry** : Gestion d'erreurs (optionnel)

## 🛡️ Sécurité

### Bonnes Pratiques

- **HTTPS uniquement** : Redirection automatique
- **CSP Headers** : Content Security Policy
- **HSTS** : HTTP Strict Transport Security
- **XSS Protection** : Headers de sécurité

### Audit de Sécurité

```bash
# Audit des dépendances
npm audit

# Scan de sécurité
npm run security:scan

# Tests de pénétration
npm run security:test
```

## 📚 Références

### Documentation Officielle

- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [Next.js 15](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)

### Standards

- [WCAG 2.1 AA](https://www.w3.org/WAI/WCAG21/AA/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web Security Guidelines](https://web.dev/security/)

---

_Dernière mise à jour : Décembre 2024_
