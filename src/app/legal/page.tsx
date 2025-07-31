/* eslint-disable react/no-unescaped-entities */
import HeaderV2 from "@/components/layout/HeaderV2";
import FooterV2 from "@/components/layout/FooterV2";
import TransitionWrapper from "@/components/animations/TransitionWrapper";
import {
  Scale,
  Building,
  Globe,
  Code,
  Shield,
  ExternalLink,
} from "lucide-react";

export default function LegalMentionsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <TransitionWrapper>
        <HeaderV2 />
      </TransitionWrapper>

      {/* Contenu principal */}
      <section className="msp-section-generator py-12">
        <div className="max-w-4xl mx-auto px-6">
          <TransitionWrapper delay={200}>
            <div className="relative msp-card p-8 overflow-hidden">
              <div className="msp-glass-overlay"></div>

              <div className="relative space-y-8">
                {/* Titre principal */}
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                      <Scale className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold msp-text-white">
                        Mentions Légales
                      </h1>
                      <p className="text-lg msp-text-white/80 mt-2">
                        Informations légales et conditions d'utilisation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Éditeur */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Building className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">
                      Éditeur du Site
                    </h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-3">
                          📝 Informations de l'éditeur :
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Nom du site :</strong> MySecurePassword
                          </li>
                          <li>
                            <strong>Type :</strong> Application web gratuite
                          </li>
                          <li>
                            <strong>Objet :</strong> Générateur de mots de passe
                            sécurisés
                          </li>
                          <li>
                            <strong>Statut :</strong> Projet open source
                          </li>
                          <li>
                            <strong>Pays :</strong> France 🇫🇷
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-3">
                          🌐 Publication et hébergement :
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Directeur de publication :</strong> Équipe
                            MySecurePassword
                          </li>
                          <li>
                            <strong>Hébergement :</strong> Services cloud
                            sécurisés
                          </li>
                          <li>
                            <strong>Localisation :</strong> Union Européenne
                          </li>
                          <li>
                            <strong>Conformité :</strong> RGPD et réglementation
                            française
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Propriété intellectuelle */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Code className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">
                      Propriété Intellectuelle
                    </h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-4">
                      <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-400" />
                        Projet Open Source
                      </h3>
                      <p>
                        <strong>
                          MySecurePassword est un projet open source
                        </strong>{" "}
                        publié sous licence libre, permettant l'utilisation, la
                        modification et la redistribution du code source.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          ✅ Droits accordés :
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Utilisation gratuite et illimitée</li>
                          <li>• Consultation du code source</li>
                          <li>• Modification pour usage personnel</li>
                          <li>• Audit de sécurité</li>
                          <li>• Contribution au projet</li>
                          <li>• Redistribution selon licence</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          🔗 Ressources :
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Code source :</strong>
                            <br />
                            <a
                              href="https://github.com/R3n1er/mysecurepassword"
                              className="text-blue-400 hover:text-blue-300 underline inline-flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              GitHub Repository{" "}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </li>
                          <li>
                            <strong>Licence :</strong> Consultable dans le
                            repository
                          </li>
                          <li>
                            <strong>Documentation :</strong> README et wiki
                          </li>
                          <li>
                            <strong>Issues :</strong> Signalement de bugs
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">
                        ⚖️ Respect de la propriété intellectuelle :
                      </h4>
                      <p className="text-sm">
                        Le logo, le nom "MySecurePassword" et l'interface
                        utilisateur sont protégés. Les technologies utilisées
                        (React, Next.js, Tailwind CSS) sont utilisées
                        conformément à leurs licences respectives. Les icônes
                        proviennent de Lucide React (licence MIT).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Conditions d'utilisation */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">
                      Conditions d'Utilisation
                    </h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p>
                      L'utilisation de MySecurePassword implique l'acceptation
                      pleine et entière des conditions ci-dessous :
                    </p>

                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          🎯 Usage autorisé :
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>
                            • Génération de mots de passe pour usage personnel
                            ou professionnel
                          </li>
                          <li>
                            • Utilisation dans le respect des lois en vigueur
                          </li>
                          <li>
                            • Usage compatible avec Google Workspace et autres
                            services
                          </li>
                          <li>• Accès gratuit sans limitation de fréquence</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          ❌ Usage interdit :
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>
                            • Tentative de reverse engineering malveillant
                          </li>
                          <li>• Utilisation pour activités illégales</li>
                          <li>• Attaque ou test de sécurité non autorisé</li>
                          <li>• Surcharge intentionnelle des serveurs</li>
                          <li>• Revente ou commercialisation du service</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Responsabilité */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">
                      Limitation de Responsabilité
                    </h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          ✅ Notre engagement :
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Service gratuit fourni "en l'état"</li>
                          <li>• Sécurité maximale avec Web Crypto API</li>
                          <li>• Code source ouvert et auditable</li>
                          <li>• Conformité RGPD et bonnes pratiques</li>
                          <li>• Mise à jour et maintenance régulières</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          ⚠️ Limitations :
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Aucune garantie de disponibilité 24/7</li>
                          <li>• Responsabilité de l'usage des mots de passe</li>
                          <li>• Sauvegarde et gestion par l'utilisateur</li>
                          <li>• Compatibilité selon les navigateurs</li>
                          <li>• Évolutions et modifications possibles</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">
                        📋 Recommandations importantes :
                      </h4>
                      <p className="text-sm">
                        <strong>
                          MySecurePassword génère des mots de passe sécurisés
                        </strong>
                        , mais nous recommandons fortement l'utilisation d'un
                        gestionnaire de mots de passe professionnel pour le
                        stockage et la gestion de vos identifiants. La sécurité
                        de vos comptes dépend également de bonnes pratiques
                        d'usage (authentification 2FA, rotation régulière,
                        etc.).
                      </p>
                    </div>
                  </div>
                </div>

                {/* Droit applicable */}
                <div className="msp-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">
                      Droit Applicable
                    </h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                      <h4 className="font-bold text-white mb-2">
                        ⚖️ Juridiction :
                      </h4>
                      <p>
                        Les présentes mentions légales sont régies par{" "}
                        <strong>le droit français</strong>. Tout litige relatif
                        à l'utilisation de MySecurePassword sera soumis à la
                        compétence des tribunaux français.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          🇪🇺 Conformité européenne :
                        </h4>
                        <ul className="space-y-1 text-sm">
                          <li>
                            • RGPD (Règlement Général sur la Protection des
                            Données)
                          </li>
                          <li>• Directive ePrivacy</li>
                          <li>• Loi Informatique et Libertés</li>
                          <li>• Code de la consommation</li>
                        </ul>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          📄 Modifications :
                        </h4>
                        <p className="text-sm">
                          Ces mentions légales peuvent être modifiées à tout
                          moment. La version en vigueur est celle accessible sur
                          le site. Les utilisateurs sont invités à les consulter
                          régulièrement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact et informations */}
                <div className="msp-card border-2 border-white/20 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-white" />
                    <h2 className="text-2xl font-bold msp-text-white">
                      Contact & Informations
                    </h2>
                  </div>
                  <div className="space-y-4 msp-text-white/90 leading-relaxed">
                    <p>
                      Pour toute question juridique, suggestion d'amélioration
                      ou signalement :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          📧 Nous contacter :
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li>
                            <strong>Formulaire :</strong> Disponible en bas de
                            page
                          </li>
                          <li>
                            <strong>GitHub Issues :</strong> Signalement
                            technique
                          </li>
                          <li>
                            <strong>Documentation :</strong> Wiki du projet
                          </li>
                        </ul>
                      </div>

                      <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                        <h4 className="font-bold text-white mb-2">
                          📅 Dernière mise à jour :
                        </h4>
                        <p className="text-sm">
                          <strong>Décembre 2024</strong>
                        </p>
                        <p className="text-xs mt-2 opacity-75">
                          Version mise à jour à chaque déploiement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionWrapper>
        </div>
      </section>

      {/* Footer */}
      <TransitionWrapper delay={400}>
        <FooterV2 />
      </TransitionWrapper>
    </div>
  );
}
