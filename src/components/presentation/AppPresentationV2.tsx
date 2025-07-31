"use client";

import { Shield, Lock, CheckCircle, Globe, Users, Zap } from "lucide-react";

export default function AppPresentationV2() {
  return (
    <section className="msp-section-advantages py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold msp-text-white mb-6">
            Pourquoi MySecurePassword ?
          </h2>
          <p className="text-xl lg:text-2xl msp-text-white/80 max-w-4xl mx-auto leading-relaxed">
            La solution française de référence pour générer des mots de passe sécurisés
          </p>
        </div>

        {/* Grille des avantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="msp-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold msp-text-white">
                Sécurité Maximale
              </h3>
            </div>
            <p className="msp-text-white/80 leading-relaxed text-lg">
              Utilise la Web Crypto API pour une génération cryptographiquement sécurisée. 
              Vos mots de passe ne sont jamais stockés ou transmis.
            </p>
          </div>

          <div className="msp-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold msp-text-white">
                Compatible Google Workspace
              </h3>
            </div>
            <p className="msp-text-white/80 leading-relaxed text-lg">
              Évite automatiquement les caractères problématiques (l, 1, I, O, 0) 
              et les symboles incompatibles pour une intégration parfaite.
            </p>
          </div>

          <div className="msp-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold msp-text-white">
                Conforme RGPD
              </h3>
            </div>
            <p className="msp-text-white/80 leading-relaxed text-lg">
              Aucune collecte de données personnelles. Traitement local uniquement. 
              Respect total de la réglementation européenne.
            </p>
          </div>

          <div className="msp-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold msp-text-white">
                Rapide & Simple
              </h3>
            </div>
            <p className="msp-text-white/80 leading-relaxed text-lg">
              Interface intuitive, génération instantanée, copie en un clic. 
              Aucune inscription requise, utilisation immédiate.
            </p>
          </div>

          <div className="msp-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold msp-text-white">
                Accessible Partout
              </h3>
            </div>
            <p className="msp-text-white/80 leading-relaxed text-lg">
              Fonctionne sur tous les navigateurs modernes. 
              Interface responsive pour mobile, tablette et desktop.
            </p>
          </div>

          <div className="msp-card p-8 group hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-colors">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold msp-text-white">
                100% Gratuit
              </h3>
            </div>
            <p className="msp-text-white/80 leading-relaxed text-lg">
              Aucun coût caché, aucune limitation. 
              Toutes les fonctionnalités disponibles gratuitement.
            </p>
          </div>
        </div>

        {/* Section RGPD détaillée */}
        <div className="msp-card p-12 mb-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-bold msp-text-white mb-4">
              Conformité RGPD Complète
            </h3>
            <p className="text-xl msp-text-white/80 max-w-3xl mx-auto leading-relaxed">
              Notre application respecte intégralement le Règlement Général sur la Protection des Données
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/5 border border-white/20 rounded-2xl p-8">
              <h4 className="text-2xl font-bold msp-text-white flex items-center gap-3 mb-6">
                <span className="text-3xl">✅</span>
                Principes Respectés
              </h4>
              <ul className="space-y-4 msp-text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Minimisation des données :</strong> Aucune collecte de données personnelles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Intégrité et confidentialité :</strong> Traitement local uniquement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Transparence :</strong> Code source ouvert et vérifiable</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Responsabilité :</strong> Développement français, réglementation européenne</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-2xl p-8">
              <h4 className="text-2xl font-bold msp-text-white flex items-center gap-3 mb-6">
                <span className="text-3xl">🔒</span>
                Sécurité Technique
              </h4>
              <ul className="space-y-4 msp-text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Chiffrement :</strong> Web Crypto API pour génération sécurisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Stockage :</strong> Aucun stockage de mots de passe</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Transmission :</strong> Aucune transmission de données</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed"><strong className="msp-text-white">Audit :</strong> Code source ouvert et auditable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Google Workspace */}
        <div className="msp-card border-2 border-white/20 p-12">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-4xl font-bold msp-text-white mb-4">
              Compatibilité Google Workspace
            </h3>
            <p className="text-xl msp-text-white/80 max-w-3xl mx-auto leading-relaxed">
              Optimisé pour fonctionner parfaitement avec tous les services Google
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white/5 border border-white/20 rounded-2xl p-8">
              <h4 className="text-2xl font-bold msp-text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🚫</span>
                Caractères Exclus
              </h4>
              <div className="space-y-4 msp-text-white/80">
                {['l', '1', 'I', 'O', '0'].map((char) => (
                  <div key={char} className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-red-500/20 border border-red-500/40 rounded-xl flex items-center justify-center text-lg font-mono font-bold text-red-300">
                      {char}
                    </span>
                    <span className="text-lg">
                      {char === 'l' && 'Lettre l minuscule (confondue avec 1)'}
                      {char === '1' && 'Chiffre 1 (confondu avec l)'}
                      {char === 'I' && 'Lettre I majuscule (confondue avec l)'}
                      {char === 'O' && 'Lettre O majuscule (confondue avec 0)'}
                      {char === '0' && 'Chiffre 0 (confondu avec O)'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/20 rounded-2xl p-8">
              <h4 className="text-2xl font-bold msp-text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">✅</span>
                Avantages
              </h4>
              <ul className="space-y-4 msp-text-white/80">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed">Compatible avec Gmail, Google Drive, Google Docs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed">Fonctionne avec Google Workspace Enterprise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed">Évite les erreurs de saisie et confusion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                  <span className="text-lg leading-relaxed">Optimisé pour les polices système</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}