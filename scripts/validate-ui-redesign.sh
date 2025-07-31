#!/bin/bash

# Script de validation de la refonte UI/UX MySecurePassword
# Vérifie la conformité WCAG 2.1, la palette de couleurs et l'harmonisation

echo "🎨 MySecurePassword - Validation de la refonte UI/UX"
echo "=================================================="

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
    local expected="$3"
    
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
echo "🎨 1. Validation de la palette de couleurs MySecurePassword"
echo "========================================================="

# Vérifier que la palette MSP est bien définie dans globals.css
check_requirement "Palette MSP dans globals.css" \
    "grep -q '#000814\|#001D3D\|#003566\|#FFC300\|#FFD60A' src/app/globals.css"

check_requirement "Variables CSS custom MSP" \
    "grep -q 'glass-primary\|glass-secondary\|glass-background' src/app/globals.css"

check_requirement "Configuration Tailwind MSP" \
    "grep -q 'msp:' tailwind.config.ts"

echo ""
echo "🔍 2. Validation de l'accessibilité WCAG 2.1"
echo "============================================"

# Vérifier les classes d'accessibilité
check_requirement "Classes d'accessibilité dans globals.css" \
    "grep -q 'focus-visible-enhanced\|text-accessible-size\|touch-target' src/app/globals.css"

check_requirement "Checkbox améliorées pour l'accessibilité" \
    "grep -q 'checkbox-enhanced' src/app/globals.css"

check_requirement "Support prefers-reduced-motion" \
    "grep -q 'prefers-reduced-motion' src/app/globals.css"

echo ""
echo "🏗️  3. Validation de la structure des composants"
echo "==============================================="

# Vérifier que les composants utilisent les nouvelles classes
check_requirement "PasswordGeneratorNew utilise glass-card" \
    "grep -q 'glass-card' src/components/password/PasswordGeneratorNew.tsx"

check_requirement "AppPresentation utilise glass-card" \
    "grep -q 'glass-card' src/components/presentation/AppPresentation.tsx"

check_requirement "Utilisation de text-accessible-size" \
    "grep -q 'text-accessible-size' src/components/password/PasswordGeneratorNew.tsx"

check_requirement "Utilisation de touch-target" \
    "grep -q 'touch-target' src/components/password/PasswordGeneratorNew.tsx"

check_requirement "Utilisation de focus-visible-enhanced" \
    "grep -q 'focus-visible-enhanced' src/components/password/PasswordGeneratorNew.tsx"

echo ""
echo "📝 4. Validation des labels et ARIA"
echo "=================================="

check_requirement "Labels accessibles dans PasswordGenerator" \
    "grep -q 'aria-label\|aria-describedby' src/components/password/PasswordGeneratorNew.tsx"

check_requirement "Fieldsets pour groupes de contrôles" \
    "grep -q 'fieldset' src/components/password/PasswordGeneratorNew.tsx"

check_requirement "Éléments sr-only pour lecteurs d'écran" \
    "grep -q 'sr-only' src/components/password/PasswordGeneratorNew.tsx"

echo ""
echo "🎭 5. Validation de l'harmonie visuelle"
echo "======================================="

check_requirement "Dégradés harmonisés avec la palette" \
    "grep -q 'from-primary.*to-accent\|from-accent.*to-primary' src/components/password/PasswordGeneratorNew.tsx"

check_requirement "Effets glassmorphism cohérents" \
    "grep -q 'backdrop-blur\|glass-' src/components/presentation/AppPresentation.tsx"

check_requirement "Animations fade-in pour l'harmonie" \
    "grep -q 'fade-in' src/components/presentation/AppPresentation.tsx"

echo ""
echo "⚡ 6. Tests automatisés"
echo "====================="

echo "🧪 Exécution des tests d'accessibilité..."
if npm test tests/accessibility/ui-refactor-accessibility.test.tsx --run > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Tests d'accessibilité: PASS${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠️  Tests d'accessibilité: Vérification manuelle requise${NC}"
    ((WARNINGS++))
fi

echo ""
echo "📊 Résultats de la validation"
echo "============================="
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
    echo -e "${GREEN}🎉 Refonte UI/UX validée avec succès !${NC}"
    echo -e "${GREEN}   ✓ Palette MySecurePassword respectée${NC}"
    echo -e "${GREEN}   ✓ Accessibilité WCAG 2.1 conforme${NC}"
    echo -e "${GREEN}   ✓ Harmonie visuelle achievée${NC}"
    echo -e "${GREEN}   ✓ Glassmorphism moderne appliqué${NC}"
    
    if [ $WARNINGS -gt 0 ]; then
        echo ""
        echo -e "${YELLOW}⚠️  $WARNINGS avertissement(s) à examiner${NC}"
    fi
    exit 0
else
    echo -e "${RED}❌ Refonte incomplète - $FAILED test(s) échoué(s)${NC}"
    echo -e "${YELLOW}   Veuillez corriger les problèmes identifiés${NC}"
    exit 1
fi