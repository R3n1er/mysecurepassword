# Guide de Développement - MySecurePassword

## 🚀 Vue d'ensemble

MySecurePassword est un générateur de mots de passe sécurisés 100% gratuit, compatible avec Google Workspace, développé avec Next.js 15 et Tailwind CSS.

## 🛠️ Stack Technique

### Frontend

- **Next.js 15** : Framework React avec App Router et Turbopack
- **TypeScript** : Typage statique pour la robustesse
- **Tailwind CSS 3** : Framework CSS utilitaire
- **Lucide React** : Icônes modernes
- **Vitest** : Tests unitaires et d'intégration

### Sécurité

- **Web Crypto API** : Génération cryptographiquement sécurisée
- **Aucun stockage** : Les mots de passe ne quittent jamais le navigateur
- **Compatibilité Google Workspace** : Caractères sûrs uniquement

## 📁 Structure du Projet

```
mysecurepassword/
├── src/
│   ├── app/                    # App Router Next.js
│   │   ├── globals.css         # Styles globaux
│   │   ├── layout.tsx          # Layout racine
│   │   └── page.tsx            # Page d'accueil
│   ├── components/             # Composants React
│   │   ├── password/
│   │   │   └── PasswordGenerator.tsx
│   │   └── ui/                 # Composants UI réutilisables
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── label.tsx
│   └── config/
│       └── env.ts              # Configuration environnement
├── tests/                      # Tests unitaires et d'intégration
│   ├── components/
│   ├── integration/
│   ├── pages/
│   └── utils/
├── documentations/             # Documentation
└── public/                    # Assets statiques
```

## 🎨 Design System

### Palette de Couleurs

- **Bleus** : `slate-900`, `blue-900`, `blue-600`, `blue-700`
- **Violets** : `purple-600`, `purple-700`
- **Jaunes/Oranges** : `yellow-400`, `orange-500`
- **Gris** : `slate-700`, `gray-50`, `gray-200`

### Composants UI

- **Cartes** : Fond blanc avec bordures et ombres
- **Boutons** : Gradients bleu-violet avec hover
- **Inputs** : Bordures grises avec focus bleu
- **Checkboxes** : Style moderne avec couleurs adaptées

## 🔧 Configuration

### Variables d'Environnement

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Scripts NPM

```bash
npm run dev          # Développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur de production
npm run test         # Tests Vitest
npm run test:run     # Tests en mode watch
```

## 🧪 Tests

### Structure des Tests

- **Tests Unitaires** : Composants individuels
- **Tests d'Intégration** : Flux complets
- **Tests Utilitaires** : Fonctions de génération

### Exécution des Tests

```bash
# Tous les tests
npm run test:run

# Tests en mode watch
npm run test

# Tests avec UI
npm run test:ui
```

### Exemple de Test

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordGenerator from '@/components/password/PasswordGenerator';

describe('PasswordGenerator', () => {
  it('devrait générer un mot de passe', async () => {
    render(<PasswordGenerator />);

    const generateButton = screen.getByText('Générer un nouveau mot de passe');
    fireEvent.click(generateButton);

    await waitFor(() => {
      const passwordInput = screen.getByPlaceholderText('Cliquez sur \'Générer\'');
      expect(passwordInput).toHaveValue(expect.stringMatching(/^[A-Z]{16}$/));
    });
  });
});
```

## 🔐 Sécurité

### Génération de Mots de Passe

```typescript
// Utilisation de Web Crypto API
const array = new Uint8Array(length);
window.crypto.getRandomValues(array);

let password = "";
for (let i = 0; i < length; i++) {
  password += charset[array[i] % charset.length];
}
```

### Compatibilité Google Workspace

```typescript
// Exclusion des caractères problématiques
if (googleWorkspaceCompatible) {
  availableChars = availableChars.replace(/[il1Lo0O]/g, "");
  availableChars = availableChars.replace(/[{}[\]()\/\\'"`~,;:.<>]/g, "");
}
```

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connecter le repository GitHub
2. Configuration automatique détectée
3. Déploiement automatique à chaque push

### Variables d'Environnement Vercel

```bash
NEXT_PUBLIC_APP_URL=https://mysecurepassword.fr
```

### Build de Production

```bash
npm run build
npm run start
```

## 🔧 Développement Local

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
git clone https://github.com/username/mysecurepassword.git
cd mysecurepassword
npm install
```

### Démarrage

```bash
npm run dev
# Ouvrir http://localhost:3000
```

### Linting et Formatage

```bash
npm run lint        # ESLint
npm run format      # Prettier
```

## 🐛 Débogage

### Problèmes d'Hydratation

- Utiliser `useEffect` pour les états côté client
- Éviter les différences entre serveur et client
- Utiliser des mocks appropriés dans les tests

### Problèmes de Styles

- Vérifier la configuration Tailwind
- S'assurer que les classes sont générées
- Utiliser des classes standard plutôt que personnalisées

### Problèmes de Tests

- Mocks appropriés pour `crypto.getRandomValues`
- Attendre l'hydratation avec `waitFor`
- Utiliser des sélecteurs robustes

## 📚 Ressources

### Documentation Officielle

- [Next.js 15](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)

### Outils de Développement

- **VS Code** : Extensions recommandées
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - ESLint
  - Prettier

### Bonnes Pratiques

- **TypeScript** : Typage strict activé
- **ESLint** : Règles de qualité de code
- **Prettier** : Formatage automatique
- **Tests** : Couverture minimale 80%

## 🤝 Contribution

### Workflow Git

1. Fork du repository
2. Créer une branche feature
3. Développer avec tests
4. Pull Request avec description

### Standards de Code

- **TypeScript** : Types explicites
- **React** : Hooks et composants fonctionnels
- **CSS** : Classes Tailwind uniquement
- **Tests** : Tests unitaires et d'intégration

### Checklist de PR

- [ ] Tests passent
- [ ] Code linté et formaté
- [ ] Documentation mise à jour
- [ ] Pas de régression
- [ ] Compatibilité mobile testée

## 🎯 Roadmap Technique

### Phase 1 : MVP (Terminé)

- ✅ Générateur de base
- ✅ Interface responsive
- ✅ Tests unitaires
- ✅ Déploiement Vercel

### Phase 2 : Améliorations (En cours)

- 🔄 Extension Chrome
- 🔄 Analytics et SEO
- 🔄 Optimisations performance

### Phase 3 : Évolutions (Futur)

- 📋 Historique local
- 📋 Profils de mots de passe
- 📋 Intégrations tierces

## 📞 Support

### Issues GitHub

- **Bug** : Description détaillée + étapes de reproduction
- **Feature** : Justification + cas d'usage
- **Documentation** : Section concernée + amélioration

### Communication

- **Discord** : Communauté développeurs
- **Email** : support@mysecurepassword.fr
- **GitHub** : Issues et Discussions

---

_Dernière mise à jour : Décembre 2024_
