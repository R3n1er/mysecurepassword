# 🔐 MySecurePassword - Générateur de Mots de Passe Sécurisés

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC)](https://tailwindcss.com/)
[![Security](https://img.shields.io/badge/Security-0_Vulnerabilities-brightgreen)](https://github.com/features/security)

Générateur de mots de passe sécurisés 100% gratuit, compatible avec Google Workspace. Créez des mots de passe forts et sécurisés en quelques clics.

## ✨ Fonctionnalités

### 🔐 Générateur de Mots de Passe

- **Web Crypto API** - Génération cryptographiquement sécurisée
- **Compatibilité Google Workspace** - Évite les caractères problématiques
- **Configuration flexible** - Longueur, caractères, symboles
- **Analyse de force** - Validation en temps réel
- **Copie rapide** - Un clic pour copier

### 🎨 Interface Moderne

- **Design futuriste** - Interface élégante et intuitive
- **Animations fluides** - Expérience utilisateur optimisée
- **Responsive** - Compatible mobile et desktop
- **Thème sombre** - Support du mode sombre

### 🔒 Sécurité

- **Aucun stockage** - Les mots de passe ne sont jamais sauvegardés
- **Génération locale** - Tout se passe dans votre navigateur
- **Web Crypto API** - Utilise les capacités cryptographiques natives
- **Compatibilité maximale** - Fonctionne partout

## 🚀 Installation

```bash
# 1. Cloner le projet
git clone [votre-repo]
cd mysecurepassword
npm install

# 2. Lancer en développement
npm run dev
```

✅ **Votre app est prête** : [http://localhost:3000](http://localhost:3000)

## 🛠️ Scripts

```bash
npm run dev          # Développement
npm run build        # Production
npm run start        # Démarrer en production
npm run lint         # Vérifier le code
npm run test         # Tests unitaires
```

## 🏗️ Architecture

```
src/
├── app/
│   ├── page.tsx          # Page d'accueil avec générateur
│   ├── layout.tsx        # Layout principal
│   └── globals.css       # Styles globaux
├── components/
│   ├── password/
│   │   └── PasswordGenerator.tsx  # Composant principal
│   └── ui/               # Composants UI (Shadcn)
├── lib/                  # Utilitaires
└── types/                # Types TypeScript
```

## 🔧 Configuration

### Variables d'Environnement (Optionnelles)

```env
# Email (pour contact)
RESEND_API_KEY=re_...

# SMS (pour notifications)
TWILIO_AUTH_TOKEN=...

# Recherche (pour futures fonctionnalités)
NEXT_PUBLIC_ALGOLIA_APP_ID=...
```

Voir `.env.example` pour la liste complète.

## 🎯 Fonctionnalités Principales

### ✅ Générateur Complet

- **Longueur configurable** (8-64 caractères, **14 par défaut**)
- **Types de caractères** (majuscules, minuscules, chiffres, symboles)
- **Exclusions intelligentes** (caractères similaires, ambigus)
- **Mode Google Workspace** (compatibilité maximale)

### ✅ Interface Utilisateur

- **Génération en un clic**
- **Analyse de force en temps réel**
- **Copie rapide**
- **Affichage/masquage du mot de passe**
- **Configuration intuitive**

### ✅ Sécurité Avancée

- **Web Crypto API** pour la génération
- **Aucun stockage** des mots de passe
- **Génération locale** dans le navigateur
- **Compatibilité maximale** avec tous les services

## 📊 Qualité

- ✅ **0 vulnérabilités** de sécurité
- ✅ **TypeScript** complet
- ✅ **Performance optimisée** (Next.js 15)
- ✅ **Accessibilité** (WCAG 2.1)
- ✅ **SEO optimisé**

## 🎨 Design

- **Interface moderne** avec gradients et animations
- **Thème sombre** automatique
- **Responsive design** pour tous les écrans
- **Animations fluides** avec Framer Motion
- **Composants accessibles** avec Shadcn/UI

## 🔒 Sécurité

### Mesures Implémentées

- **Web Crypto API** pour la génération cryptographiquement sécurisée
- **Aucun stockage** des mots de passe générés
- **Génération côté client** pour la confidentialité
- **Validation de force** en temps réel
- **Compatibilité Google Workspace** pour éviter les erreurs

### Bonnes Pratiques

- Les mots de passe ne quittent jamais votre navigateur
- Utilisation des capacités cryptographiques natives
- Pas de dépendance à des services externes
- Interface simple et sécurisée

## 🚀 Déploiement

### Vercel (Recommandé)

1. Connecter votre repo à Vercel
2. Déployer automatiquement

### Autres Plateformes

- **Netlify** : Compatible
- **Railway** : Compatible
- **DigitalOcean** : Compatible

## 📄 Licence

Licence MIT - Usage libre et commercial autorisé.

## 🛠️ Stack Technique

- **Next.js 15** - Framework React moderne
- **TypeScript** - Type safety complet
- **Tailwind CSS 4** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Shadcn/UI** - Composants accessibles
- **Web Crypto API** - Sécurité cryptographique

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche feature
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📞 Support

- 📧 Email : support@mysecurepassword.fr
- 🐛 Issues : [GitHub Issues](https://github.com/votre-repo/issues)
- 📖 Documentation : [Wiki](https://github.com/votre-repo/wiki)

---

**MySecurePassword** - Générateur de mots de passe sécurisés et gratuits 🔐
