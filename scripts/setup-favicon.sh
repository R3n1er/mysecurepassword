#!/bin/bash

# Script de configuration du favicon MySecurePassword
# Ce script copie le favicon et lance les tests

echo "🎯 Configuration du favicon MySecurePassword..."

# Vérifier que le fichier source existe
if [ ! -f "images/msp-favicon.png" ]; then
    echo "❌ Erreur: Le fichier images/msp-favicon.png n'existe pas"
    exit 1
fi

# Créer le dossier public s'il n'existe pas
mkdir -p public

# Copier le favicon
echo "📁 Copie du favicon..."
cp images/msp-favicon.png public/favicon.png

if [ $? -eq 0 ]; then
    echo "✅ Favicon copié avec succès"
else
    echo "❌ Erreur lors de la copie du favicon"
    exit 1
fi

# Vérifier que le fichier a été copié
if [ -f "public/favicon.png" ]; then
    echo "✅ Favicon présent dans public/favicon.png"
    
    # Afficher la taille du fichier
    size=$(ls -lh public/favicon.png | awk '{print $5}')
    echo "📏 Taille du favicon: $size"
else
    echo "❌ Erreur: favicon.png non trouvé dans public/"
    exit 1
fi

echo ""
echo "🚀 Configuration terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Lancer l'application: npm run dev"
echo "2. Vérifier le favicon dans l'onglet du navigateur"
echo "3. Tester les nouvelles couleurs"
echo ""
echo "🎨 Nouvelles couleurs appliquées :"
echo "- Arrière-plan: Bleu foncé du logo (220 100% 3%)"
echo "- Texte: Jaune du logo (45 100% 52%)"
echo "- Accents: Jaune principal (45 100% 50%)"
echo ""