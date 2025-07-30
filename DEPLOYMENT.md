# 🚀 Déploiement

## Vercel (Recommandé)

1. Connecter votre repo à Vercel
2. Ajouter les variables d'environnement :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   STRIPE_SECRET_KEY=sk_live_...
   RESEND_API_KEY=re_...
   ```
3. Déployer

## Autres Plateformes
- **Netlify** : Compatible
- **Railway** : Compatible  
- **DigitalOcean** : Compatible

## Domaine Personnalisé
Mettre à jour `NEXT_PUBLIC_APP_URL` avec votre domaine.