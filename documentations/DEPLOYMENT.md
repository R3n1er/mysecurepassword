# Guide de Déploiement - MySecurePassword

## 🚀 Vue d'ensemble

MySecurePassword est déployé sur Vercel avec une configuration optimisée pour la performance et la sécurité. L'application est 100% frontend, ce qui simplifie grandement le déploiement.

## 🎯 Plateformes Supportées

### Vercel (Recommandé)

- **Avantages** : Intégration Next.js native, CDN global, analytics intégrés
- **Configuration** : Automatique via GitHub
- **Coût** : Gratuit pour les projets personnels

### Alternatives

- **Netlify** : Déploiement statique, CDN global
- **GitHub Pages** : Gratuit, configuration manuelle
- **AWS Amplify** : Scalabilité, intégration AWS
- **Firebase Hosting** : Performance Google, gratuit

## 🛠️ Déploiement Vercel

### 1. Préparation du Projet

#### Configuration Package.json

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

#### Configuration Next.js

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
  images: {
    domains: [],
    formats: ["image/webp", "image/avif"],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
  ],
};

export default nextConfig;
```

### 2. Configuration Vercel

#### Variables d'Environnement

```bash
# Vercel Dashboard > Settings > Environment Variables
NEXT_PUBLIC_APP_URL=https://mysecurepassword.fr
```

#### Configuration Vercel.json (Optionnel)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["cdg1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

### 3. Déploiement Automatique

#### Connexion GitHub

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur "New Project"
4. Sélectionner le repository `mysecurepassword`
5. Vercel détecte automatiquement Next.js

#### Configuration Automatique

- **Framework Preset** : Next.js
- **Root Directory** : `./` (par défaut)
- **Build Command** : `npm run build` (détecté automatiquement)
- **Output Directory** : `.next` (détecté automatiquement)

### 4. Domaines et SSL

#### Domaine Personnalisé

1. **Vercel Dashboard** > **Settings** > **Domains**
2. Ajouter `mysecurepassword.fr`
3. **DNS Configuration** :
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

#### SSL Automatique

- **Certificat** : Let's Encrypt automatique
- **Renouvellement** : Automatique
- **HTTPS** : Redirection automatique

## 🔧 Configuration Avancée

### Headers de Sécurité

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
];
```

### Optimisations Performance

```typescript
// next.config.ts
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```

### Cache et CDN

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: "/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ];
  },
};
```

## 🧪 Tests de Déploiement

### Tests Locaux

```bash
# Build de production local
npm run build

# Test du serveur de production
npm run start

# Tests de linting
npm run lint

# Tests unitaires
npm run test:run
```

### Tests Post-Déploiement

```bash
# Vérification de la build
curl -I https://mysecurepassword.fr

# Test de performance
lighthouse https://mysecurepassword.fr

# Test de sécurité
npm audit
```

## 📊 Monitoring et Analytics

### Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

```typescript
// app/layout.tsx
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## 🔍 Debugging

### Logs Vercel

```bash
# Voir les logs de déploiement
vercel logs

# Logs en temps réel
vercel logs --follow

# Logs d'une fonction spécifique
vercel logs --function=api/hello
```

### Erreurs Communes

#### Build Failures

```bash
# Erreur : Module not found
npm install
npm run build

# Erreur : TypeScript errors
npm run type-check

# Erreur : ESLint errors
npm run lint --fix
```

#### Runtime Errors

```bash
# Erreur : Hydration mismatch
# Solution : Utiliser useEffect pour les états côté client

# Erreur : CSS not loading
# Solution : Vérifier la configuration Tailwind
```

## 🚀 Déploiement Manuel

### Build de Production

```bash
# Installation des dépendances
npm install

# Build de production
npm run build

# Test local
npm run start
```

### Upload vers Vercel

```bash
# Installation Vercel CLI
npm i -g vercel

# Login
vercel login

# Déploiement
vercel --prod
```

## 📈 Performance

### Métriques Cibles

- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

### Optimisations

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  compress: true,
};
```

## 🔒 Sécurité

### Headers de Sécurité

```typescript
// next.config.ts
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];
```

### Audit de Sécurité

```bash
# Audit des dépendances
npm audit

# Scan de vulnérabilités
npm audit fix

# Mise à jour des dépendances
npm update
```

## 📚 Ressources

### Documentation Officielle

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI](https://vercel.com/docs/cli)

### Outils Utiles

- **Lighthouse** : Audit de performance
- **WebPageTest** : Tests de vitesse
- **GTmetrix** : Analyse de performance
- **Security Headers** : Vérification des headers

---

_Dernière mise à jour : Décembre 2024_
