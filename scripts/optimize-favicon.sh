#!/bin/bash

# Script d'optimisation du favicon MySecurePassword
echo "🎯 Optimisation du favicon MySecurePassword..."

# Vérifier que le fichier source existe
if [ ! -f "public/favicon.png" ]; then
    echo "❌ Erreur: Le fichier public/favicon.png n'existe pas"
    exit 1
fi

# Créer un favicon.ico (si imagemagick est installé)
if command -v convert &> /dev/null; then
    echo "🔄 Création du favicon.ico..."
    convert public/favicon.png -resize 32x32 public/favicon.ico
    if [ $? -eq 0 ]; then
        echo "✅ favicon.ico créé avec succès"
    else
        echo "⚠️  Erreur lors de la création du favicon.ico"
    fi
else
    echo "⚠️  ImageMagick non installé, création manuelle du favicon.ico nécessaire"
fi

# Vérifier la taille du fichier
size=$(ls -lh public/favicon.png | awk '{print $5}')
echo "📏 Taille actuelle du favicon.png: $size"

if [ "${size%?}" -gt 100 ]; then
    echo "⚠️  Le favicon est volumineux (${size}). Recommandation: optimiser l'image"
    echo "💡 Suggestion: Réduire la taille à moins de 50KB pour de meilleures performances"
fi

echo ""
echo "🔧 Solutions pour réparer le favicon:"
echo "1. Vider le cache du navigateur (Ctrl+F5 ou Cmd+Shift+R)"
echo "2. Redémarrer le serveur de développement"
echo "3. Tester dans un autre navigateur"
echo "4. Vérifier dans l'onglet Réseau des DevTools si favicon.png se charge"
echo ""
echo "📍 URLs à tester:"
echo "- http://localhost:3000/favicon.png"
echo "- http://localhost:3000/site.webmanifest"
echo ""