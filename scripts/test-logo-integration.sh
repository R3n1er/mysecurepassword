#!/bin/bash

echo "🔍 Validation de l'intégration du logo MySecurePassword"
echo "=================================================="

# 1. Vérifier les fichiers
echo ""
echo "📁 1. Vérification des fichiers logo :"
echo ""

if [ -f "images/logo-mysecurepassword-min.png" ]; then
    echo "✅ Logo source (compressé) : images/logo-mysecurepassword-min.png"
    ls -lh images/logo-mysecurepassword-min.png | awk '{print "   Taille:", $5}'
else
    echo "❌ Logo source manquant : images/logo-mysecurepassword-min.png"
fi

if [ -f "public/logo-mysecurepassword.png" ]; then
    echo "✅ Logo public : public/logo-mysecurepassword.png"
    ls -lh public/logo-mysecurepassword.png | awk '{print "   Taille:", $5}'
else
    echo "❌ Logo public manquant : public/logo-mysecurepassword.png"
fi

# 2. Vérifier l'intégration dans le composant
echo ""
echo "🔧 2. Vérification de l'intégration dans le composant :"
echo ""

if grep -q "Image" src/components/password/PasswordGeneratorNew.tsx; then
    echo "✅ Import Next/Image trouvé"
else
    echo "❌ Import Next/Image manquant"
fi

if grep -q "logo-mysecurepassword.png" src/components/password/PasswordGeneratorNew.tsx; then
    echo "✅ Référence au logo trouvée dans le composant"
else
    echo "❌ Référence au logo manquante dans le composant"
fi

if grep -q "MySecurePassword Logo" src/components/password/PasswordGeneratorNew.tsx; then
    echo "✅ Alt text du logo trouvé"
else
    echo "❌ Alt text du logo manquant"
fi

# 3. Afficher la configuration actuelle
echo ""
echo "⚙️  3. Configuration du logo :"
echo ""
echo "- Source: /logo-mysecurepassword.png"
echo "- Taille: 64x64 pixels"
echo "- Format: PNG compressé"
echo "- Position: Header du générateur"
echo "- Alt text: MySecurePassword Logo"
echo "- Priority: true (chargement prioritaire)"

# 4. Tests à effectuer
echo ""
echo "🧪 4. Tests à effectuer manuellement :"
echo ""
echo "Sur http://localhost:3001/ :"
echo "- ✅ Le logo MySecurePassword s'affiche dans le header"
echo "- ✅ Le logo a une taille appropriée (64x64px)"
echo "- ✅ Le logo se charge rapidement (priority=true)"
echo "- ✅ Le logo est centré avec le titre"
echo "- ✅ Le logo respecte les couleurs du design"
echo ""
echo "Test d'accessibilité :"
echo "- ✅ Le logo a un alt text descriptif"
echo "- ✅ Le logo ne gêne pas la navigation au clavier"
echo "- ✅ Le logo s'affiche sur tous les appareils"

# 5. Vérification URL directe
echo ""
echo "🌐 5. Test d'accès direct :"
echo ""
echo "URL à tester : http://localhost:3001/logo-mysecurepassword.png"
echo "- Le logo doit s'afficher directement dans le navigateur"
echo "- Vérifier la qualité et la compression"

echo ""
echo "✅ VALIDATION TERMINÉE"
echo ""
echo "📋 Actions suivantes :"
echo "1. Tester l'application : npm run dev"
echo "2. Vérifier l'affichage sur http://localhost:3001/"
echo "3. Valider sur mobile et desktop"
echo "4. Commit les modifications si tout fonctionne"
echo ""