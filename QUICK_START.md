# 🚀 Installation Rapide

## 1. Setup Initial
```bash
git clone [votre-repo]
cd nextjs15-boilerplate
npm install
cp .env.example .env.local
```

## 2. Configuration Supabase
1. Créer un projet sur [supabase.com](https://supabase.com)
2. Copier URL et ANON_KEY dans `.env.local`
3. Exécuter le script `sql/setup.sql` dans l'éditeur SQL Supabase

## 3. Lancement
```bash
npm run dev
```

✅ **App prête** : [http://localhost:3000](http://localhost:3000)

## Services Optionnels
Ajouter dans `.env.local` selon vos besoins :
- **Stripe** : Paiements
- **Resend** : Emails  
- **Twilio** : SMS