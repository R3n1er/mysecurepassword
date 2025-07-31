#!/bin/bash

# Script de configuration du logo MySecurePassword
echo "🎯 Configuration du logo MySecurePassword..."

# Vérifier que le fichier source existe
if [ ! -f "images/logo-mysecurepassword.png" ]; then
    echo "❌ Erreur: Le fichier images/logo-mysecurepassword.png n'existe pas"
    exit 1
fi

# Créer le dossier public s'il n'existe pas
mkdir -p public

# Copier le logo
echo "📁 Copie du logo..."
cp images/logo-mysecurepassword.png public/logo-mysecurepassword.png

if [ $? -eq 0 ]; then
    echo "✅ Logo copié avec succès"
else
    echo "❌ Erreur lors de la copie du logo"
    exit 1
fi

# Vérifier que le fichier a été copié
if [ -f "public/logo-mysecurepassword.png" ]; then
    echo "✅ Logo présent dans public/logo-mysecurepassword.png"
    
    # Afficher la taille du fichier
    size=$(ls -lh public/logo-mysecurepassword.png | awk '{print $5}')
    echo "📏 Taille du logo: $size"
else
    echo "❌ Erreur: logo-mysecurepassword.png non trouvé dans public/"
    exit 1
fi

echo ""
echo "🚀 Configuration terminée !"
echo ""
echo "📋 Le logo sera accessible à :"
echo "- http://localhost:3001/logo-mysecurepassword.png"
echo ""
echo "🎨 Intégration dans l'interface :"
echo "- Header avec logo principal"
echo "- Animations fluides"
echo "- Design responsive"
echo ""