"use client";

import { Shield, Lock, CheckCircle, Globe, Users, Zap } from "lucide-react";

export default function AppPresentation() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header avec drapeau français */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-700 rounded-lg px-4 py-2 shadow-sm">
              <div className="flex">
                <div className="w-4 h-3 bg-blue-600"></div>
                <div className="w-4 h-3 bg-white"></div>
                <div className="w-4 h-3 bg-red-600"></div>
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 ml-2">
                Solution française
              </span>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Générateur de Mots de Passe Sécurisés
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Créez des mots de passe forts et sécurisés en quelques clics. 
            Compatible Google Workspace, conforme RGPD, 100% gratuit.
          </p>
        </div>

        {/* Avantages principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Sécurité Maximale
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Utilise la Web Crypto API pour une génération cryptographiquement sécurisée. 
              Vos mots de passe ne sont jamais stockés ou transmis.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Compatible Google Workspace
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Évite automatiquement les caractères problématiques (l, 1, I, O, 0) 
              et les symboles incompatibles pour une intégration parfaite.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Conforme RGPD
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Aucune collecte de données personnelles. Traitement local uniquement. 
              Respect total de la réglementation européenne sur la protection des données.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Rapide & Simple
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Interface intuitive, génération instantanée, copie en un clic. 
              Aucune inscription requise, utilisation immédiate.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                Accessible Partout
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Fonctionne sur tous les navigateurs modernes. 
              Interface responsive pour mobile, tablette et desktop.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                100% Gratuit
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Aucun coût caché, aucune limitation. 
              Toutes les fonctionnalités disponibles gratuitement.
            </p>
          </div>
        </div>

        {/* Section RGPD détaillée */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Conformité RGPD Complète
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Notre application respecte intégralement le Règlement Général sur la Protection des Données (RGPD)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                ✅ Principes Respectés
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Minimisation des données :</strong> Aucune collecte de données personnelles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Intégrité et confidentialité :</strong> Traitement local uniquement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Transparence :</strong> Code source ouvert et vérifiable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Responsabilité :</strong> Développement français, réglementation européenne</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                🔒 Sécurité Technique
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Chiffrement :</strong> Web Crypto API pour génération sécurisée</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Stockage :</strong> Aucun stockage de mots de passe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Transmission :</strong> Aucune transmission de données</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span><strong>Audit :</strong> Code source ouvert et auditable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Compatibilité Google Workspace */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Compatibilité Google Workspace
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Optimisé pour fonctionner parfaitement avec tous les services Google
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                🚫 Caractères Exclus
              </h4>
              <div className="space-y-2 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-sm font-mono">l</span>
                  <span>Lettre l minuscule (confondue avec 1)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-sm font-mono">1</span>
                  <span>Chiffre 1 (confondu avec l)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-sm font-mono">I</span>
                  <span>Lettre I majuscule (confondue avec l)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-sm font-mono">O</span>
                  <span>Lettre O majuscule (confondue avec 0)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-100 dark:bg-red-900/20 rounded flex items-center justify-center text-sm font-mono">0</span>
                  <span>Chiffre 0 (confondu avec O)</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                ✅ Avantages
              </h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Compatible avec Gmail, Google Drive, Google Docs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fonctionne avec Google Workspace Enterprise</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Évite les erreurs de saisie et confusion</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Optimisé pour les polices système</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 