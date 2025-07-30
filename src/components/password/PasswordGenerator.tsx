"use client";

import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Shield, Settings, Check } from "lucide-react";

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

  const [options, setOptions] = useState<PasswordOptions>({
    length: 14,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
    googleWorkspaceCompatible: false,
  });

  // Éviter les problèmes d'hydratation
  useEffect(() => {
    setMounted(true);
  }, []);

  const generatePassword = useCallback(
    async (showLoading = true) => {
      if (showLoading) setIsGenerating(true);
      if (showLoading) await new Promise((resolve) => setTimeout(resolve, 300));

      const charset = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*()_+-=",
      };

      let availableChars = "";
      if (options.includeUppercase) availableChars += charset.uppercase;
      if (options.includeLowercase) availableChars += charset.lowercase;
      if (options.includeNumbers) availableChars += charset.numbers;
      if (options.includeSymbols) availableChars += charset.symbols;

      if (options.googleWorkspaceCompatible) {
        availableChars = availableChars.replace(/[il1Lo0O]/g, "");
        availableChars = availableChars.replace(
          /[{}\[\]()\/\\'"`~,;:.<>]/g,
          ""
        );
      }

      if (availableChars.length === 0) {
        setPassword("");
        if (showLoading) setIsGenerating(false);
        return;
      }

      try {
        // Vérifier que window.crypto est disponible (côté client uniquement)
        if (typeof window !== 'undefined' && window.crypto) {
          const array = new Uint8Array(options.length);
          window.crypto.getRandomValues(array);

          let generatedPassword = "";
          for (let i = 0; i < options.length; i++) {
            generatedPassword += availableChars[array[i] % availableChars.length];
          }

          setPassword(generatedPassword);
        } else {
          // Fallback pour le serveur ou si crypto n'est pas disponible
          let generatedPassword = "";
          for (let i = 0; i < options.length; i++) {
            generatedPassword +=
              availableChars[Math.floor(Math.random() * availableChars.length)];
          }
          setPassword(generatedPassword);
        }
      } catch {
        // Fallback en cas d'erreur
        let generatedPassword = "";
        for (let i = 0; i < options.length; i++) {
          generatedPassword +=
            availableChars[Math.floor(Math.random() * availableChars.length)];
        }
        setPassword(generatedPassword);
      }

      if (showLoading) setIsGenerating(false);
    },
    [options]
  );

  // Régénération automatique quand les options changent et qu'un mot de passe existe
  const handleOptionChange = useCallback(
    (newOptions: Partial<PasswordOptions>) => {
      setOptions((prev) => {
        const updatedOptions = { ...prev, ...newOptions };

        // Si un mot de passe existe déjà, le régénérer automatiquement
        if (password) {
          setTimeout(() => generatePassword(false), 0);
        }

        return updatedOptions;
      });
    },
    [password, generatePassword]
  );

  const copyToClipboard = async () => {
    if (password && typeof window !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Erreur lors de la copie:", err);
      }
    }
  };

  // Ne pas rendre le composant côté serveur pour éviter l'hydratation
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-slate-900 font-bold text-xl">
              MSP
            </div>
            <h1 className="text-4xl font-bold text-white">MySecurePassword</h1>
          </div>
          <p className="text-blue-100 text-xl">
            Générateur de mots de passe sécurisés compatible Google Workspace
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Generation Section */}
          <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              Mot de passe généré
            </h2>

            <div className="relative">
              <Input
                type="text"
                value={password}
                readOnly
                placeholder="Cliquez sur 'Générer' pour créer votre mot de passe sécurisé"
                className="pr-16 text-lg font-mono text-center h-14 bg-white border-gray-300 text-slate-900 placeholder:text-slate-500 focus:border-blue-600 focus:ring-blue-600"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                disabled={!password}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>

            <Button
              onClick={() => generatePassword()}
              disabled={isGenerating}
              className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <RefreshCw
                className={`w-5 h-5 mr-3 ${isGenerating ? "animate-spin" : ""}`}
              />
              {isGenerating
                ? "Génération..."
                : "Générer un nouveau mot de passe"}
            </Button>
          </div>

          {/* Configuration Section */}
          <div className="p-6 space-y-6 bg-gray-50 dark:bg-slate-700">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-600" />
              Configuration
            </h2>

            {/* Length */}
            <div className="space-y-2">
              <Label
                htmlFor="password-length"
                className="text-base font-semibold text-slate-700 dark:text-slate-300"
              >
                Longueur: {options.length} caractères
              </Label>
              <input
                id="password-length"
                type="range"
                min="8"
                max="64"
                value={options.length}
                onChange={(e) =>
                  handleOptionChange({ length: parseInt(e.target.value) })
                }
                className="w-full accent-blue-600"
                aria-label="Longueur du mot de passe"
              />
            </div>

            {/* Character Options */}
            <div className="space-y-4">
              {[
                {
                  id: "uppercase",
                  label: "Majuscules (A-Z)",
                  key: "includeUppercase",
                },
                {
                  id: "lowercase",
                  label: "Minuscules (a-z)",
                  key: "includeLowercase",
                },
                {
                  id: "numbers",
                  label: "Chiffres (0-9)",
                  key: "includeNumbers",
                },
                {
                  id: "symbols",
                  label: "Symboles (!@#$%^&*)",
                  key: "includeSymbols",
                },
              ].map((option) => (
                <div key={option.id} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={
                      options[option.key as keyof PasswordOptions] as boolean
                    }
                    onChange={(e) =>
                      handleOptionChange({ [option.key]: e.target.checked })
                    }
                    className="rounded border-gray-300 text-blue-600"
                    aria-label={option.label}
                  />
                  <Label
                    htmlFor={option.id}
                    className="text-slate-700 dark:text-slate-300 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Google Workspace */}
            <div className="pt-4 border-t border-gray-200 dark:border-slate-600">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="google-workspace"
                    checked={options.googleWorkspaceCompatible}
                    onChange={(e) =>
                      handleOptionChange({
                        googleWorkspaceCompatible: e.target.checked,
                      })
                    }
                    className="rounded border-green-300 text-green-600"
                    aria-label="Compatibilité Google Workspace"
                  />
                  <div>
                    <Label
                      htmlFor="google-workspace"
                      className="font-bold text-slate-700 dark:text-slate-300"
                    >
                      Compatibilité Google Workspace
                    </Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Évite les caractères problématiques
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
