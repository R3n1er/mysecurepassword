"use client";

import { Shield, Lock, CheckCircle, Globe, Users, Zap } from "lucide-react";

export default function AppPresentation() {
  return (
    <div className="glass-card rounded-3xl py-20 px-8 mx-4 fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header harmonisé avec le nouveau style */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-4 bg-gradient-to-r from-primary/15 to-accent/10 border border-primary/20 rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm">
              <div className="flex shadow-sm rounded-lg overflow-hidden">
                <div className="w-5 h-4 bg-blue-600"></div>
                <div className="w-5 h-4 bg-white"></div>
                <div className="w-5 h-4 bg-red-600"></div>
              </div>
              <span className="text-base font-bold text-primary ml-2 text-accessible-size">
                Solution française
              </span>
            </div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6">
            Générateur de Mots de Passe Sécurisés
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-accessible-size">
            Créez des mots de passe forts et sécurisés en quelques clics. 
            Compatible Google Workspace, conforme RGPD, 100% gratuit.
          </p>
        </div>

        {/* Avantages principaux - Style harmonisé avec glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="glass-card rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center border border-primary/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-accessible-size">
                Sécurité Maximale
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-accessible-size">
              Utilise la Web Crypto API pour une génération cryptographiquement sécurisée. 
              Vos mots de passe ne sont jamais stockés ou transmis.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl flex items-center justify-center border border-green-500/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-accessible-size">
                Compatible Google Workspace
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-accessible-size">
              Évite automatiquement les caractères problématiques (l, 1, I, O, 0) 
              et les symboles incompatibles pour une intégration parfaite.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center border border-purple-500/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Lock className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-accessible-size">
                Conforme RGPD
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-accessible-size">
              Aucune collecte de données personnelles. Traitement local uniquement. 
              Respect total de la réglementation européenne sur la protection des données.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center border border-accent/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-accessible-size">
                Rapide & Simple
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-accessible-size">
              Interface intuitive, génération instantanée, copie en un clic. 
              Aucune inscription requise, utilisation immédiate.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/10 rounded-2xl flex items-center justify-center border border-blue-500/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-accessible-size">
                Accessible Partout
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-accessible-size">
              Fonctionne sur tous les navigateurs modernes. 
              Interface responsive pour mobile, tablette et desktop.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 card-hover group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-600/10 rounded-2xl flex items-center justify-center border border-emerald-500/30 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground text-accessible-size">
                100% Gratuit
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-accessible-size">
              Aucun coût caché, aucune limitation. 
              Toutes les fonctionnalités disponibles gratuitement.
            </p>
          </div>
        </div>

        {/* Section RGPD détaillée - Style harmonisé */}
        <div className="glass-card rounded-3xl p-12 mb-16">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-xl">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
              Conformité RGPD Complète
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-accessible-size">
              Notre application respecte intégralement le Règlement Général sur la Protection des Données (RGPD)
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-8 space-y-6">
              <h4 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl">✅</span>
                Principes Respectés
              </h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Minimisation des données :</strong> Aucune collecte de données personnelles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Intégrité et confidentialité :</strong> Traitement local uniquement</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Transparence :</strong> Code source ouvert et vérifiable</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Responsabilité :</strong> Développement français, réglementation européenne</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-8 space-y-6">
              <h4 className="text-2xl font-bold text-foreground flex items-center gap-3">
                <span className="text-3xl">🔒</span>
                Sécurité Technique
              </h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Chiffrement :</strong> Web Crypto API pour génération sécurisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Stockage :</strong> Aucun stockage de mots de passe</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Transmission :</strong> Aucune transmission de données</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed"><strong className="text-foreground">Audit :</strong> Code source ouvert et auditable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section Compatibilité Google Workspace - Style harmonisé */}
        <div className="glass-card border-2 border-accent/30 rounded-3xl p-12 bg-gradient-to-br from-accent/8 via-primary/5 to-accent/8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-600/15 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30 shadow-xl">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Compatibilité Google Workspace
            </h3>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-accessible-size">
              Optimisé pour fonctionner parfaitement avec tous les services Google
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="text-3xl">🚫</span>
                Caractères Exclus
              </h4>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-lg font-mono font-bold text-red-400">l</span>
                  <span className="text-accessible-size">Lettre l minuscule (confondue avec 1)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-lg font-mono font-bold text-red-400">1</span>
                  <span className="text-accessible-size">Chiffre 1 (confondu avec l)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-lg font-mono font-bold text-red-400">I</span>
                  <span className="text-accessible-size">Lettre I majuscule (confondue avec l)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-lg font-mono font-bold text-red-400">O</span>
                  <span className="text-accessible-size">Lettre O majuscule (confondue avec 0)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-10 h-10 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center justify-center text-lg font-mono font-bold text-red-400">0</span>
                  <span className="text-accessible-size">Chiffre 0 (confondu avec O)</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/60 to-card/40 backdrop-blur-sm border border-border/30 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="text-3xl">✅</span>
                Avantages
              </h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed">Compatible avec Gmail, Google Drive, Google Docs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed">Fonctionne avec Google Workspace Enterprise</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed">Évite les erreurs de saisie et confusion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-accessible-size leading-relaxed">Optimisé pour les polices système</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 