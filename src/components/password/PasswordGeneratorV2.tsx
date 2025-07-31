"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Shield, Settings, Check, Lock } from "lucide-react";
import Confetti from "@/components/animations/Confetti";
import { motion } from "framer-motion";
import ClientOnly from "@/components/common/ClientOnly";

interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  googleWorkspaceCompatible: boolean;
}

export default function PasswordGeneratorV2() {
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

      // Exclusion Google Workspace
      if (options.googleWorkspaceCompatible) {
        chars = chars.replace(/[il1Lo0O]/g, "");
      }

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
      <section className="msp-section-generator py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse msp-card p-8 h-96 flex items-center justify-center">
            <div className="msp-text-white">Chargement...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="msp-section-generator py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Container principal avec design V2 */}
        <div className="relative msp-card p-8 lg:p-12 overflow-hidden">
          {/* Effet de brillance subtil */}
          <div className="msp-glass-overlay"></div>

          <div className="relative space-y-10">
            {/* Titre section */}
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold msp-text-white">
                    Générateur Sécurisé
                  </h2>
                  <p className="text-xl msp-text-white/80 mt-2">
                    Chiffrement cryptographique avancé
                  </p>
                </div>
              </div>
            </div>

            {/* Zone de mot de passe */}
            <div className="space-y-6">
              <div className="relative group">
                <Label htmlFor="generated-password" className="sr-only">
                  Mot de passe généré
                </Label>
                <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-2 group-hover:border-white/30 transition-colors">
                  <Input
                    id="generated-password"
                    type="text"
                    value={password}
                    readOnly
                    placeholder="Cliquez sur 'Générer' pour créer votre mot de passe sécurisé..."
                    aria-label="Mot de passe généré"
                    aria-describedby="password-description"
                    className="w-full h-20 text-2xl font-mono bg-transparent border-0 msp-text-white placeholder:text-white/50 focus:ring-0 focus:outline-none px-8 text-center"
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
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 h-14 px-6 msp-button-white rounded-xl"
                    >
                      {copied ? (
                        <>
                          <Check className="w-6 h-6 text-green-600 mr-2" />
                          <span className="text-sm font-medium">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-6 h-6 mr-2" />
                          <span className="text-sm font-medium">Copier</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Bouton génération */}
              <ClientOnly
                fallback={
                  <Button
                    onClick={() => generatePassword(true, true)}
                    disabled={isGenerating}
                    aria-label={isGenerating ? "Génération en cours" : "Générer un nouveau mot de passe sécurisé"}
                    className="w-full h-16 text-xl font-bold msp-button-gradient rounded-2xl"
                  >
                    <div className="flex items-center justify-center">
                      {isGenerating ? (
                        <RefreshCw className="w-7 h-7 mr-4 animate-spin" />
                      ) : (
                        <Shield className="w-7 h-7 mr-4" />
                      )}
                      <span>
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
                    className="w-full h-16 text-xl font-bold msp-button-gradient rounded-2xl"
                  >
                    <div className="flex items-center justify-center">
                      {isGenerating ? (
                        <RefreshCw className="w-7 h-7 mr-4 animate-spin" />
                      ) : (
                        <Shield className="w-7 h-7 mr-4" />
                      )}
                      <span>
                        {isGenerating
                          ? "Génération en cours..."
                          : "Générer un mot de passe sécurisé"}
                      </span>
                    </div>
                  </Button>
                </motion.div>
              </ClientOnly>
            </div>

            {/* Configuration */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold msp-text-white">
                    Configuration
                  </h3>
                  <p className="msp-text-white/80">
                    Personnalisez votre mot de passe
                  </p>
                </div>
              </div>

              {/* Longueur */}
              <div className="msp-card p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold msp-text-white">
                      Longueur
                    </h4>
                    <div className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl">
                      <span className="msp-text-white font-bold text-lg">
                        {options.length}
                      </span>
                      <span className="msp-text-white/80 text-sm ml-2">caractères</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="64"
                    value={options.length}
                    onChange={(e) =>
                      handleOptionChange({ length: parseInt(e.target.value) })
                    }
                    className="w-full h-3 bg-white/20 rounded-full appearance-none cursor-pointer"
                    aria-label={`Longueur du mot de passe: ${options.length} caractères`}
                  />
                  <div className="flex justify-between text-sm msp-text-white/60">
                    <span>8 min</span>
                    <span>64 max</span>
                  </div>
                </div>
              </div>

              {/* Google Workspace - Placé juste après la longueur */}
              <div className="msp-card border-2 border-white/20 p-6">
                <label className="flex items-start space-x-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.googleWorkspaceCompatible}
                    onChange={(e) =>
                      handleOptionChange({
                        googleWorkspaceCompatible: e.target.checked,
                      })
                    }
                    className="w-5 h-5 text-white border-white/30 rounded bg-transparent focus:ring-white focus:ring-2 mt-2"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl" role="img" aria-label="Bâtiment">🏢</span>
                      <div>
                        <h4 className="text-lg font-bold msp-text-white">
                          Mode Google Workspace
                        </h4>
                        <p className="msp-text-white/80 text-sm">
                          Évite les caractères ambigus (l, 1, I, O, 0)
                        </p>
                      </div>
                    </div>
                  </div>
                </label>
              </div>

              {/* Types de caractères */}
              <div className="msp-card p-6">
                <h4 className="text-xl font-bold msp-text-white mb-4">
                  Types de caractères
                </h4>
                <fieldset className="space-y-4">
                  <legend className="sr-only">Types de caractères à inclure</legend>
                  {[
                    {
                      key: "includeUppercase",
                      label: "Majuscules",
                      desc: "A-Z",
                      icon: "🔤",
                    },
                    {
                      key: "includeLowercase",
                      label: "Minuscules",
                      desc: "a-z",
                      icon: "🔡",
                    },
                    {
                      key: "includeNumbers",
                      label: "Chiffres",
                      desc: "0-9",
                      icon: "🔢",
                    },
                    {
                      key: "includeSymbols",
                      label: "Symboles",
                      desc: "!@#",
                      icon: "⚡",
                    },
                  ].map(({ key, label, desc, icon }) => (
                    <label
                      key={key}
                      className="flex items-center space-x-3 p-3 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={
                          options[key as keyof PasswordOptions] as boolean
                        }
                        onChange={(e) =>
                          handleOptionChange({ [key]: e.target.checked })
                        }
                        className="w-5 h-5 text-white border-white/30 rounded bg-transparent focus:ring-white focus:ring-2"
                      />
                      <span className="text-xl" role="img" aria-hidden="true">{icon}</span>
                      <div className="flex-1">
                        <div className="msp-text-white font-medium">
                          {label}
                        </div>
                        <div className="msp-text-white/60 text-sm">
                          {desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </fieldset>
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
    </section>
  );
}