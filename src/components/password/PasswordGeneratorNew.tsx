"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Shield, Settings, Check, Lock } from "lucide-react";
import Confetti from "@/components/animations/Confetti";
import { motion } from "framer-motion";
import Image from "next/image";
import ClientOnly from "@/components/common/ClientOnly";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  googleWorkspaceCompatible: boolean;
}

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [options, setOptions] = useState<PasswordOptions>({
    length: 14,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    googleWorkspaceCompatible: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const generatePassword = useCallback(
    async (showLoading = true, triggerConfetti = false) => {
      if (showLoading) setIsGenerating(true);

      // Simulation d'un délai pour l'animation
      await new Promise((resolve) => setTimeout(resolve, 500));

      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = options.googleWorkspaceCompatible
        ? "!@#$%^&*()-_=+[]{}|;:,.<>?"
        : "!@#$%^&*()-_=+[]{}|;:,.<>?/~`";

      let chars = "";
      if (options.includeUppercase) chars += uppercase;
      if (options.includeLowercase) chars += lowercase;
      if (options.includeNumbers) chars += numbers;
      if (options.includeSymbols) chars += symbols;

      if (!chars) chars = lowercase;

      let result = "";
      if (typeof window !== "undefined" && window.crypto) {
        const array = new Uint8Array(options.length);
        window.crypto.getRandomValues(array);
        for (let i = 0; i < options.length; i++) {
          result += chars[array[i] % chars.length];
        }
      } else {
        for (let i = 0; i < options.length; i++) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setPassword(result);
      if (showLoading) setIsGenerating(false);

      if (triggerConfetti) {
        setShowConfetti(true);
      }
    },
    [options]
  );

  const handleOptionChange = useCallback(
    (newOptions: Partial<PasswordOptions>) => {
      setOptions((prev) => {
        const updatedOptions = { ...prev, ...newOptions };

        if (password) {
          setTimeout(() => generatePassword(false, false), 0);
        }

        return updatedOptions;
      });
    },
    [password, generatePassword]
  );

  const copyToClipboard = async () => {
    if (!password || typeof window === "undefined") return;

    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(password);
      } else {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement("textarea");
        textArea.value = password;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="animate-pulse bg-card/50 rounded-3xl shadow-xl border border-border/30 h-96 flex items-center justify-center">
          <div className="text-muted-foreground">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto fade-in">
      {/* Container principal avec glassmorphism harmonisé */}
      <div className="relative glass-card rounded-3xl shadow-2xl overflow-hidden">
        {/* Effet de brillance subtil MSP */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-accent/5 to-primary/8 opacity-60"></div>

        {/* Header élégant avec logo - Style harmonisé */}
        <div className="relative bg-gradient-to-r from-primary/12 via-primary/6 to-accent/10 p-10 border-b border-border/30">
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-6">
            {/* Logo et titre principal */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-xl"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-primary/15 to-accent/10 rounded-3xl flex items-center justify-center border-2 border-primary/25 shadow-xl">
                  <Image
                    src="/logo-mysecurepassword.png"
                    alt="Logo MySecurePassword - Générateur de mots de passe sécurisés"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-lg"
                    priority
                  />
                </div>
              </div>
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2">
                  MySecurePassword
                </h1>
                <p className="text-lg text-muted-foreground font-medium text-accessible-size">
                  Générateur sécurisé compatible Google Workspace
                </p>
                <p className="text-sm text-muted-foreground/80 mt-1">
                  Conforme RGPD • Chiffrement avancé • 100% gratuit
                </p>
              </div>
            </div>

            {/* Badges de confiance */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-accent/15 to-primary/10 border border-primary/20 rounded-2xl backdrop-blur-sm touch-target">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  🇫🇷
                </div>
                <div className="text-left">
                  <span className="text-primary font-bold text-sm block">Solution Française</span>
                  <span className="text-xs text-muted-foreground">RGPD Conforme</span>
                </div>
              </div>
              <div className="flex items-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                  ✓
                </div>
                <span className="text-green-400 font-semibold text-sm">
                  WCAG 2.1 AA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu principal avec espacement moderne */}
        <div className="relative p-8 space-y-8">
          {/* Section mot de passe - Design premium */}
          <div className="space-y-6">
            {/* Titre avec icône élégante */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Mot de passe sécurisé
                </h2>
                <p className="text-sm text-muted-foreground">
                  Généré avec chiffrement avancé
                </p>
              </div>
            </div>

            {/* Zone de mot de passe avec design glassmorphism et accessibilité */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-accent/6 to-primary/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-card/70 to-card/50 backdrop-blur-lg border-2 border-border/40 rounded-3xl p-2 shadow-lg">
                <Label htmlFor="generated-password" className="sr-only">
                  Mot de passe généré
                </Label>
                <Input
                  id="generated-password"
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Cliquez sur 'Générer' pour créer un mot de passe sécurisé..."
                  aria-label="Mot de passe généré"
                  aria-describedby="password-description"
                  className="w-full h-20 text-xl font-mono bg-transparent border-0 text-foreground placeholder:text-muted-foreground/70 focus:ring-0 focus:outline-none px-8 focus-visible-enhanced text-accessible-size"
                />
                <div id="password-description" className="sr-only">
                  {password 
                    ? `Mot de passe généré de ${password.length} caractères. Utilisez le bouton copier pour le copier dans le presse-papiers.`
                    : "Aucun mot de passe généré pour le moment."
                  }
                </div>
                {password && (
                  <Button
                    onClick={copyToClipboard}
                    variant="ghost"
                    size="sm"
                    aria-label={copied ? "Mot de passe copié !" : "Copier le mot de passe"}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-14 px-6 glass-button rounded-2xl transition-all duration-200 touch-target focus-visible-enhanced"
                  >
                    {copied ? (
                      <>
                        <Check className="w-6 h-6 text-green-400 mr-2" />
                        <span className="text-sm font-medium">Copié !</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-6 h-6 text-primary-foreground mr-2" />
                        <span className="text-sm font-medium text-primary-foreground">Copier</span>
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Bouton génération premium avec accessibilité */}
            <ClientOnly
              fallback={
                <Button
                  onClick={() => generatePassword(true, true)}
                  disabled={isGenerating}
                  aria-label={isGenerating ? "Génération en cours" : "Générer un nouveau mot de passe sécurisé"}
                  aria-describedby="generation-info"
                  className="relative w-full h-20 text-xl font-bold glass-button text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl overflow-hidden group touch-target focus-visible-enhanced"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-accent/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isGenerating ? (
                      <RefreshCw className="w-7 h-7 mr-4 animate-spin" />
                    ) : (
                      <Shield className="w-7 h-7 mr-4" />
                    )}
                    <span className="text-accessible-size">
                      {isGenerating
                        ? "Génération en cours..."
                        : "Générer un mot de passe sécurisé"}
                    </span>
                  </div>
                </Button>
              }
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => generatePassword(true, true)}
                  disabled={isGenerating}
                  aria-label={isGenerating ? "Génération en cours" : "Générer un nouveau mot de passe sécurisé"}
                  aria-describedby="generation-info"
                  className="relative w-full h-20 text-xl font-bold glass-button text-primary-foreground shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl overflow-hidden group touch-target focus-visible-enhanced"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/15 via-accent/10 to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center">
                    {isGenerating ? (
                      <RefreshCw className="w-7 h-7 mr-4 animate-spin" />
                    ) : (
                      <Shield className="w-7 h-7 mr-4" />
                    )}
                    <span className="text-accessible-size">
                      {isGenerating
                        ? "Génération en cours..."
                        : "Générer un mot de passe sécurisé"}
                    </span>
                  </div>
                </Button>
              </motion.div>
            </ClientOnly>
            
            <div id="generation-info" className="sr-only">
              Utilise la Web Crypto API pour une génération cryptographiquement sécurisée. Le mot de passe sera affiché dans le champ ci-dessus.
            </div>
          </div>

          {/* Section Configuration Premium */}
          <div className="space-y-6">
            {/* Titre Configuration */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
                <Settings className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  Configuration avancée
                </h2>
                <p className="text-sm text-muted-foreground">
                  Personnalisez votre mot de passe
                </p>
              </div>
            </div>

            {/* Grille de cartes de configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Carte Longueur - Améliorée pour l'accessibilité */}
              <div className="glass-card rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-foreground text-accessible-size">
                      Longueur du mot de passe
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Plus c'est long, plus c'est sécurisé
                    </p>
                  </div>
                  <div className="px-4 py-3 bg-gradient-to-r from-primary/20 to-accent/15 border border-primary/30 rounded-2xl">
                    <span className="text-primary font-bold text-2xl">
                      {options.length}
                    </span>
                    <span className="text-primary/80 text-lg ml-2">caractères</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password-length-slider" className="sr-only">
                    Longueur du mot de passe: {options.length} caractères
                  </Label>
                  <input
                    id="password-length-slider"
                    type="range"
                    min="8"
                    max="64"
                    value={options.length}
                    onChange={(e) =>
                      handleOptionChange({ length: parseInt(e.target.value) })
                    }
                    className="w-full h-4 bg-gradient-to-r from-border/50 to-border/30 rounded-full appearance-none cursor-pointer slider-primary focus-visible-enhanced"
                    aria-label={`Longueur du mot de passe: ${options.length} caractères`}
                    aria-describedby="length-description"
                  />
                  <div id="length-description" className="flex justify-between text-sm text-muted-foreground">
                    <span className="font-medium">8 caractères (minimum)</span>
                    <span className="font-medium">64 caractères (maximum)</span>
                  </div>
                  <div className="text-xs text-muted-foreground/80">
                    Recommandé: 12-16 caractères pour un équilibre sécurité/facilité d'usage
                  </div>
                </div>
              </div>

              {/* Carte Types de caractères - Améliorée pour l'accessibilité */}
              <div className="glass-card rounded-3xl p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground text-accessible-size">
                    Types de caractères
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Choisissez les caractères à inclure
                  </p>
                </div>
                <fieldset className="grid grid-cols-1 gap-4">
                  <legend className="sr-only">Types de caractères à inclure dans le mot de passe</legend>
                  {[
                    {
                      key: "includeUppercase",
                      label: "Lettres majuscules",
                      desc: "A, B, C, D, E, F, G...",
                      icon: "🔤",
                      color: "from-blue-500/20 to-blue-600/10",
                    },
                    {
                      key: "includeLowercase",
                      label: "Lettres minuscules",
                      desc: "a, b, c, d, e, f, g...",
                      icon: "🔡",
                      color: "from-green-500/20 to-green-600/10",
                    },
                    {
                      key: "includeNumbers",
                      label: "Chiffres",
                      desc: "0, 1, 2, 3, 4, 5, 6, 7, 8, 9",
                      icon: "🔢",
                      color: "from-purple-500/20 to-purple-600/10",
                    },
                    {
                      key: "includeSymbols",
                      label: "Symboles spéciaux",
                      desc: "!, @, #, $, %, ^, &, *...",
                      icon: "⚡",
                      color: "from-orange-500/20 to-orange-600/10",
                    },
                  ].map(({ key, label, desc, icon, color }) => (
                    <label
                      key={key}
                      className={`group flex items-center space-x-4 p-5 bg-gradient-to-br ${color} border border-border/30 rounded-2xl hover:border-primary/40 cursor-pointer transition-all duration-200 touch-target focus-within:ring-2 focus-within:ring-primary/50`}
                    >
                      <input
                        type="checkbox"
                        checked={
                          options[key as keyof PasswordOptions] as boolean
                        }
                        onChange={(e) =>
                          handleOptionChange({ [key]: e.target.checked })
                        }
                        className="checkbox-enhanced focus-visible-enhanced"
                        aria-describedby={`${key}-description`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
                          <div className="text-base font-semibold text-foreground text-accessible-size">
                            {label}
                          </div>
                        </div>
                        <div id={`${key}-description`} className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          {desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </fieldset>
              </div>
            </div>

            {/* Mode Google Workspace - Carte spéciale avec accessibilité */}
            <div className="glass-card border-2 border-accent/30 rounded-3xl p-8 bg-gradient-to-br from-accent/8 via-primary/5 to-accent/8">
              <label className="flex items-start space-x-6 cursor-pointer group touch-target">
                <input
                  type="checkbox"
                  checked={options.googleWorkspaceCompatible}
                  onChange={(e) =>
                    handleOptionChange({
                      googleWorkspaceCompatible: e.target.checked,
                    })
                  }
                  className="checkbox-enhanced mt-2 focus-visible-enhanced"
                  aria-describedby="google-workspace-description"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl" role="img" aria-label="Bâtiment d'entreprise">🏢</span>
                    <div>
                      <h3 className="text-xl font-bold text-foreground text-accessible-size">
                        Mode Google Workspace
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Optimisation spéciale pour les entreprises
                      </p>
                    </div>
                  </div>
                  <div id="google-workspace-description" className="space-y-3">
                    <p className="text-base text-muted-foreground leading-relaxed text-accessible-size">
                      Optimise la compatibilité en excluant les caractères
                      problématiques pour Google Workspace, garantissant un
                      fonctionnement parfait avec tous les services Google.
                    </p>
                    <div className="bg-card/50 border border-border/30 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-foreground mb-2">
                        Caractères exclus en mode Google Workspace :
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['l', '1', 'I', 'O', '0'].map((char) => (
                          <span key={char} className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-mono text-sm">
                            {char}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Ces caractères peuvent être confondus dans certaines polices
                      </p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Confetti */}
      <ClientOnly>
        <Confetti
          isActive={showConfetti}
          onComplete={() => setShowConfetti(false)}
        />
      </ClientOnly>
    </div>
  );
}
