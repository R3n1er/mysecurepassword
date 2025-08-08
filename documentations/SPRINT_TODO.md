# TODO - Sprint MySecurePassword - Configuration Favicon & Couleurs

## 🎯 Objectif du Sprint

Configuration du favicon et adaptation des couleurs selon le logo MySecurePassword.

**Date de début** : Aujourd'hui  
**Priorité** : 🔴 Critique

---

## ✅ Tâches Complétées

### Configuration du Favicon

- [x] Ajout de l'image `msp-favicon.png` dans le dossier `images/`
- [x] Ajout de l'image `logo-mysecurepassword.png` dans le dossier `images/`
- [x] Analyse des couleurs du logo (bleu foncé + jaune)
- [x] **NOUVEAU** : Résolution problème favicon manquant (01/08/2025)
- [x] **NOUVEAU** : Suppression conflit favicon.ico dans src/app/
- [x] **NOUVEAU** : Tests de validation favicon (favicon-fix.test.tsx + integration)
- [x] **NOUVEAU** : Favicon correctement servi sur /favicon.png (HTTP 200 OK)

### Refactorisation Générateur (branche dev)

- [x] Centralisation des règles GWS dans `src/lib/password/policies.ts`
- [x] Conservation de `PasswordGeneratorV2` comme composant canonique
- [x] Alignement `metadataBase`/`openGraph.url` sur `NEXT_PUBLIC_APP_URL` (port 3000 par défaut)
- [x] `.gitignore` complété et artefacts exclus
- [x] Ajout `src/lib/i18n.ts` pour tests
- [x] Ajustement des tests UI/Intégration/Accessibilité (170/170 PASS)
- [x] Règle UX: la génération se fait uniquement via le bouton, jamais automatiquement lors d'un changement d'option (dont Google Workspace)
- [x] Build Next OK (prêt Vercel)

### Analyse des Couleurs

- [x] Identification du bleu foncé du logo comme couleur principale
- [x] Identification du jaune comme couleur d'accent
- [x] Définition des variables CSS appropriées

---

## 🔄 Tâches en Cours

### Configuration Finale du Favicon

- [x] Ajouter la configuration `icons` dans le metadata du layout
- [x] Retirer les liens favicon du head HTML (utilisation metadata uniquement)
- [x] Copier `images/msp-favicon.png` vers `public/favicon.png`
- [ ] Vérifier que le favicon s'affiche correctement

### Adaptation des Couleurs

- [x] Modifier les variables CSS dans `globals.css`
- [x] Appliquer le bleu foncé comme arrière-plan principal
- [x] Appliquer le jaune comme couleur d'accent
- [x] Configurer le thème sombre basé sur le logo

---

## ⏳ Tâches Restantes

### Tests et Validation

- [ ] Lancer l'application en mode développement
- [ ] Vérifier que le favicon s'affiche dans l'onglet du navigateur
- [ ] Tester l'apparence générale avec les nouvelles couleurs
- [ ] Vérifier la cohérence visuelle avec le logo
- [ ] Tester sur mobile et desktop
- [ ] Vérifier la lisibilité du texte sur le nouveau fond

### Optimisations

- [ ] Optimiser l'image du favicon (taille et format)
- [ ] Créer différentes tailles de favicon si nécessaire
- [ ] Ajuster les couleurs pour une meilleure accessibilité
- [ ] Vérifier les contrastes WCAG

### Tests de Compatibilité

- [ ] Tester sur Chrome
- [ ] Tester sur Firefox
- [ ] Tester sur Safari
- [ ] Tester sur mobile (iOS/Android)

---

## 🎨 Couleurs à Appliquer

### Variables CSS à Modifier

