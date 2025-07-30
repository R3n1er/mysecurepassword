# Implémentation de l'Authentification - MySecurePassword

## Vue d'ensemble

L'authentification a été implémentée avec **NextAuth.js** et **Supabase** pour offrir une expérience utilisateur sécurisée et moderne.

## Architecture

### Composants principaux

1. **NextAuth.js Configuration** (`src/lib/auth.ts`)
   - Configuration des providers (Google, GitHub, Credentials)
   - Adaptateur Supabase pour la persistance
   - Callbacks personnalisés pour la gestion des sessions

2. **API Routes**
   - `/api/auth/[...nextauth]` - Route NextAuth.js principale
   - `/api/auth/signup` - Inscription des utilisateurs

3. **Pages d'authentification**
   - `/auth/signin` - Page de connexion
   - `/auth/signup` - Page d'inscription
   - `/auth/error` - Page d'erreur

4. **Composants UI**
   - `Header` - Navigation avec menu utilisateur
   - `ProtectedRoute` - Protection des routes
   - `AuthProvider` - Provider NextAuth.js

## Configuration

### Variables d'environnement requises

```env
# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
```

### Base de données Supabase

Le script SQL `sql/create_profiles_table.sql` doit être exécuté dans Supabase pour créer :

- Table `profiles` avec RLS (Row Level Security)
- Triggers pour la gestion automatique des utilisateurs
- Politiques de sécurité pour l'accès aux données

## Fonctionnalités implémentées

### ✅ Authentification par email/mot de passe

- Inscription avec validation
- Connexion sécurisée
- Gestion des erreurs

### ✅ OAuth (Google, GitHub)

- Connexion avec Google
- Connexion avec GitHub
- Récupération automatique des informations de profil

### ✅ Gestion des sessions

- Sessions JWT sécurisées
- Persistance avec Supabase
- Déconnexion automatique

### ✅ Interface utilisateur

- Header avec menu utilisateur
- Pages de connexion/inscription modernes
- Protection des routes
- Gestion des états de chargement

### ✅ Profil utilisateur

- Page de profil complète
- Statistiques utilisateur
- Actions rapides
- Statut Premium

## Utilisation

### Connexion

```typescript
import { signIn } from "next-auth/react";

// Connexion avec credentials
await signIn("credentials", {
  email: "user@example.com",
  password: "password",
  redirect: false,
});

// Connexion avec OAuth
await signIn("google", { callbackUrl: "/" });
```

### Protection des routes

```typescript
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Contenu protégé</div>
    </ProtectedRoute>
  );
}
```

### Hook personnalisé

```typescript
import { useAuth } from "@/hooks/useAuth";

export default function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Chargement...</div>;
  if (!isAuthenticated) return <div>Non connecté</div>;

  return <div>Bienvenue {user?.name}</div>;
}
```

## Sécurité

### Mesures implémentées

- **RLS (Row Level Security)** sur Supabase
- **JWT sécurisés** avec NextAuth.js
- **Validation des données** côté serveur
- **Gestion des erreurs** complète
- **Protection CSRF** automatique

### Bonnes pratiques

- Aucun mot de passe stocké en clair
- Sessions avec expiration automatique
- Validation des tokens côté serveur
- Logs d'audit pour les actions sensibles

## Prochaines étapes

### 🔄 À implémenter

1. **Vérification email** pour les nouveaux comptes
2. **Récupération de mot de passe** oublié
3. **Double authentification** (2FA)
4. **Gestion des rôles** utilisateur
5. **Audit trail** des connexions

### 🔧 Améliorations possibles

1. **Rate limiting** sur les tentatives de connexion
2. **Détection de fraude** avec des patterns
3. **Notifications** de connexion suspecte
4. **Synchronisation** avec l'extension Chrome

## Tests

### Tests manuels recommandés

1. ✅ Inscription avec email/mot de passe
2. ✅ Connexion avec email/mot de passe
3. ✅ Connexion OAuth (Google/GitHub)
4. ✅ Déconnexion
5. ✅ Protection des routes
6. ✅ Gestion des erreurs
7. ✅ Responsive design

### Tests automatisés à ajouter

- Tests unitaires pour les composants d'auth
- Tests d'intégration pour les API routes
- Tests E2E pour les flux d'authentification

## Dépannage

### Problèmes courants

**Erreur "Invalid credentials"**

- Vérifier les variables d'environnement Supabase
- S'assurer que la table `profiles` existe
- Vérifier les politiques RLS

**Erreur OAuth**

- Vérifier les clés API Google/GitHub
- S'assurer que les URLs de callback sont correctes
- Vérifier les domaines autorisés

**Session non persistante**

- Vérifier `NEXTAUTH_SECRET`
- S'assurer que `NEXTAUTH_URL` est correct
- Vérifier la configuration de l'adaptateur Supabase

## Ressources

- [Documentation NextAuth.js](https://next-auth.js.org/)
- [Documentation Supabase Auth](https://supabase.com/docs/guides/auth)
- [Guide de sécurité OAuth](https://oauth.net/2/)
- [Bonnes pratiques JWT](https://jwt.io/introduction)
