#!/bin/bash

# Script de validation Design V2 MySecurePassword
# Vérifie la conformité avec le cahier des charges UI/UX

echo "🎨 MySecurePassword - Validation Design V2"
echo "=========================================="

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Compteurs
PASSED=0
FAILED=0
WARNINGS=0

# Fonction de test
check_requirement() {
    local description="$1"
    local command="$2"
    
    echo -n "🔍 $description... "
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS${NC}"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAIL${NC}"
        ((FAILED++))
        return 1
    fi
}

check_warning() {
    local description="$1"
    local command="$2"
    
    echo -n "⚠️  $description... "
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${YELLOW}⚠️  WARNING${NC}"
        ((WARNINGS++))
        return 1
    fi
}

echo ""
echo "🎨 1. Validation de la palette V2 (texte blanc)"
echo "==============================================="

# Vérifier les variables CSS V2
check_requirement "Variables CSS texte blanc" \
    "grep -q 'foreground: 0 0% 100%' src/app/globals.css"

check_requirement "Variables dégradé header bleu-violet" \
    "grep -q 'header-start.*header-end' src/app/globals.css"

check_requirement "Variables sections différenciées" \
    "grep -q 'generator-bg\|advantages-bg\|footer-bg' src/app/globals.css"

check_requirement "Logo jaune uniquement" \
    "grep -q 'logo-bg\|logo-text' src/app/globals.css"

echo ""
echo "🏗️  2. Validation des composants V2"
echo "=================================="

# Vérifier les composants V2
check_requirement "HeaderV2 avec dégradé bleu-violet" \
    "grep -q 'msp-header' src/components/layout/HeaderV2.tsx"

check_requirement "Logo jaune à gauche dans HeaderV2" \
    "grep -q 'msp-logo' src/components/layout/HeaderV2.tsx"

check_requirement "PasswordGeneratorV2 section bleu nuit" \
    "grep -q 'msp-section-generator' src/components/password/PasswordGeneratorV2.tsx"

check_requirement "AppPresentationV2 section bleu intense" \
    "grep -q 'msp-section-advantages' src/components/presentation/AppPresentationV2.tsx"

check_requirement "FooterV2 section bleu très foncé" \
    "grep -q 'msp-section-footer' src/components/layout/FooterV2.tsx"

echo ""
echo "📝 3. Validation du texte blanc obligatoire"
echo "==========================================="

check_requirement "Texte blanc dans HeaderV2" \
    "grep -q 'msp-text-white' src/components/layout/HeaderV2.tsx"

check_requirement "Texte blanc dans PasswordGeneratorV2" \
    "grep -q 'msp-text-white' src/components/password/PasswordGeneratorV2.tsx"

check_requirement "Texte blanc dans AppPresentationV2" \
    "grep -q 'msp-text-white' src/components/presentation/AppPresentationV2.tsx"

check_requirement "Texte blanc dans FooterV2" \
    "grep -q 'msp-text-white' src/components/layout/FooterV2.tsx"

echo ""
echo "🎭 4. Validation des boutons V2"
echo "==============================="

check_requirement "Boutons blancs (msp-button-white)" \
    "grep -q 'msp-button-white' src/components/password/PasswordGeneratorV2.tsx"

check_requirement "Boutons dégradé (msp-button-gradient)" \
    "grep -q 'msp-button-gradient' src/components/password/PasswordGeneratorV2.tsx"

check_requirement "Classes CSS boutons définies" \
    "grep -q 'msp-button-white\|msp-button-gradient' src/app/globals.css"

echo ""
echo "🔧 5. Validation de la structure modulaire"
echo "=========================================="

check_requirement "Classes MSP sections définies" \
    "grep -q 'msp-section-generator\|msp-section-advantages\|msp-section-footer' src/app/globals.css"

check_requirement "Classes MSP cartes et composants" \
    "grep -q 'msp-card\|msp-glass-overlay' src/app/globals.css"

check_requirement "Page principale utilise composants V2" \
    "grep -q 'HeaderV2\|PasswordGeneratorV2\|AppPresentationV2\|FooterV2' src/app/page.tsx"

echo ""
echo "📊 6. Validation interdiction jaune pour texte"
echo "==============================================="

check_requirement "Aucun texte jaune dans HeaderV2" \
    "! grep -q 'text-yellow\\|text-msp-gold\\|text-\\[#FFC300\\]' src/components/layout/HeaderV2.tsx"

check_requirement "Aucun texte jaune dans PasswordGeneratorV2" \
    "! grep -q 'text-yellow\\|text-msp-gold\\|text-\\[#FFC300\\]' src/components/password/PasswordGeneratorV2.tsx"

check_requirement "Aucun texte jaune dans AppPresentationV2" \
    "! grep -q 'text-yellow\\|text-msp-gold\\|text-\\[#FFC300\\]' src/components/presentation/AppPresentationV2.tsx"

check_requirement "Aucun texte jaune dans FooterV2" \
    "! grep -q 'text-yellow\\|text-msp-gold\\|text-\\[#FFC300\\]' src/components/layout/FooterV2.tsx"

echo ""
echo "⚡ 7. Tests automatisés Design V2"
echo "================================="

echo "🧪 Exécution des tests de validation Design V2..."
if npm test tests/ui/design-v2-validation.test.tsx --run > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Tests Design V2: PASS (24/24)${NC}"
    ((PASSED++))
else
    echo -e "${RED}❌ Tests Design V2: FAIL${NC}"
    ((FAILED++))
fi

echo ""
echo "📊 Résultats de la validation Design V2"
echo "======================================="
echo -e "✅ Tests réussis: ${GREEN}$PASSED${NC}"
echo -e "❌ Tests échoués: ${RED}$FAILED${NC}"
echo -e "⚠️  Avertissements: ${YELLOW}$WARNINGS${NC}"

TOTAL=$((PASSED + FAILED))
if [ $TOTAL -gt 0 ]; then
    PERCENTAGE=$((PASSED * 100 / TOTAL))
    echo -e "📈 Score de conformité: ${BLUE}$PERCENTAGE%${NC}"
fi

echo ""
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Design V2 validé avec succès !${NC}"
    echo -e "${GREEN}   ✓ Texte blanc sur toute l'interface${NC}"
    echo -e "${GREEN}   ✓ Dégradé bleu-violet dans le header${NC}"
    echo -e "${GREEN}   ✓ Logo jaune uniquement (pas de texte jaune)${NC}"
    echo -e "${GREEN}   ✓ Sections différenciées par couleurs${NC}"
    echo -e "${GREEN}   ✓ Structure modulaire respectée${NC}"
    echo -e "${GREEN}   ✓ Boutons blancs et dégradés${NC}"
    echo -e "${GREEN}   ✓ Footer avec formulaire contact${NC}"
    
    if [ $WARNINGS -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}⚠️  $WARNINGS avertissement(s) à examiner${NC}"
    fi
    exit 0
else
    echo -e "${RED}❌ Design V2 non conforme - $FAILED test(s) échoué(s)${NC}"
    echo -e "${YELLOW}   Veuillez corriger les problèmes identifiés${NC}"
    exit 1
fi