```css
:root {
  --background: 220 100% 3%; /* Bleu très foncé du logo */
  --foreground: 45 100% 52%; /* Jaune du logo */
  --card: 220 100% 12%; /* Bleu foncé pour les cartes */
  --card-foreground: 45 100% 52%;
  --popover: 220 100% 12%;
  --popover-foreground: 45 100% 52%;
  --primary: 45 100% 50%; /* Jaune principal */
  --primary-foreground: 220 100% 3%; /* Bleu foncé pour le texte sur jaune */
  --secondary: 220 100% 20%; /* Bleu moyen */
  --secondary-foreground: 45 100% 52%;
  --muted: 220 100% 20%;
  --muted-foreground: 45 100% 50%;
  --accent: 220 100% 20%;
  --accent-foreground: 45 100% 52%;
  --border: 220 100% 20%;
  --input: 220 100% 20%;
  --ring: 45 100% 50%;
}
```

### Configuration Favicon

```typescript
// Dans metadata
icons: {
  icon: "/favicon.png",
  apple: "/favicon.png",
}

// Dans head
<link rel="icon" href="/favicon.png" />
<link rel="apple-touch-icon" href="/favicon.png" />
```

---

## 📝 Fichiers à Modifier

### Fichiers Principaux

- [ ] `src/app/layout.tsx` - Configuration du favicon
- [ ] `src/app/globals.css` - Variables de couleurs
- [ ] `public/favicon.png` - Copie du favicon

### Fichiers de Documentation

- [x] `documentations/SPRINT_TODO.md` - Ce fichier
- [ ] Mettre à jour `documentations/TODO_mysecurepassword.md`

---

## 🚀 Déploiement

### Pré-déploiement

- [ ] Tester en local avec `npm run dev`
- [ ] Vérifier que le favicon fonctionne
- [ ] Valider les couleurs en local
- [ ] Tester la responsivité

### Déploiement Production

- [ ] Déployer sur Vercel
- [ ] Vérifier que le favicon fonctionne sur le domaine de production
- [ ] Valider les couleurs en production
- [ ] Tester sur différents appareils

---

## 🎯 Critères de Validation

### Favicon

- [ ] Le favicon s'affiche dans l'onglet du navigateur
- [ ] Le favicon s'affiche dans les favoris
- [ ] Le favicon s'affiche sur mobile
- [ ] Le favicon est optimisé (taille < 50KB)

### Couleurs

- [ ] L'arrière-plan utilise le bleu foncé du logo
- [ ] Les éléments d'accent utilisent le jaune du logo
- [ ] Le contraste est suffisant pour la lisibilité
- [ ] L'apparence est cohérente avec le logo
- [ ] Les couleurs fonctionnent en mode sombre

---

## 📊 Progression

**Progression globale** : 95%  
**Tâches complétées** : 11/12  
**Tâches en cours** : 1/12  
**Tâches restantes** : 1/12

---

## 🚨 Blocages Potentiels

### Techniques

- [ ] Problèmes de contraste avec les nouvelles couleurs
- [ ] Favicon non reconnu par certains navigateurs
- [ ] Performance avec les nouvelles couleurs

### Design

- [ ] Lisibilité du texte sur le nouveau fond
- [ ] Cohérence visuelle avec les composants existants
- [ ] Accessibilité des nouvelles couleurs

---

## ⚡ Actions Immédiates

1. **Copier le favicon** : `cp images/msp-favicon.png public/favicon.png`
2. **Modifier le layout** : Ajouter la configuration favicon
3. **Modifier globals.css** : Appliquer les nouvelles couleurs
4. **Tester en local** : `npm run dev`
5. **Valider l'apparence** : Vérifier la cohérence visuelle

---

## 🎯 Objectifs du Sprint

- [ ] Favicon fonctionnel sur tous les navigateurs
- [ ] Couleurs cohérentes avec le logo MySecurePassword
- [ ] Interface utilisateur harmonieuse
- [ ] Validation complète avant déploiement

---

**Dernière mise à jour** : Aujourd'hui  
**Responsable** : Équipe MySecurePassword  
**Statut** : En cours
