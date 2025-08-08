# Compatibilité Google Workspace

## 🎯 Objectif

MySecurePassword est spécialement conçu pour générer des mots de passe 100% compatibles avec Google Workspace, évitant les caractères problématiques qui peuvent causer des erreurs lors de la création ou modification de comptes.

## 🔍 Caractères Problématiques Identifiés

### Caractères Similaires (Exclus pour éviter la confusion)

- `l` (lettre l minuscule) - confondu avec `1` (chiffre)
- `1` (chiffre un) - confondu avec `l` (lettre)
- `I` (lettre I majuscule) - confondu avec `l` (lettre)
- `O` (lettre O majuscule) - confondu avec `0` (zéro)
- `0` (zéro) - confondu avec `O` (lettre)

### Caractères Réservés dans les Systèmes Backend Google

- `@` - utilisé pour le passage de paramètres
- `&` - utilisé pour le passage de paramètres
- `#` - utilisé pour les commentaires
- `:` - utilisé pour les commentaires et paramètres

### Caractères Non Permis

- **Accents et diacritiques** - Non permis dans les mots de passe Google Workspace
- **Caractères spéciaux complexes** - Peuvent causer des problèmes de compatibilité

## ✅ Caractères Compatibles Google Workspace

### Lettres

- **Majuscules** : A-Z (sauf I et O)
- **Minuscules** : a-z (sauf l)

### Chiffres

- **Chiffres** : 0-9 (sauf 0 et 1)

### Symboles Sécurisés (Mode Google Workspace)

- `! % ^ * ( ) _ + - =`

### Symboles Standard (Mode Normal)

- `! @ # $ % ^ & * ( ) _ + - =`

## 🔧 Configuration par Défaut

L'option **"Compatibilité Google Workspace"** est désactivée par défaut et :

1. **Exclut les caractères similaires** (l,1,I,O,0) pour éviter la confusion
2. **Exclut les symboles réservés** (@&#:) dans les systèmes backend Google
3. **Utilise uniquement** les symboles sécurisés (!%^*()_+-=)
4. **Génération uniquement via le bouton** : aucun changement d'option (dont Google Workspace) ne régénère automatiquement le mot de passe actuel. Il faut cliquer sur « Générer » pour appliquer les nouvelles règles.
5. **Garantit la compatibilité** avec les App Passwords (16 caractères recommandés)

## 🎨 Interface Utilisateur

### Option Google Workspace

- ⛔ **Désactivée par défaut** (case décochée)
- 🟢 **Couleur verte** pour indiquer la sécurité
- 📝 **Description claire** des avantages
- 🔒 **Icône de validation** (CheckCircle2)

### Options Manuelles

- 🟡 **Couleur jaune** pour les options avancées
- ⚠️ **Désactivées** quand Google Workspace est activé
- 📖 **Explications détaillées** pour chaque option

## 🧪 Tests de Compatibilité

### Mots de passe générés avec Google Workspace activé :

```
✅ Compatible : K9m!nP2%vX7qR
✅ Compatible : H5j^kL8*wY3tN
✅ Compatible : B4f!gM6+xZ2sA
```

### Mots de passe générés sans Google Workspace :

```
⚠️ Risqué : K9m@nP2#vX7qR (contient @ et #)
⚠️ Risqué : H5j&kL8:wY3tN (contient & et :)
⚠️ Risqué : B4f#gM6&xZ1sA (contient l, 1, # et &)
```

## 🚀 Avantages

1. **Compatibilité maximale** avec Google Workspace et ses systèmes backend
2. **Évite les caractères réservés** (@&#:) qui peuvent causer des erreurs
3. **Optimisé pour les App Passwords** (16 caractères recommandés)
4. **Compatible avec 2-Step Verification** et les applications externes
5. **Pas d'accents** ou de caractères diacritiques problématiques

## 📋 Checklist de Validation

- [x] Exclusion automatique des caractères similaires
- [x] Exclusion automatique des caractères ambigus
- [x] Utilisation uniquement de symboles sécurisés
- [x] Interface claire avec option par défaut
- [x] Désactivation des options manuelles quand activé
- [x] Tests de compatibilité avec Google Workspace

## 🔄 Mise à jour

Ce document sera mis à jour si de nouveaux caractères problématiques sont identifiés avec Google Workspace.
