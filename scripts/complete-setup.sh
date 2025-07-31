#!/bin/bash

echo "🎯 Configuration complète MySecurePassword - Logo et Couleurs"
echo "============================================================"

# 1. Copier le logo
echo ""
echo "📁 1. Configuration du logo..."
if [ ! -f "images/logo-mysecurepassword.png" ]; then
    echo "❌ Erreur: images/logo-mysecurepassword.png non trouvé"
    exit 1
fi

cp images/logo-mysecurepassword.png public/logo-mysecurepassword.png
if [ $? -eq 0 ]; then
    echo "✅ Logo copié vers public/logo-mysecurepassword.png"
else
    echo "❌ Erreur lors de la copie du logo"
    exit 1
fi

# 2. Vérifier le favicon
echo ""
echo "🖼️  2. Vérification du favicon..."
if [ -f "public/favicon.png" ]; then
    echo "✅ Favicon présent"
else
    echo "⚠️  Favicon manquant, copie en cours..."
    cp images/msp-favicon.png public/favicon.png
    echo "✅ Favicon copié"
fi

# 3. Afficher les URLs de test
echo ""
echo "🌐 3. URLs de test :"
echo "- Application: http://localhost:3001/"
echo "- Logo: http://localhost:3001/logo-mysecurepassword.png"
echo "- Favicon: http://localhost:3001/favicon.png"
echo "- Manifest: http://localhost:3001/site.webmanifest"

# 4. Afficher les couleurs configurées
echo ""
echo "🎨 4. Couleurs appliquées :"
echo "- Arrière-plan: Bleu foncé du logo (hsl(220, 100%, 3%))"
echo "- Texte: Jaune du logo (hsl(45, 100%, 52%))"
echo "- Accents: Jaune principal (hsl(45, 100%, 50%))"
echo "- Cartes: Bleu moyen (hsl(220, 100%, 12%))"

# 5. Instructions finales
echo ""
echo "🚀 5. Pour tester :"
echo "1. npm run dev"
echo "2. Ouvrir http://localhost:3001"
echo "3. Vérifier :"
echo "   - Logo MySecurePassword en header"
echo "   - Couleurs bleu foncé + jaune"
echo "   - Favicon dans l'onglet"
echo "   - Animations fluides"

echo ""
echo "✅ Configuration terminée avec succès !"
echo ""