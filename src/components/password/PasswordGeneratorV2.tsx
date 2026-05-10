"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Shield, Settings, Check } from "lucide-react";
import Confetti from "@/components/animations/Confetti";
import { motion } from "framer-motion";
import ClientOnly from "@/components/common/ClientOnly";
import { useIsClient } from "@/hooks/useIsClient";
import { buildCharset } from "@/lib/password/policies";

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
  const isClient = useIsClient();
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

      const chars = buildCharset({
        includeUppercase: options.includeUppercase,
        includeLowercase: options.includeLowercase,
        includeNumbers: options.includeNumbers,
        includeSymbols: options.includeSymbols,
        googleWorkspaceCompatible: options.googleWorkspaceCompatible,
      });

      if (!isClient || !window.crypto?.getRandomValues) {
        throw new Error(
          "La Web Crypto API est requise pour générer un mot de passe sécurisé."
        );
      }

      let result = "";
      const maxValidByte = Math.floor(256 / chars.length) * chars.length - 1;

      while (result.length < options.length) {
        const randomBytes = new Uint8Array(options.length - result.length);
        window.crypto.getRandomValues(randomBytes);

        for (const byte of randomBytes) {
          if (byte <= maxValidByte) {
            result += chars[byte % chars.length];
            if (result.length === options.length) break;
          }
        }
      }

      setPassword(result);
      if (showLoading) setIsGenerating(false);

      if (triggerConfetti) {
        // Redémarre le cycle pour garantir l'affichage au premier clic
        setShowConfetti(false);
        setTimeout(() => setShowConfetti(true), 0);
      }
    },
    [options, isClient]
  );

  const handleOptionChange = useCallback(
    (newOptions: Partial<PasswordOptions>) => {
      setOptions((prev) => {
        const updatedOptions = { ...prev, ...newOptions };
        // Ne pas régénérer automatiquement le mot de passe lors des changements d'options.
        // La génération doit être déclenchée uniquement via le bouton "Générer".
        return updatedOptions;
      });
      // Assurer qu'aucun confetti n'apparaît suite à un changement d'options
      setShowConfetti(false);
    },
    []
  );

  const copyToClipboard = async () => {
    if (!password || !isClient) return;

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
    <section className="msp-section-generator py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Container principal avec design V2 compact */}
        <div className="relative msp-card p-6 overflow-hidden">
          {/* Effet de brillance subtil */}
          <div className="msp-glass-overlay"></div>

          <div className="relative space-y-6">
            {/* Titre section compact */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold msp-text-white">
                  Générateur Sécurisé
                </h2>
                <p className="text-sm msp-text-white/80">
                  Web Crypto API, sans biais modulo
                </p>
              </div>
            </div>

            {/* Zone de mot de passe compacte */}
            <div className="space-y-4">
              <div className="relative group">
                <Label htmlFor="generated-password" className="sr-only">
                  Mot de passe généré
                </Label>
                <div className="relative bg-white/5 backdrop-blur-sm border-2 border-white/20 rounded-xl p-2 group-hover:border-white/30 transition-colors">
                  <Input
                    id="generated-password"
                    type="text"
                    value={password}
                    readOnly
                    placeholder="Cliquez sur 'Générer' pour créer votre mot de passe sécurisé..."
                    aria-label="Mot de passe généré"
                    aria-describedby="password-description"
                    className="w-full h-12 text-lg font-mono bg-transparent border-0 msp-text-white placeholder:text-white/50 focus:ring-0 focus:outline-none px-6 text-center"
                  />
                  <div id="password-description" className="sr-only">
                    {password
                      ? `Mot de passe généré de ${password.length} caractères. Utilisez le bouton copier pour le copier dans le presse-papiers.`
                      : "Aucun mot de passe généré pour le moment."}
                  </div>
                  {password && (
                    <Button
                      onClick={copyToClipboard}
                      variant="ghost"
                      size="sm"
                      aria-label={
                        copied
                          ? "Mot de passe copié !"
                          : "Copier le mot de passe"
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 px-4 msp-button-white rounded-lg text-xs"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600 mr-1" />
                          <span className="text-xs font-medium">Copié !</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          <span className="text-xs font-medium">Copier</span>
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* Bouton génération compact */}
              <ClientOnly
                fallback={
                  <Button
                    onClick={() => {
                      generatePassword(true, true);
                    }}
                    disabled={isGenerating}
                    aria-label={
                      isGenerating
                        ? "Génération en cours"
                        : "Générer un nouveau mot de passe sécurisé"
                    }
                    className="w-full h-12 text-lg font-bold msp-button-gradient rounded-xl"
                  >
                    <div className="flex items-center justify-center">
                      {isGenerating ? (
                        <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                      ) : (
                        <Shield className="w-5 h-5 mr-3" />
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
                    onClick={() => {
                      generatePassword(true, true);
                    }}
                    disabled={isGenerating}
                    aria-label={
                      isGenerating
                        ? "Génération en cours"
                        : "Générer un nouveau mot de passe sécurisé"
                    }
                    className="w-full h-12 text-lg font-bold msp-button-gradient rounded-xl"
                  >
                    <div className="flex items-center justify-center">
                      {isGenerating ? (
                        <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                      ) : (
                        <Shield className="w-5 h-5 mr-3" />
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

            {/* Configuration compacte */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                  <Settings className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold msp-text-white">
                    Configuration
                  </h3>
                  <p className="text-sm msp-text-white/80">
                    Personnalisez votre mot de passe
                  </p>
                </div>
              </div>

              {/* Configuration en grille compacte 2x2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Longueur */}
                <div className="msp-card p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold msp-text-white">
                        Longueur
                      </h4>
                      <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg">
                        <span className="msp-text-white font-bold text-sm">
                          {options.length}
                        </span>
                        <span className="msp-text-white/80 text-xs ml-1">
                          car
                        </span>
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
                      className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
                      aria-label={`Longueur du mot de passe: ${options.length} caractères`}
                    />
                    <div className="flex justify-between text-xs msp-text-white/60">
                      <span>8</span>
                      <span>64</span>
                    </div>
                  </div>
                </div>

                {/* Google Workspace compact */}
                <div className="msp-card border-2 border-white/20 p-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={options.googleWorkspaceCompatible}
                      onChange={(e) =>
                        handleOptionChange({
                          googleWorkspaceCompatible: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-white border-white/30 rounded bg-transparent focus:ring-white focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className="text-lg"
                          role="img"
                          aria-label="Bâtiment"
                        >
                          🏢
                        </span>
                        <h4 className="text-sm font-bold msp-text-white">
                          Mode Google Workspace
                        </h4>
                      </div>
                      <p className="msp-text-white/80 text-xs leading-relaxed">
                        Optimisé pour Google Workspace : évite les caractères
                        similaires et les symboles réservés dans les systèmes
                        backend
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Types de caractères en grille compacte */}
              <div className="msp-card p-4">
                <h4 className="text-lg font-bold msp-text-white mb-3">
                  Types de caractères
                </h4>
                <fieldset className="grid grid-cols-2 gap-2">
                  <legend className="sr-only">
                    Types de caractères à inclure
                  </legend>
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
                      desc: options.googleWorkspaceCompatible
                        ? "!@#$%^&*()-_=+[]{}|;:,.<>?"
                        : "!@#$%^&*()-_=+[]{}|;:,.<>?/~`",
                      icon: "⚡",
                    },
                  ].map(({ key, label, desc, icon }) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 p-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={
                          options[key as keyof PasswordOptions] as boolean
                        }
                        onChange={(e) =>
                          handleOptionChange({ [key]: e.target.checked })
                        }
                        className="w-4 h-4 text-white border-white/30 rounded bg-transparent focus:ring-white focus:ring-2"
                      />
                      <span className="text-sm" role="img" aria-hidden="true">
                        {icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="msp-text-white font-medium text-sm truncate">
                          {label}
                        </div>
                        <div className="msp-text-white/60 text-xs">{desc}</div>
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
